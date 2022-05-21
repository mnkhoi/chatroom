import { useState, useEffect } from "react";
import { auth, storage, db } from "../firebase";
import { FaCamera } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    })

    if (img) {
      try {
        const uploadImg = async () => {
          const imgRef = ref(
            storage,
            `avatar/${auth.currentUser.uid} - ${img.name}`
          );
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });

          setImg("");
        };

        uploadImg();
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [img]);

  return user ? (
    <section>
      <h3>Profile</h3>
      <div className="pictureContainer">
        <img
          alt="avatar"
          src={user.avatar || "https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805156?k=20&m=587805156&s=612x612&w=0&h=Ok_jDFC5J1NgH20plEgbQZ46XheiAF8sVUKPvocne6Y="}
        />

        <label htmlFor="photo">
          <div className="overlay">
            <FaCamera className="camera" />
          </div>
        </label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => setImg(e.target.files[0])}
        />
      </div>

      <div className="information">
        <div className="name">{user.name}</div>
        <div className="email">{user.email}</div>
        <div className="datecreated">Joined on: {user.dateCreate.toDate().toDateString()}</div>
      </div>
    </section>
  ) : null;
};

export default Profile;

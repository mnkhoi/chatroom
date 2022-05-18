import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/auth";

const Nav = () => {
  const { user } = useContext(AuthContext)

  const navigate = useNavigate();

  const logOut = async (e) => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });

    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="navbar">
      <h2>
        <Link to="/">KhoiChat</Link>
      </h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <>
            <button onClick={logOut} className="logout">
              Log Out
            </button>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/signup">Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Nav;

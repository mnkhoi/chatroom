import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, Timestamp, doc } from "firebase/firestore";
import { AuthContext } from "../context/auth";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const navigate = useNavigate();

  const {user} = useContext(AuthContext)

  const { name, email, password, error, loading } = data;

  const changeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const signUp = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: "Not all areas filled out", loading: false});
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        id: result.user.uid,
        name,
        email,
        dateCreate: Timestamp.fromDate(new Date()),
        isOnline: true,
      });

      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      navigate('/')
    } catch (er) {
      setData({ ...data, error: er.message, loading: false });
    }
  };

  return (
    <section>
      {user ? <Navigate to="/"/>: <><h3>Create An Account</h3>
      <form className="form" onSubmit={signUp}>
        <div className="name_container">
          <h5>NAME</h5>
          <input type="text" name="name" value={name} onChange={changeData} />
        </div>
        <div className="email_container">
          <h5>EMAIL</h5>
          <input type="text" name="email" value={email} onChange={changeData} />
        </div>
        <div className="password_container">
          <h5>PASSWORD</h5>
          <input
            type="password"
            name="password"
            value={password}
            onChange={changeData}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <input
          type="submit"
          value={loading ? "Loading ..." : "Sign Up"}
          disabled={loading}
        />
      </form>
      <p className="message">
        Have an account?{" "}
        <Link to="/login" className="formLink">
          Log In
        </Link>
      </p></>}
      
    </section>
  );
};

export default Signup;

import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../context/auth";

const Login = () => {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const navigate = useNavigate()

  const { email, password, error, loading } = data;

  const changeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const signIn = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "Not all areas filled out", loading: false });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        isOnline: true,
      });
      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      navigate("/");
    } catch (er) {
      setData({ ...data, error: er.message, loading: false });
    }
  };

  return (
    <section>
      {user ? (
        <Navigate to="/" />
      ) : (
        <>
          <h3>Sign Into Your Account</h3>
          <form className="form" onSubmit={signIn}>
            <div className="email_container">
              <h5>EMAIL</h5>
              <input
                type="text"
                name="email"
                value={email}
                onChange={changeData}
              />
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
              value={loading ? "Loading ..." : "Log In"}
              disabled={loading}
            />
          </form>
          <p className="message">
            Don't have an account?{" "}
            <Link to="/signup" className="formLink">
              Sign Up
            </Link>
          </p>
        </>
      )}
    </section>
  );
};

export default Login;

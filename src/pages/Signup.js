import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <section>
      <h3>Create An Account</h3>
      <form className="form">
        <div className="name_container">
          <h5>NAME</h5>
          <input type="text" name="name" />
        </div>
        <div className="email_container">
          <h5>EMAIL</h5>
          <input type="text" name="email" />
        </div>
        <div className="password_container">
          <h5>PASSWORD</h5>
          <input type="password" name="password" />
        </div>

        <input type="submit" value="Sign Up" />
      </form>
      <p>Have an account? <Link to="/login" className='formLink'>Log In</Link></p>
    </section>
  );
};

export default Signup;

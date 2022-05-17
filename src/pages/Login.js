import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <section>
      <h3>Log Into Account</h3>
      <form className="form">
        <div className="email_container">
          <h5>EMAIL</h5>
          <input type="text" name="email" />
        </div>
        <div className="password_container">
          <h5>PASSWORD</h5>
          <input type="password" name="password" />
        </div>

        <input type="submit" value="Log In" />
      </form>
      <p>Don't have an account? <Link to="/signup" className='formLink'>Sign Up</Link></p>
    </section>
  )
}

export default Login
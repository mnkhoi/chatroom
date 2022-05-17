import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="navbar">
      <h2><Link to="/">KhoiChat</Link></h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Log in</Link>
        </li>
        <li>
          <Link to="/signup">Register</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;

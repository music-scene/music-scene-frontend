import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

import "./Navbar.css"
import '../pages/Buttons.css'

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

  return (
    <nav className="Navbar">
      <Link to="/" className="title">
        LOGO
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : "closed"}>
      <hr></hr>
        <li>
          <NavLink to="/concerts">
            Concerts
          </NavLink>
        </li>
        <hr></hr>
        <li>
          <NavLink to="/venues">
            Venues
          </NavLink>
        </li>
        <hr></hr>
        <li>
          <NavLink to="/artists">
            Artists
          </NavLink>
        </li>
        <hr></hr>
        {isLoggedIn && (
          <>
            <li>
              <NavLink to={`/users/${user._id}`}>
                Profile
              </NavLink>
            </li>
            <button onClick={logOutUser} className="button">Logout</button>
          </>
        )}
        {!isLoggedIn && (
          <>
            {/* <li>
              <NavLink to="/signup">
                Sign Up
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/login">
                <button className="button">Login</button>
              </NavLink>
            </li>
          </>
        )}
      </ul>

    </nav>
  );
}

export default Navbar;
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

import "./Navbar.css"

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
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/concerts">
            Concerts
          </NavLink>
        </li>
        <li>
          <NavLink to="/venues">
            Venues
          </NavLink>
        </li>
        <li>
          <NavLink to="/artists">
            Artists
          </NavLink>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <NavLink to={`/users/${user._id}`}>
                Profile
              </NavLink>
            </li>
            <button onClick={logOutUser} className="ActionButtons">Logout</button>
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
                <button>Login</button>
              </NavLink>
            </li>
          </>
        )}
      </ul>

    </nav>
  );
}

export default Navbar;
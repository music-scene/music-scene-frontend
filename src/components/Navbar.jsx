import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/concerts">
        <button>Concerts</button>
      </Link>
      {isLoggedIn && (
        <>
          <Link to="/concerts/add">
            <button>Add Concert</button>
          </Link>
          <Link to="/venues">
            <button>Venues</button>
          </Link>
          <Link to="/venues/add">
            <button>Add Venue</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;

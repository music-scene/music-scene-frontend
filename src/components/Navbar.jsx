import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/concerts">
        <button>Concerts</button>
      </Link>
      <Link to="/venues">
        <button>Venues</button>
      </Link>
      <Link to="/artists">
        <button>Artists</button>
      </Link>
      {isLoggedIn && (
        <>
          <Link to="/concerts/add">
            <button>Add concert</button>
          </Link>
          <Link to="/venues/add">
            <button>Add Venue</button>
          </Link>
          <Link to="/artists/add">
            <button>Add Artist</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
          <Link to={`/users/${user._id}`}>
            <button>Profile</button>
          </Link>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/signup"><button>Sign Up</button></Link>
          <Link to="/login"><button>Login</button></Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
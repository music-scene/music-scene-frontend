import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import venueService from '../services/venue.service';
import './ListPages.css';

function VenueListPage() {
  const [venues, setVenues] = useState(null);
  const [displayVenues, setDisplayVenues] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const { isLoggedIn } = useContext(AuthContext)

  const getAllVenues = () => {
    venueService.getAllVenues()
      .then((response) => {
        const reversedVenues = response.data.reverse();
        setVenues(reversedVenues);
        setDisplayVenues(reversedVenues);
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    getAllVenues();
  }, []);

  useEffect(() => {
    if (venues !== null) {
      const result = venues.filter(({ name }) => {
        return name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setDisplayVenues(result);
    }
  }, [searchValue, venues]);

  return (
    <div className="VenueListPageContainer">
      <div className="RowContainer">
        <div className="inputContainer">
          <form>
            <input
              className="inputField"
              type="text"
              value={searchValue}
              onChange={handleSearch}
              required
            />
            <label className="inputLabel">SEARCH</label>
          </form>
        </div>

        {isLoggedIn && (
          <div className="AddButton">
            <Link to="/venues/add">Add venue</Link>
          </div>
        )}
      </div>

      {!displayVenues && <h1>No venues available</h1>}
      {displayVenues === null ? (
        <h1>Venues list is loading...</h1>
      ) : (
        <div>
          {displayVenues.map((venue) => (
            <div className="VenueContainer" key={venue._id}>
              <Link to={`/venues/${venue._id}`}>
                <img src={venue.imageUrl} alt={venue.name} />
                <h2>{venue.name}</h2>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VenueListPage;

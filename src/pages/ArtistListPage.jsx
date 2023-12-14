import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { sortAlphabetically } from "../helperFunctions/helperFunction";
import { AuthContext } from "../context/auth.context";
import artistService from "../services/artist.service";

function ArtistListPage() {
  const [artists, setArtist] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [displayArtists, setDisplayArtists] = useState(null);

  const { isLoggedIn } = useContext(AuthContext);

  let sortedArtists = null;

  const getAllArtists = () => {
    artistService
      .getAllArtists()
      .then((response) => {
        setArtist(response.data);
        setDisplayArtists(response.data);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    getAllArtists();
  }, []);

  useEffect(() => {
    if (artists !== null) {
      const result = artists.filter(({ name }) => {
        return name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setDisplayArtists(result);
    }
  }, [searchValue]);

  return (
    <div className="VenueListPageContainer">
      <div className="RowContainer">
        <div className="inputOutContainer">
          <div className="SearchContainer">
            <div className="search">
              <form>
                <input
                  className="inputField"
                  type="text"
                  placeholder="Search for an artist"
                  value={searchValue}
                  onChange={handleSearch}
                  required
                />
                <label className="inputLabel">SEARCH</label>
              </form>
            </div>
            {isLoggedIn && (
              <div className="AddButton">
                <Link to="/artists/add">
                  <div tabIndex="0" className="plusButton">
                    <svg
                      className="plusIcon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 30 30"
                    >
                      <g mask="url(#mask0_21_345)">
                        <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
                      </g>
                    </svg>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div >
      < div className="ConcertListPageContainer" >
        {(displayArtists !== null && displayArtists.length === 0) && <h1>No artists to display</h1>}
        {displayArtists === null
          ? (<h1>Artists list is loading...</h1>)
          : (sortedArtists = sortAlphabetically(displayArtists),
            sortedArtists.map((artist) => {
              return (
                <div className="VenueContainer" key={artist._id}>
                  <Link to={`/artists/${artist._id}`}>
                    <img src={artist.imageUrl} alt={artist.name} />
                    <h2>{artist.name}</h2>
                  </Link>
                </div>
              );
            })
          )}
      </div >
    </div>
  );
}

export default ArtistListPage;

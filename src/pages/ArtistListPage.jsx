import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { sortArtistsAlphabetically } from "../helperFunctions/helperFunction"
import { AuthContext } from "../context/auth.context";
import artistService from "../services/artist.service";

function ArtistListPage() {

    const [artists, setArtist] = useState(null)
    const [searchValue, setSearchValue] = useState("");
    const [displayArtists, setDisplayArtists] = useState(null)

    const { isLoggedIn } = useContext(AuthContext)

    let sortedArtists = null

    const getAllArtists = () => {

        artistService.getAllArtists()
            .then((response) => {
                setArtist(response.data)
                setDisplayArtists(response.data)
            })
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        getAllArtists()
    }, [])

    useEffect(() => {
        if (artists !== null) {
            const result = artists.filter(({ name }) => {
                return name.toLowerCase().includes(searchValue.toLowerCase());
            });
            setDisplayArtists(result);
        }
    }, [searchValue]);

    return (
        <div>
            <div className="SearchBarDiv">
                <div className="cntr-innr">
                    <label htmlFor="inpt_search" className="search">
                        SEARCH
                        <input
                            className="inpt_search"
                            type="text"
                            value={searchValue}
                            onChange={handleSearch}
                        />
                    </label>
                </div>
            </div>
            {isLoggedIn && (
                <div className="AddButton">
                    <Link to="/artists/add">
                        Add artist
                    </Link>
                </div>
            )}
            <div className="ConcertListPageContainer" >
                {!displayArtists && <h1>No artists</h1>}  {/* FIND A WAY TO MAKE THIS WORK PLEASE */}
                {displayArtists === null
                    ? (<h1>Artists list is loading...</h1>)
                    : (sortedArtists = sortArtistsAlphabetically(displayArtists), sortedArtists.map((artist) => {
                        return (
                            <div className="ConcertImageContainer" key={artist._id}>

                                <Link to={`/artists/${artist._id}`}>
                                    <div className="ConcertImageDiv" key={artist._id}>
                                        <img src={artist.imageUrl} />
                                        <div className="BgDiv"></div>
                                        <span className="TitleSpan">
                                            <p className="title">{artist.name.toUpperCase()}</p>
                                        </span>
                                    </div>
                                    <h2>{artist.name}</h2>
                                </Link>
                            </div>

                        );
                    })
                    )}
            </div >
        </div>
    )
}

export default ArtistListPage
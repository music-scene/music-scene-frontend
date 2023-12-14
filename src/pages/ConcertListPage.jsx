import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { getNamesForLists, sortConcertsByDate } from "../helperFunctions/helperFunction"
import { AuthContext } from "../context/auth.context";
import concertService from '../services/concert.service'
import venueService from '../services/venue.service'
import artistService from '../services/artist.service'
import './ListPages.css';

function ConcertListPage() {

    const [concerts, setConcerts] = useState(null);
    const [venuesNamesList, setVenuesNameList] = useState(null)
    const [artistsNamesList, setArtistsNameList] = useState(null)
    const [displayConcerts, setDisplayConcerts] = useState(null)
    const [searchValue, setSearchValue] = useState("");
    const [venueFilter, setVenueFilter] = useState("")
    const [artistFilter, setArtistFilter] = useState("")

    const { isLoggedIn } = useContext(AuthContext)


    let sortedConcerts = null;

    const getAllConcerts = () => {
        concertService.getAllConcerts()
            .then((response) => {
                setConcerts(response.data)
                setDisplayConcerts(response.data)
            })
            .catch((error) => console.log(error));
    };

    const getAllVenuesNames = () => {
        venueService.getAllVenues()
            .then((response) => {
                setVenuesNameList(getNamesForLists(response.data))
            })
            .catch((error) => console.log(error))
    }

    const getAllArtistNames = () => {
        artistService.getAllArtists()
            .then((response) => {
                setArtistsNameList(getNamesForLists(response.data))
            })
            .catch((error) => console.log(error))
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    };

    const handleVenueFilter = (event, data) => {
        setVenueFilter(data.value);
    }

    const handleArtistFilter = (event, data) => {
        console.log(data.value)
        setArtistFilter(data.value)
    }

    useEffect(() => {
        getAllConcerts()
        getAllVenuesNames()
        getAllArtistNames()
    }, [])

    useEffect(() => {
        if (concerts !== null) {
            const result = concerts.filter(({ title, venue, artist }) => {
                let artistNames = artist.map(artist => artist.name)
                console.log(artistNames)
                console.log(artistFilter)
                return title.toLowerCase().includes(searchValue.toLowerCase()) && (venue.name === venueFilter || venueFilter === "") && (artistNames.includes(artistFilter) || artistFilter === "") 
            })
            setDisplayConcerts(result)
        }
    }, [searchValue, venueFilter, artistFilter])

    return (
        <div className="VenueListPageContainer">
            <div className="RowContainer">
                <div className="searchContainer">
                    <form>
                        <input
                            className="inputField"
                            type="text"
                            placeholder="Search for concert"
                            value={searchValue}
                            onChange={handleSearch}
                            required
                        />
                        <label className="inputLabel">SEARCH</label>
                    </form>
                </div>
                {isLoggedIn && (
                    <div className="AddButton">
                        <Link to="/concerts/add">
                            <div tabIndex="0" className="plusButton">
                                <svg className="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                                    <g mask="url(#mask0_21_345)">
                                        <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
                                    </g>
                                </svg>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
            <div className="RowContainer">
                <div className="inputContainer">
                    <Dropdown
                        className="inputFieldDropdown"
                        placeholder="Select a venue"
                        fluid={false}
                        clearable
                        selection
                        value={venueFilter || ""}
                        onChange={handleVenueFilter}
                        options={venuesNamesList}
                    />
                    <label
                        className="inputLabel"
                        htmlFor="inputFieldDropdown">Venues
                    </label>
                </div>
                <div className="RowContainer">
                    <div className="inputContainer">
                        <Dropdown
                            className="inputFieldDropdown"
                            placeholder="Select a artist"
                            fluid={false}
                            clearable
                            selection
                            value={artistFilter || ""}
                            onChange={handleArtistFilter}
                            options={artistsNamesList}
                        />
                        <label
                            className="inputLabel"
                            htmlFor="inputFieldDropdown">Artist
                        </label>
                    </div>
                </div>
                < div className="ConcertListPageContainer" >
                    {(displayConcerts !== null && displayConcerts.length === 0) && <h1>No upcoming concerts</h1>}  {/* FIND A WAY TO MAKE THIS WORK PLEASE */}
                    {displayConcerts === null
                        ? (<h1>Concerts list is loading...</h1>)
                        : (sortedConcerts = sortConcertsByDate(displayConcerts),
                            sortedConcerts.map((concert) => {
                                return (
                                    <div className="ConcertImageContainer" key={concert._id}>
                                        <Link to={`/concerts/${concert._id}`}>
                                            <div className="ConcertImageDiv" key={concert._id}>
                                                <img src={concert.imageUrl} />
                                            </div>
                                            <h2>{concert.title}</h2>
                                        </Link>
                                    </div>

                                );
                            })
                        )}
                </div >
            </div >
        </div>
    )
}

export default ConcertListPage;

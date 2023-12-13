import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { getNamesForLists, sortConcertsByDate } from "../helperFunctions/helperFunction"
import { AuthContext } from "../context/auth.context";
import concertService from '../services/concert.service'
import venueService from '../services/venue.service'
import './ListPages.css';

function ConcertListPage() {

    const [concerts, setConcerts] = useState(null);
    const [venuesNamesList, setVenuesNameList] = useState(null)
    const [displayConcerts, setDisplayConcerts] = useState(null)
    const [searchValue, setSearchValue] = useState("");
    const [venueFilter, setVenueFilter] = useState("All")

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

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    };

    const handleFilter = (event, data) => {
        setVenueFilter(data.value);
    }

    useEffect(() => {
        getAllConcerts()
        getAllVenuesNames()
    }, [])

    useEffect(() => {
        if (concerts !== null) {
            const result = concerts.filter(({ title, venue }) => {
                return title.toLowerCase().includes(searchValue.toLowerCase()) && (venue.name === venueFilter || venueFilter === "")
            })
            setDisplayConcerts(result)
        }
    }, [searchValue, venueFilter])

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
            <div>
                <label className="">
                    <p>Venues</p>
                    <Dropdown
                        placeholder="Venue"
                        fluid={false}
                        clearable
                        selection
                        onChange={handleFilter}
                        options={venuesNamesList}
                    />
                </label>
            </div>
            {isLoggedIn && (
                <div className="AddButton">
                    <Link to="/concerts/add">
                        Add concert
                    </Link>
                </div>
            )}
                < div className="ConcertListPageContainer" >
            {!displayConcerts && <h1>No upcoming concerts</h1>}  {/* FIND A WAY TO MAKE THIS WORK PLEASE */}
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
    )
}

export default ConcertListPage;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import venueService from '../services/venue.service';

function VenueListPage() {
    const [venues, setVenues] = useState(null);
    const [displayVenues, setDisplayVenues] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const getAllVenues = () => {
        venueService.getAllVenues()
            .then((response) => {
                setVenues(response.data);
                setDisplayVenues(response.data);
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
            <div className="VenueListPageContainer">
                {!displayVenues && <h1>No venues available</h1>}
                {displayVenues === null
                    ? (<h1>Venues list is loading...</h1>)
                    : (
                        <div>
                            {displayVenues.map((venue) => (
                                <div className="VenueContainer" key={venue._id}>
                                    <Link to={`/venues/${venue._id}`}>
                                        <h2>{venue.name}</h2>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        </div>
    );
}

export default VenueListPage;

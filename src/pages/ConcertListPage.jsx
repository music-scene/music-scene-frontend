import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sortConcertsByDate } from "../helperFunctions/helperFunction"
import concertService from '../services/concert.service'

function ConcertListPage() {

    const [concerts, setConcerts] = useState(null);
    const [displayConcerts, setDisplayConcerts] = useState(null)
    const [searchConcerts, setSearchConcerts] = useState("");
    let sortedConcerts = null;

    const getAllConcerts = () => {
        concertService.getAllConcerts()
            .then((response) => {
                setConcerts(response.data)
                setDisplayConcerts(response.data)
            })
            .catch((error) => console.log(error));
    };

    // Search related functions
    const handleSearch = (e) => {
        e.preventDefault();

        setSearchConcerts(e.target.value);
    };

    useEffect(() => {
        getAllConcerts()
    }, [])

    useEffect(() => {

        const concertSearch = searchConcerts === ""
            ? concerts
            : concerts.filter((elm) => {
                return elm.title.toLowerCase().includes(searchConcerts.toLowerCase());
            });

        setDisplayConcerts(concertSearch);

    }, [searchConcerts]);

    return (
        <div>
            <div className="SearchBarDiv">
                <div className="cntr-innr">
                    <label htmlFor="inpt_search" className="search">
                        SEARCH
                        <input
                            className="inpt_search"
                            type="text"
                            value={searchConcerts}
                            onChange={handleSearch}
                        />
                    </label>
                </div>
            </div>
            <div className="ConcertListPageContainer" >
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
        </div>
    )
}

export default ConcertListPage;

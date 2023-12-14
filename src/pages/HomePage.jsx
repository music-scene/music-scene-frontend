import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sortConcertsByDate } from "../helperFunctions/helperFunction";
import concertService from '../services/concert.service';


function HomePage() {
    const [concerts, setConcerts] = useState(null);
    let sortedConcerts = null;

    const getAllConcerts = () => {
        concertService.getAllConcerts()
            .then((response) => {
                setConcerts(response.data)
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllConcerts();
    }, []);

    return (
        <div className="VenueListPageContainer">
            <div className="HeaderContent">
                <img src="https://spotfestival.dk/wp-content/uploads/2023/12/Coverbillede-2024-3.png" alt="Header" />
                <h1 style={{fontStyle: "italic"}}>Your Guide to Live Music</h1>
            </div>


            <div className="ConcertListPageContainer">
                {(concerts !== null && concerts.length === 0) && <h1>No upcoming concerts</h1>}
                {concerts === null
                    ? (<h1>Concerts list is loading...</h1>)
                    : (sortedConcerts = sortConcertsByDate(concerts), sortedConcerts.splice(10),
                        sortedConcerts.map((concert) => {
                            return (
                                <div className="ConcertImageContainer" key={concert._id}>
                                    <Link to={`/concerts/${concert._id}`}>
                                        <div className="ConcertImageDiv" key={concert._id}>
                                            <img src={concert.imageUrl} alt={concert.title} />
                                        </div>
                                        <h2>{concert.title}</h2>
                                    </Link>
                                </div>
                            );
                        })
                    )}
            </div>
        </div>
    );
}

export default HomePage;

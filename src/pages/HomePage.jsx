import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sortConcertsByDate } from "../helperFunctions/helperFunction"
import concertService from '../services/concert.service'

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
        <div className="ConcertListPageContainer" >
            {!concerts && <h1>No upcoming concerts</h1>}  {/* FIND A WAY TO MAKE THIS WORK PLEASE */}
            {concerts === null 
                ? (<h1>Concerts list is loading...</h1>)
                : (sortedConcerts = sortConcertsByDate(concerts), sortedConcerts.splice(4),
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
    )
  }
  
  export default HomePage;
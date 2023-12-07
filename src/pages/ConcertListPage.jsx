import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import concertService from '../services/concert.service'

function ConcertListPage() {

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

    function sortConcertsByDate() {
        // Deep copy of array in order to avoid modifying the original array
        sortedConcerts = structuredClone(concerts);

        // Sort by date, ascending
        sortedConcerts.sort((a, b) => {

            // Substring date to only yyyy-mm-dd hh:mm:ss
            a = a.date.substring(0, 10) + a.date.substring(11, 19)
            b = b.date.substring(0, 10) + b.date.substring(11, 19)

            // Remove '-' & ':' and join
            a = a.split(/[-:]+/).join("")
            b = b.split(/[-:]+/).join("")

            return a - b
        })
    }

    return (
        <div className="ConcertListPageContainer" >
            {!concerts && <h1>No upcoming concerts</h1>}  {/* FIND A WAY TO MAKE THIS WORK PLEASE */}
            {concerts === null 
                ? (<h1>Concerts list is loading...</h1>)
                : (sortConcertsByDate(),
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

export default ConcertListPage;

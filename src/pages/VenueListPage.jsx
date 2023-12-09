import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import venueService from '../services/venue.service';

function VenueListPage() {
    const [venues, setVenues] = useState(null);

    const getAllVenues = () => {

        venueService.getAllVenues()
            .then((response) => {
                setVenues(response.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllVenues();
    }, []);


    return (
        <div>

            {!venues && <h1>No venues available</h1>}
            {venues === null
                ? (<h1>Venues list is loading...</h1>)
                : (
                    <div>
                        {venues.map((venue) => (
                            <div key={venue._id}>
                                <Link to={`/venues/${venue._id}`}>
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

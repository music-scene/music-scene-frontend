import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import venueService from '../services/venue.service';

function VenueDetailsPage() {
    const [venueDetails, setVenueDetails] = useState(null);
    const { venueId } = useParams();

    const getVenueById = () => {
        venueService.getVenueById(venueId)
            .then((response) => {
                setVenueDetails(response.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getVenueById();
    }, [venueId]);

    return (
        <div>
            <div>
                {venueDetails === null
                    ? (<h1>Loading venue details...</h1>)
                    : (
                        <div>
                            <h1>{venueDetails.name}</h1>
                            <p><strong>Location:</strong> {venueDetails.location}</p>
                            <p><strong>Description:</strong> {venueDetails.description}</p>
                            <p><strong>Capacity:</strong> {venueDetails.capacity}</p>
                            <img src={venueDetails.imageUrl} alt={venueDetails.name} />

                        </div>
                    )}
            </div>
        </div>
    );
}

export default VenueDetailsPage;

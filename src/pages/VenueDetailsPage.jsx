import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import venueService from '../services/venue.service';
import { AuthContext } from "../context/auth.context";
import EditVenue from "../components/EditVenue";

function VenueDetailsPage() {
    const [venueDetails, setVenueDetails] = useState(null);
    const [showEditContainer, setShowEditContainer] = useState(false);
    const { venueId } = useParams();
    const { user, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const getVenueById = () => {
        venueService.getVenueById(venueId)
            .then((response) => {
                setVenueDetails(response.data);
            })
            .catch((error) => console.log(error));
    };

    const showHideEditContainer = () => setShowEditContainer(!showEditContainer);

    const handleDelete = () => {
        venueService.deleteVenue(venueId)
            .then(() => {
                navigate('/venues');
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getVenueById();
    }, [venueId]);

    return (
        <div className="">
            <div className="">
                {venueDetails === null
                    ? (<h1>Loading venue details...</h1>)
                    : (
                        <div>
                            <h1>{venueDetails.name}</h1>
                            <p><strong>Location:</strong> {venueDetails.location}</p>
                            <p><strong>Description:</strong> {venueDetails.description}</p>
                            <p><strong>Capacity:</strong> {venueDetails.capacity}</p>
                            <img src={venueDetails.imageUrl} alt={venueDetails.name} />
                            {isLoggedIn && (
                                <div>
                                    <button onClick={showHideEditContainer}>EDIT</button>
                                    <div className={`EditContainer ${showEditContainer ? "show" : "hide"}`}>
                                        {<EditVenue venueId={venueId} />}
                                    </div>
                                    <button onClick={handleDelete}>DELETE</button>
                                </div>
                            )}
                        </div>
                    )}
            </div>
        </div>
    );
}

export default VenueDetailsPage;

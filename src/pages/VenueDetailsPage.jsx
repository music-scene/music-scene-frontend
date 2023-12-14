import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import venueService from '../services/venue.service';
import { AuthContext } from "../context/auth.context";
import EditVenue from "../components/EditVenue";
import "./DetailsPages.css";

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
        <div className="DetailsPageContainer">
            <div className="VenueDetailsContainer">
                <div className="VenueImageContainer">
                    {venueDetails !== null && (
                        <img src={venueDetails.imageUrl} alt={venueDetails.name} />
                    )}
                </div>
                <div className="VenueInfoContainer">
                    {venueDetails !== null && (
                        <>
                            <h1>{venueDetails.name}</h1>
                            <p><strong>Location:</strong> {venueDetails.location}</p>
                            <p><strong>Description:</strong> {venueDetails.description}</p>
                            <p><strong>Capacity:</strong> {venueDetails.capacity}</p>
                        </>
                    )}
                </div>
            </div>
            {isLoggedIn && venueDetails !== null && venueDetails.author !== null && user._id === venueDetails.author._id && (
                <div className="EditDeleteContainer">
                    <button onClick={showHideEditContainer}>EDIT</button>
                    <div className={`EditContainer ${showEditContainer ? "show" : "hide"}`}>
                        {<EditVenue venueId={venueId} />}
                    </div>
                    <button onClick={handleDelete}>DELETE</button>
                </div>
            )}
        </div>
    );
}

export default VenueDetailsPage;

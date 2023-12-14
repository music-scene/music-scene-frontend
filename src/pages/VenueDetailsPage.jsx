import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import venueService from '../services/venue.service';
import EditVenue from "../components/EditVenue";
import VenueDetailsContainer from "../components/VenueDetailsContainer"
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
        <div className="">
            <div className="ConcertDetailsContainer">
                <div className="ConcertDetailsImageContainer">
                    {venueDetails === null
                        ? <h1>Loading venue details...</h1>
                        : <VenueDetailsContainer venue={venueDetails} />
                    }
                </div>
            </div>
            {isLoggedIn && venueDetails !== null && venueDetails.author !== null && user._id === venueDetails.author._id && (
                <div className="EditDeleteContainer">
                    <button onClick={showHideEditContainer} className="button">Edit</button>
                    <div className={`EditContainer ${showEditContainer ? "show" : "hide"}`}>
                        {<EditVenue venueId={venueId} />}
                    </div>
                    <button onClick={handleDelete} className="button">Delete</button>
                </div>
            )}
        </div>
    );
}

export default VenueDetailsPage;
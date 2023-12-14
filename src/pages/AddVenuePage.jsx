import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import venueService from '../services/venue.service';
import { setDefaultImageUrl, defaultImageUrl } from "../helperFunctions/helperFunction";
import { AuthContext } from "../context/auth.context";

function AddVenuePage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState(undefined);
    const [imageUrl, setImageUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined)

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const venueData = {
            name,
            description,
            location,
            capacity,
            imageUrl: setDefaultImageUrl(imageUrl),
            author: user._id,
        };

        venueService.addVenue(venueData)
            .then(() => {
                navigate("/venues");
            })
            .catch((error) => {
                console.log("An error occurred: ");
                console.log(error);
                const errorDescription = error.response.data.message
                setErrorMessage(errorDescription)
            });
    };

    return (
        <div>
            <div className="ConcertDetailsContainer Add">
                <div className="ConcertDetailsImageContainer">
                    <h1>Add Venue</h1>
                    <div>
                        <div className="ConcertDetailsContainer">
                            <div className="ConcertDetailsImageDiv Add">
                                <img src={imageUrl ? imageUrl : defaultImageUrl} />
                            </div>
                        </div>
                        <div className="EditDeleteContainer Add">
                            <div className="FormAdd">
                                <form onSubmit={handleSubmit}>
                                    <div className="inputContainer">
                                        <input
                                            type="text"
                                            name="name"
                                            className="inputField"
                                            placeholder="Name"
                                            required={true}
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                        />
                                        <label
                                            className="inputLabel"
                                            htmlFor="inputField">Name
                                        </label>
                                    </div>
                                    <div className="inputContainer">
                                        <textarea
                                            type="text"
                                            name="description"
                                            className="inputArea"
                                            placeholder="Description"
                                            required={true}
                                            value={description}
                                            onChange={(e) => {
                                                setDescription(e.target.value);
                                            }}
                                        />
                                        <label
                                            className="inputLabel"
                                            htmlFor="inputArea">Description
                                        </label>
                                    </div>
                                    <div className="inputContainer">
                                        <input
                                            type="text"
                                            name="location"
                                            className="inputField"
                                            placeholder="Location"
                                            required={true}
                                            value={location}
                                            onChange={(e) => {
                                                setLocation(e.target.value);
                                            }}
                                        />
                                        <label
                                            className="inputLabel"
                                            htmlFor="inputArea">Location
                                        </label>
                                    </div>
                                    <div className="inputContainer">
                                        <input
                                            type="number"
                                            name="capacity"
                                            className="inputField"
                                            placeholder="Capacity"
                                            required={true}
                                            min={0}
                                            value={capacity}
                                            onChange={(e) => {
                                                setCapacity(e.target.value);
                                            }}
                                        />
                                        <label
                                            className="inputLabel"
                                            htmlFor="inputField">Capacity
                                        </label>
                                    </div>
                                    <div className="inputContainer">
                                        <input
                                            type="text"
                                            name="imageUrl"
                                            className="inputField"
                                            placeholder="Image URL"
                                            required={true}
                                            value={imageUrl}
                                            onChange={(e) => {
                                                setImageUrl(e.target.value);
                                            }}
                                        />
                                        <label
                                            className="inputLabel"
                                            htmlFor="inputField">Image URL
                                        </label>
                                    </div>
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                                    <button type="submit" className="button">Add Venue</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddVenuePage;

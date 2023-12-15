import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import venueService from '../services/venue.service';

function EditVenue() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined)

    const { venueId } = useParams();

    const navigate = useNavigate();

    const getVenueById = () => {
        venueService.getVenueById(venueId)
            .then((response) => {
                const venue = response.data;
                setName(venue.name);
                setDescription(venue.description);
                setLocation(venue.location);
                setCapacity(venue.capacity);
                setImageUrl(venue.imageUrl);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getVenueById();
    }, [venueId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            name: name,
            description: description,
            location: location,
            capacity: capacity,
            imageUrl: imageUrl,
        };

        venueService.editVenue(venueId, requestBody)
            .then(() => {
                navigate(0);
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
            <div className="">
                <div className="">
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
                        <button type="submit" className="button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditVenue;

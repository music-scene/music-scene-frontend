import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import venueService from '../services/venue.service';

function EditVenue() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
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
            });
    };

    return (
        <div>
            <div>
                <h1>EDIT VENUE</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Name</p>
                        <input
                            type="text"
                            name="name"
                            required={true}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Description</p>
                        <textarea
                            type="text"
                            name="description"
                            required={true}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Location</p>
                        <input
                            type="text"
                            name="location"
                            required={true}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Capacity</p>
                        <input
                            type="number"
                            name="capacity"
                            required={true}
                            min={0}
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Image URL</p>
                        <input
                            type="text"
                            name="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </label>
                    <button type="submit">Submit changes</button>
                </form>
            </div>
        </div>
    );
}

export default EditVenue;

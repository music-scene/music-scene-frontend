import { useState } from "react";
import { useNavigate } from "react-router-dom";
import venueService from '../services/venue.service';

function AddVenuePage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState(0);


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const venueData = {
            name,
            description,
            location,
            capacity,

        };

        venueService.addVenue(venueData)
            .then(() => {
                navigate("/venues");
            })
            .catch((error) => {
                console.log("An error occurred: ");
                console.log(error);

            });
    };

    return (
        <div>
            <div>
                <h1>Add Venue</h1>
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

                    <button>Add Venue</button>
                </form>
            </div>
        </div>
    );
}

export default AddVenuePage;

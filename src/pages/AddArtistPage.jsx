import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { defaultImageUrl, setDefaultImageUrl } from "../helperFunctions/helperFunction"
import { AuthContext } from "../context/auth.context";
import artistService from '../services/artist.service'

function AddArtistPage() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined)

    const { user } = useContext(AuthContext)

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            name: name,
            description: description,
            imageUrl: setDefaultImageUrl(imageUrl),
            author: user
        };

        artistService.addArtist(requestBody)
            .then((response) => {
                navigate('/artists')
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
                    <br />
                    <h1>ADD ARTIST</h1>
                    <br />
                    <br />
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
                        <button type="submit" className="button">
                            Submit
                        </button>
                    </form>
                </div>
                <div>
                    <div className="ConcertDetailsContainer">
                        <div className="ConcertDetailsImageDiv">
                            <img src={imageUrl ? imageUrl : defaultImageUrl} />
                        </div>
                        <div className="ConcertDetailsInfoDiv">
                            <h3 className="">NAME</h3>
                            <p>{name}</p>
                            <h3 className="">DESCRIPTION</h3>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AddArtistPage;

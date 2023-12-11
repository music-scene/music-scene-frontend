import { useState, useContext } from "react";
import { useNavigate} from "react-router-dom";
import { defaultImageUrl, setDefaultImageUrl } from "../helperFunctions/helperFunction"
import { AuthContext } from "../context/auth.context";
import artistService from '../services/artist.service'

function AddArtistPage() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState(`${defaultImageUrl}`);
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
                    <h1>ADD ARTIST</h1>
                    <form onSubmit={handleSubmit}>
                        <label className="">
                            <p>Name</p>
                            <input
                                type="text"
                                name="name"
                                required={true}
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </label>
                        <label className="">
                            <p>Description</p>
                            <textarea
                                type="text"
                                name="description"
                                required={true}
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </label>
                        <label className="ImageLabel">
                            <p>Image URL</p>
                            <input
                                type="text"
                                name="imageUrl"
                                value={imageUrl}
                                onChange={(e) => {
                                    setImageUrl(e.target.value);
                                }}
                            />
                        </label>
                        <button className="">Submit changes</button>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
                <div>
                    <div className="ConcertDetailsContainer">
                        <div className="ConcertDetailsImageDiv">
                            <img src={imageUrl} />
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

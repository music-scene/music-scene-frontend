import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import artistService from '../services/artist.service'
import { setDefaultImageUrl } from "../helperFunctions/helperFunction"

import '../pages/Forms.css'
import '../pages/Buttons.css'

function EditArtist(props) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined)

    const { artistId } = useParams()

    const navigate = useNavigate();

    const populateFields = () => {
        setName(props.artist.name)
        setDescription(props.artist.description)
        setImageUrl(props.artist.imageUrl)
    }


    useEffect(() => {
        populateFields()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            name: name,
            description: description,
            imageUrl: setDefaultImageUrl(imageUrl)
        };

        artistService.editArtist(artistId, requestBody)
            .then((response) => {
                navigate(0)
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
                    <h1>EDIT ARTIST</h1>
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
                        <button type="submit" className="">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditArtist
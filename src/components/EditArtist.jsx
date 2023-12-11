import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import artistService from '../services/artist.service'
import {  setDefaultImageUrl } from "../helperFunctions/helperFunction"

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
            .then(() => {
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
            </div>
        </div>
    );
}

export default EditArtist
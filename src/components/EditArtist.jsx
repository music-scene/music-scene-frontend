import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNamesForLists, setDefaultImageUrl } from "../helperFunctions/helperFunction"
import { Dropdown } from "semantic-ui-react";
import artistService from '../services/artist.service'
import genreService from "../services/genre.service";

import '../pages/Forms.css'
import '../pages/Buttons.css'

function EditArtist(props) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [genresList, setGenresList] = useState(null)
    const [genresIds, setGenresIds] = useState(null)
    const [genresNames, setGenresNames] = useState(null)
    const [genresNamesList, setGenresNamesList] = useState(null)
    const [imageUrl, setImageUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined)

    const { artistId } = useParams()

    const navigate = useNavigate();

    const populateFields = () => {
        setName(props.artist.name)
        setGenresIds(getGenresIds(props.artist.genre))
        setGenresNames(getGenresNames(props.artist.genre))
        setDescription(props.artist.description)
        setImageUrl(props.artist.imageUrl)
    }

    const getGenresIds = (genres) => {
        let genresIds = null;

        if (genres !== null) {
            genresIds = genres.map(genre => {
                return genre._id
            })
        }
        return genresIds
    }

    const getGenresNames = (genres) => {
        let names = null;

        if (genres !== null) {
            names = genres.map(genre => {
                return genre.name
            })
        }
        return names;
    }

    const getAllGenres = () => {

        genreService.getAllGenres()
            .then((response) => {
                setGenresNamesList(getNamesForLists(response.data))
                setGenresList(response.data)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getAllGenres()
        populateFields()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            name: name,
            description: description,
            genre: genresIds,
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

    const handleGenreSelection = (event, data) => {

        if (data.value.length === 0) {
            setGenresIds(null)
            setGenresNames(null) 
        }

        let genresIdsArray = []
        let genresNamesArray = []

        genresList.forEach((genre) => {
            data.value.forEach((value) => {
                if (genre.name === value) {
                    genresIdsArray.push(genre._id)
                    genresNamesArray.push(genre.name)
                    setGenresNames(genresNamesArray)
                }
            })
        })

        if (data.value.length === 0) setGenresNames(null) 
        
        setGenresIds(genresIdsArray)
    }

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
                            <Dropdown
                                className="inputFieldDropdown"
                                placeholder="Genres"
                                fluid={true}
                                value={genresNames}
                                selection
                                multiple
                                onChange={handleGenreSelection}
                                options={genresNamesList}
                            />
                            <label
                                className="inputLabel"
                                htmlFor="inputFieldDropdown">Genres
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

export default EditArtist
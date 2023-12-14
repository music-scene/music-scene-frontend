import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { defaultImageUrl, setDefaultImageUrl } from "../helperFunctions/helperFunction"
import { AuthContext } from "../context/auth.context";
import { getNamesForLists, looper, sortObject } from "../helperFunctions/helperFunction"
import artistService from '../services/artist.service'
import genreService from '../services/genre.service'

function AddArtistPage() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [genres, setGenres] = useState(null)
    const [genreList, setGenreList] = useState(null)
    const [genresIds, setGenresIds] = useState(null)
    const [genresNames, setGenresNames] = useState(null)
    const [genreNameList, setGenreNameList] = useState(null)
    const [imageUrl, setImageUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined)

    const { user } = useContext(AuthContext)

    const navigate = useNavigate();
    let newId = ""
    const getAllGenres = () => {

        //setIsAdded(false)
        genreService.getAllGenres()
            .then((response) => {
                console.log("forst")
                setGenreNameList(getNamesForLists(response.data))
                setGenreList(response.data)
                setGenresNames(getNames(response.data))
            })
            .catch((error) => console.log(error))
    }

    const getNames = (genres) => {
        const names = genres.map(genre => genre.name)

        return names
    }

    const addGenre = (genre) => {

        const requestBody = {
            name: genre
        }


        genreService.addGenre(requestBody)
            .then(response => {
                newId = response.data._id
                pushNewId(newId)
                console.log(response)
            })
            .catch((error) => console.log(error))

        let newIdArray = []
        newIdArray.push(newId)
    }

    const pushNewId = (newId) => {

        setGenresIds(genresIds => [...genresIds, newId])
    }


    useEffect(() => {
        getAllGenres()
    }, [genresIds])

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            name: name,
            description: description,
            genre: genresIds,
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

    const handleGenreSelection = (event, data) => {

        if (data.value.length === 0) setGenres(null)

        let genresIdsArray = []
        let genresNamesArray = []

        genreList.forEach((genre) => {
            data.value.forEach((value) => {
                if (genre.name === value) {
                    genresIdsArray.push(genre._id)
                    genresNamesArray.push(genre.name)
                    console.log(genresNamesArray)
                    setGenres(genresNamesArray)
                }
            })
        })

        console.log(genresIdsArray)

        if (genresIdsArray !== null) setGenresIds(genresIdsArray)
    }

    const handleAddItem = (event, data) => {

        let genresNamesArray = [...genresNames]

        let genres = genreList.map(genre => genre.name)

        if (!genres.includes(data.value)) {
            genresNamesArray.push(data.value);
            addGenre(data.value)
            setGenresNames(genresNamesArray)
        }

        let temp = looper(genresNamesArray)
        let newList = sortObject(temp)

        setGenreNameList(newList)
    }

    return (
        <div>
            <div className="ConcertDetailsContainer Add">
                <div className="ConcertDetailsImageContainer">
                    <h1>Add Artist</h1>
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
                                        <Dropdown
                                            className="inputFieldDropdown"
                                            placeholder="Genre(s)"
                                            fluid={true}
                                            allowAdditions
                                            search
                                            scrolling
                                            selection
                                            multiple
                                            onAddItem={handleAddItem}
                                            onChange={handleGenreSelection}
                                            options={genreNameList}
                                        />
                                        <label
                                            className="inputLabel"
                                            htmlFor="inputFieldDropdown">Genre(s)
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddArtistPage;

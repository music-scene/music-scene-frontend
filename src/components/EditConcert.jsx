import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import venueService from '../services/venue.service'
import concertService from '../services/concert.service'
import artistService from '../services/artist.service'
import { getNamesForLists, setDefaultImageUrl } from "../helperFunctions/helperFunction"

function EditConcert(props) {

    const [title, setTitle] = useState("");
    const [artistId, setArtistId] = useState(null);
    const [artistsIds, setArtistsIds] = useState(null)
    const [artistsList, setArtistsList] = useState(null)
    const [artistsNames, setArtistsNames] = useState(null)
    const [artistsNameList, setArtistsNameList] = useState(null)
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [date, setDate] = useState("")
    const [price, setPrice] = useState(0);
    const [venueId, setVenueId] = useState(null)
    const [venuesList, setVenuesList] = useState(null)
    const [venuesNameList, setVenuesNameList] = useState(null)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const { concertId } = useParams()

    const venueName = props.concert.venue.name
    const navigate = useNavigate();

    const populateFields = () => {
        setTitle(props.concert.title)
        setArtistsIds(getArtistsIds(props.concert.artist))
        setArtistsNames(getArtistsNames(props.concert.artist))
        setDescription(props.concert.description)
        setImageUrl(props.concert.imageUrl)
        setDate(`${props.concert.date.substring(0, 10)} ${props.concert.date.substring(11, 16)}`)
        setPrice(props.concert.price)
        setVenueId(props.concert.venue._id)
    }

    const getArtistsNames = (artists) => {
        let names = null;

        if (artists !== null) {
            names = artists.map(artist => {
                return artist.name
            })
        }
        return names;
    }

    const getArtistsIds = (artists) => {
        let artistsIds = null;

        if (artists !== null) {
            artistsIds = artists.map(artist => {
                return artist._id
            })
        }
        return artistsIds
    }

    const getAllVenues = () => {

        venueService.getAllVenues()
            .then((response) => {
                setVenuesNameList(getNamesForLists(response.data))
                setVenuesList(response.data)
            })
            .catch((error) => console.log(error))
    }

    const getAllArtists = () => {
        artistService.getAllArtists()
            .then((response) => {
                setArtistsNameList(getNamesForLists(response.data, false))
                setArtistsList(response.data)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        populateFields()
        getAllVenues()
        getAllArtists()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            title: title,
            artist: artistsIds,
            venue: venueId,
            description: description,
            date: date,
            price: parseFloat(price),
            imageUrl: setDefaultImageUrl(imageUrl)
        };

        concertService.editConcert(concertId, requestBody)
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

    const handleVenueSelection = (event, data) => {

        const selectedVenueArray = venuesList.find((venue) => {
            return venue.name === data.value
        })
        setVenueId(selectedVenueArray._id.toString());
    };

    const handleArtistSelections = (event, data) => {
        console.log(event)
        let artistArray = [];
        let artistsIDsArray = []
        let artistsNamesArray = []

        artistsList.forEach((artist) => {
            data.value.forEach((value) => {
                if (artist.name === value) {
                    artistArray.push(artist)
                    artistsIDsArray.push(artist._id)
                    artistsNamesArray.push(artist.name)
                    setArtistsNames(artistsNamesArray)
                }
            })
        })
        if (data.value.length === 0) setArtistsNames(null)

        setArtistsIds(artistsIDsArray)
    };

    return (
        <div>
            <div className="">
                <div className="">
                    <h1>EDIT CONCERT</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="inputContainer">
                            <input
                                type="text"
                                name="title"
                                className="inputField"
                                placeholder="Title"
                                required={true}
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                            <label
                                className="inputLabel"
                                htmlFor="inputField">Title
                            </label>
                        </div>
                        <div className="inputContainer">
                            <Dropdown
                                className="inputFieldDropdown"
                                placeholder="Artist"
                                fluid={true}
                                value={artistsNames}
                                selection
                                multiple
                                onChange={handleArtistSelections}
                                options={artistsNameList}
                            />
                            <label
                                className="inputLabel"
                                htmlFor="inputFieldDropdown">Artist
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
                                className="inputFieldDropdown venue"
                                placeholder="Venue"
                                fluid={false}
                                defaultValue={venueName}
                                clearable
                                selection
                                onChange={handleVenueSelection}
                                options={venuesNameList}
                            />
                            <label
                                className="inputLabel"
                                htmlFor="inputFieldDropdown">Venue
                            </label>
                        </div>
                        <div className="inputContainer">
                            <input
                                type="datetime-local"
                                name="date"
                                className="inputField"
                                placeholder="Date   "
                                required={true}
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                }}
                            />
                            <label
                                className="inputLabel"
                                htmlFor="inputField">Date
                            </label>
                        </div>
                        <div className="inputContainer">
                            <input
                                type="number"
                                name="price"
                                className="inputField"
                                placeholder="Price"
                                required={true}
                                min={0}
                                step=".01"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                            />
                            <label
                                className="inputLabel"
                                htmlFor="inputField">Price
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
                {/* <div>
                    <GameDetailsContainer title={title} imageUrl={imageUrl} description={description} rating={rating} price={price} genre={genre} platform={platform} />
                </div> */}
            </div>
        </div>
    );
}

export default EditConcert
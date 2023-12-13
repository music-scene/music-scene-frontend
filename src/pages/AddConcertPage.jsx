import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import venueService from '../services/venue.service'
import concertService from '../services/concert.service'
import artistService from '../services/artist.service'
import { AuthContext } from "../context/auth.context";
import { getNamesForLists, defaultImageUrl, setDefaultImageUrl } from "../helperFunctions/helperFunction"

function AddConcertPage() {

    const [title, setTitle] = useState("");
    const [artistId, setArtistId] = useState(null);
    const [artistsIds, setArtistIds] = useState(null)
    const [artistName, setArtistName] = useState(null)
    const [artistsNames, setArtistsNames] = useState(null)
    const [artistsList, setArtistsList] = useState(null)
    const [artistsNameList, setArtistsNameList] = useState(null)
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [date, setDate] = useState(null)
    const [price, setPrice] = useState(undefined);
    const [venueId, setVenueId] = useState(null)
    const [venueName, setVenueName] = useState("")
    const [venuesList, setVenuesList] = useState(null)
    const [venuesNameList, setVenuesNameList] = useState(null)
    const [errorMessage, setErrorMessage] = useState(undefined)

    let currentDate = new Date().toISOString()
    currentDate = `${currentDate.substring(0, 10)} ${currentDate.substring(11, 16)}`

    //let artistsNames = []

    const { user } = useContext(AuthContext)

    const navigate = useNavigate();

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
                setArtistsNameList(getNamesForLists(response.data))
                setArtistsList(response.data)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getAllVenues()
        getAllArtists()
        //setDate(currentDate)
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
            imageUrl: setDefaultImageUrl(imageUrl),
            author: user,
        };


        concertService.addConcert(requestBody)
            .then(() => {
                navigate("/concerts");
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
            setVenueName(data.value)
            console.log(data.value)
            return venue.name === data.value
        })
        if (selectedVenueArray !== undefined) setVenueId(selectedVenueArray._id.toString());
    };

    const handleArtistSelection = (event, data) => {

        console.log(artistsList)
        const selectedArtistArray = artistsList.find((artist) => {
            setArtistName(data.value)
            return artist.name === data.value
        })
        if (selectedArtistArray !== undefined) setArtistId(selectedArtistArray._id.toString());
    };

    const handleArtistSelections = (event, data) => {

        let artistArray = [];
        let artistsIDsArray = []
        let artistsNamesArray = []

        artistsList.forEach((artist) => {
            data.value.forEach((value) => {
                if (artist.name === value) {
                    artistArray.push(artist)
                    artistsIDsArray.push(artist._id)
                    artistsNamesArray.push(artist.name)
                    //artistsNames.push(artist.name)
                    //artistsNames === null ? setArtistsNames(artist.name) : setArtistsNames((artistsNames) => [...artistsNames, artist.name])
                    setArtistsNames(artistsNamesArray)
                }
            })
        })

        artistsNames !== null ? artistsNames.map(name => console.log(name)) : ""

        if (artistsIDsArray !== null) setArtistIds(artistsIDsArray)
        /* const selectedArtistArray = artistsList.find((artist) => {
            let artistArray = null;
            console.log(artistsList.includes(data.value))
            setArtistsName(data.value)
            return artistArray  
        })
        if (selectedArtistArray !== undefined) setArtistId(selectedArtistArray._id.toString()); */
    };

    return (
        <div>
            <div className="AddConcertPage">
                <div className="AddConcertContainer">
                    <br />
                    <h1>ADD CONCERT</h1>
                    <br />
                    <br />
                    <form onSubmit={handleSubmit}>
                        <br />
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
                                clearable
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
                                className="inputFieldDropdown"
                                placeholder="Venue"
                                fluid={false}
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
                        <button type="submit" className="button">Add Concert</button>
                    </form>
                </div>
                <div>
                    <div className="ConcertDetailsContainer">
                        <div className="ConcertDetailsImageDiv">
                            <img src={imageUrl ? imageUrl : defaultImageUrl} alt="" />
                        </div>
                        <div className="ConcertDetailsInfoDiv">
                            <h3 className="">TITLE</h3>
                            <p className="ConcertPageTitle">{title}</p>
                            <h3 className="">ARTIST</h3>
                            {artistsNames !== null? artistsNames.map(name =><p>{name}</p>): ""}
                            <h3 className="">DESCRIPTION</h3>
                            <p>{description}</p>
                            <h3 className="">VENUE NAME</h3>
                            <p className="">{venueName}</p>
                            <div className="">
                                {date === null
                                    ? <></>
                                    : (<>
                                        <h3 className="">DATE</h3>
                                        <p className="">{`${date.substring(0, 10)} at ${date.substring(11, 16)}`}</p>
                                    </>)}
                                <h3 className="">PRICE</h3>
                                {price <= 0
                                    ? (<p className="">FREE</p>)
                                    : (<p className="">{price ? `${price}€` : ""}</p>
                                    )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddConcertPage;

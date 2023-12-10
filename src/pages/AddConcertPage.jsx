import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import venueService from '../services/venue.service'
import concertService from '../services/concert.service'
import { AuthContext } from "../context/auth.context";
import { getVenuesNames, defaultImageUrl, setDefaultImageUrl } from "../helperFunctions/helperFunction"

function AddConcertPage() {

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState(`${defaultImageUrl}`);
    const [date, setDate] = useState(null)
    const [price, setPrice] = useState(0);
    const [venueId, setVenueId] = useState(null)
    const [venueName, setVenueName] = useState("")
    const [venuesList, setVenuesList] = useState(null)
    const [venuesNameList, setVenuesNameList] = useState(null)
    const [errorMessage, setErrorMessage] = useState(undefined)

    let currentDate = new Date().toISOString()
    currentDate = `${currentDate.substring(0, 10)} ${currentDate.substring(11, 16)}`

    const { user } = useContext(AuthContext)

    const navigate = useNavigate();

    const getAllVenues = () => {
        venueService.getAllVenues()
            .then((response) => {
                setVenuesNameList(getVenuesNames(response.data, false))
                setVenuesList(response.data)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getAllVenues()
        setDate(currentDate)
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            title: title,
            artist: artist,
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
            return venue.name === data.value
        })
        setVenueId(selectedVenueArray._id.toString());
    };

    return (
        <div>
            <div className="AddConcertPage">
                <div className="AddConcertContainer">

                    <form onSubmit={handleSubmit}>
                        <h1>ADD CONCERT</h1>
                        <label className="">
                            <p>Title</p>
                            <input
                                type="text"
                                name="title"
                                required={true}
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                        </label>
                        <label className="">
                            <p>Artist</p>
                            <input
                                type="text"
                                name="artist"
                                required={true}
                                value={artist}
                                onChange={(e) => {
                                    setArtist(e.target.value);
                                }}
                            />
                        </label>
                        <div className="">
                            {/* <label className="">
                                <p>Artist</p>
                                <Dropdown
                                    placeholder="Artist"
                                    fluid={false}
                                    multiple
                                    selection
                                    required={true}
                                    onChange={handleGenreSelection}
                                    options={genresList}
                                />
                            </label> */}

                        </div>
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
                        <label className="">
                            <p>Venue</p>
                            <Dropdown
                                placeholder="Venue"
                                fluid={false}
                                selection
                                onChange={handleVenueSelection}
                                options={venuesNameList}
                            />
                        </label>
                        <label className="">
                            <p>Date</p>
                            <input
                                type="datetime-local"
                                name="date"
                                required={true}
                                value={currentDate}

                                onChange={(e) => {
                                    setDate(e.target.value);
                                }}
                            />
                        </label>
                        <label className="">
                            <p>Price</p>
                            <input
                                type="number"
                                name="price"
                                required={true}
                                min={0}
                                step=".01"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
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
                        <button className="">Add Concert</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
                <div>
                    <div className="ConcertDetailsContainer">
                        <div className="ConcertDetailsImageDiv">
                            <img src={imageUrl} />
                        </div>
                        <div className="ConcertDetailsInfoDiv">
                            <h3 className="">TITLE</h3>
                            <p className="ConcertPageTitle">{title}</p>
                            <h3 className="">ARTIST</h3>
                            <p>{artist}</p>
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
                                    : (<p className="">{price}€</p>
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

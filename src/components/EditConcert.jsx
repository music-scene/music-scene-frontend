import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import venueService from '../services/venue.service'
import concertService from '../services/concert.service'
import { AuthContext } from "../context/auth.context";
import { getVenuesNames, setDefaultImageUrl } from "../helperFunctions/helperFunction"

function EditConcert(props) {

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [date, setDate] = useState("")
    const [price, setPrice] = useState(0);
    const [venueId, setVenueId] = useState(null)
    const [venuesList, setVenuesList] = useState(null)
    const [venuesNameList, setVenuesNameList] = useState(null)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const { concertId } = useParams()
    const { user } = useContext(AuthContext)

    const navigate = useNavigate();

    const populateFields = () => {
        setTitle(props.concert.title)
        setArtist(props.concert.artist)
        setDescription(props.concert.description)
        setImageUrl(props.concert.imageUrl)
        setDate(`${props.concert.date.substring(0, 10)} ${props.concert.date.substring(11, 16)}`)
        setPrice(props.concert.price)
        setVenueId(props.concert.venue._id)
    }

    // is it better to make another request or do as above with props?
    /* const getConcertById = () => {

        concertService.getConcertById(concertId)
            .then((response) => {
                setTitle(response.data.title)
                setArtist(response.data.artist)
                setDescription(response.data.description)
                setImageUrl(response.data.imageUrl)
                setDate(response.data.date)
                setPrice(response.data.price)
                setVenueId(response.data.venue._id)
            })
            .catch((error) => console.log(error))

    } */

    const getAllVenues = () => {

        venueService.getAllVenues()
            .then((response) => {
                setVenuesNameList(getVenuesNames(response.data))
                setVenuesList(response.data)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        //getConcertById()
        populateFields()
        getAllVenues()
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

    return (
        <div>
            <div className="">
                <div className="">
                    <h1>EDIT CONCERT</h1>
                    <form onSubmit={handleSubmit}>
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
                            <p>Date</p>
                            <input
                                type="datetime-local"
                                name="date"
                                required={true}
                                value={date}
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
                        <button className="">Submit changes</button>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
                {/* <div>
                    <GameDetailsContainer title={title} imageUrl={imageUrl} description={description} rating={rating} price={price} genre={genre} platform={platform} />
                </div> */}
            </div>
        </div>
    );
}

export default EditConcert
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import venueService from '../services/venue.service'
import concertService from '../services/concert.service'
import artistService from '../services/artist.service'
import { AuthContext } from "../context/auth.context";
import { getNamesForLists, setDefaultImageUrl } from "../helperFunctions/helperFunction"

function EditConcert(props) {

    const [title, setTitle] = useState("");
    const [artistId, setArtistId] = useState(null);
    const [artistsList, setArtistsList] = useState(null)
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

    const navigate = useNavigate();

    const populateFields = () => {
        setTitle(props.concert.title)
        setArtistId(props.concert.artist._id)
        setDescription(props.concert.description)
        setImageUrl(props.concert.imageUrl)
        setDate()
        setPrice(props.concert.price)
        setVenueId(props.concert.venue._id)
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
            artist: artistId,
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

    const handleArtistSelection = (event, data) => {

        const selectedArtistArray = artistsList.find((artist) => {
            return artist.name === data.value
        })
        setArtistId(selectedArtistArray._id.toString());
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
                            <Dropdown
                                placeholder="Artist"
                                fluid={false}
                                selection
                                onChange={handleArtistSelection}
                                options={artistsNameList}
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
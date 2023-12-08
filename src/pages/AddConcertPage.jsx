import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import venueService from '../services/venue.service'
import concertService from '../services/concert.service'
import { AuthContext } from "../context/auth.context";

function AddConcertPage() {

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [date, setDate] = useState()
    const [price, setPrice] = useState(0);
    const [venueId, setVenueId] = useState(null)
    const [venuesList, setVenuesList] = useState(null)
    const [venuesNameList, setVenuesNameList] = useState(null)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const { user } = useContext(AuthContext)

    const navigate = useNavigate();

    const defaultImageUrl = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"

    const getAllVenues = () => {
        venueService.getAllVenues()
            .then((response) => {
                setVenuesNameList(getVenuesNames(response.data))
                setVenuesList(response.data)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getAllVenues()
    }, []);

    // function that returns an array of venues name alphabetically sorted for the dropdown menu
    function getVenuesNames(data) {

        const allVenues = data.map((elm) => elm.name);
        const temp = looper(allVenues);

        if (data.length === 1) return temp;

        const venues = sortObject(temp);

        return venues;
    }

    // function to sort venues alphabetically
    function sortObject(data) {
        return data.sort((a, b) => {
            return a.value.localeCompare(b.value);
        });
    }

    // function to create an array of venues names 
    function looper(type) {
        const newArray = [];

        if (type.length === 1) {
            newArray.push({
                key: type[0],
                text: type[0],
                value: type[0]
            })
            return newArray
        }

        for (let i = 0; i < type.length; i++) {
            const exists = newArray.some((elm) => elm.key === type[i]);
            if (!exists) {
                newArray.push({
                    key: type[i],
                    text: type[i],
                    value: type[i],
                });
            }
        }
        return newArray;
    }

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
            return venue.name === data.value
        })
        setVenueId(selectedVenueArray._id.toString());
    };

    function setDefaultImageUrl(imageUrl) {
        if (imageUrl.length === 0) return defaultImageUrl

        return imageUrl
    }

    return (
        <div>
            <div className="">
                <div className="">
                    <h1>ADD CONCERT</h1>
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
                                type="date"
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
                        <button className="">Add Concert</button>
                    </form>
                    { errorMessage && <p className="error-message">{errorMessage}</p> }
                </div>
                {/* <div>
                    <GameDetailsContainer title={title} imageUrl={imageUrl} description={description} rating={rating} price={price} genre={genre} platform={platform} />
                </div> */}
            </div>
        </div>
    );
}

export default AddConcertPage;

import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import ArtistDetailsContainer from "../components/ArtistDetailsContainer"
import artistService from '../services/artist.service'
import EditArtist from '../components/EditArtist'

function ArtistDetailsPage() {

    const [artistDetails, setArtistDetails] = useState(null);
    const [showEditContainer, setshowEditContainer] = useState(false)
    const { artistId } = useParams();

    const { user, isLoggedIn } = useContext(AuthContext)

    const navigate = useNavigate();

    const showHideEditContainer = () => setshowEditContainer(!showEditContainer)

    const getArtistById = () => {

        artistService.getArtistById(artistId)
            .then((response) => {
                setArtistDetails(response.data)
            })
            .catch((error) => console.log(error));
    };

    const deleteArtist = () => {

        artistService.deleteArtist(artistId)
            .then((response) => {
                navigate('/artists')
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getArtistById();
    }, []);

    return (
        <div className="">
            <div className="ConcertDetailsContainer">
                <div className="ConcertDetailsImageContainer">
                    {artistDetails === null
                        ? <h1>Loading artist details...</h1>
                        : <ArtistDetailsContainer artist={artistDetails} />}
                </div>
            </div>

            {isLoggedIn && artistDetails !== null && artistDetails.author !== null && user._id === artistDetails.author._id
                ? <div className="EditDeleteContainer">
                    <button onClick={showHideEditContainer} className="button">Edit</button>
                    <div className={`EditContainer ${showEditContainer ? "show" : "hide"}`}>
                        {<EditArtist artist={artistDetails} />}
                    </div>
                    <button onClick={deleteArtist} className="button">Delete</button>
                </div>
                : null}
        </div>
    )
}

export default ArtistDetailsPage
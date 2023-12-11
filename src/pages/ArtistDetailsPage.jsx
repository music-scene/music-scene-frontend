import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
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
                console.log(response.data)
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
            <div className="">
                {artistDetails === null
                    ? (<h1>Loading artist details...</h1>)
                    : (
                        <div>
                            <div className="ConcertImageDiv" key={artistDetails._id}>
                                <img src={artistDetails.imageUrl} />
                            </div>
                            <h2>{artistDetails.name}</h2>
                            <h2>{artistDetails.description}</h2>
                        </div>
                    )}
            </div>

            {isLoggedIn && artistDetails !== null && artistDetails.author !== null && user._id === artistDetails.author._id
                ? <>
                    <button onClick={showHideEditContainer}>EDIT</button>
                    <div className={`EditContainer ${showEditContainer ? "show" : "hide"}`}>
                        {<EditArtist artist={artistDetails}/>}
                    </div>
                    <button onClick={deleteArtist}>DELETE</button>
                </>

                : null}
        </div>
    )
}

export default ArtistDetailsPage
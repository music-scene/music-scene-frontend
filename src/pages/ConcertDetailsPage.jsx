import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import concertService from '../services/concert.service'
import ConcertDetailsContainer from "../components/ConcertDetailsContainer"
import EditConcert from "../components/EditConcert"
import "./DetailsPages.css";

function ConcertDetailsPage() {

  const [concertDetails, setConcertDetails] = useState(null);
  const [showEditContainer, setshowEditContainer] = useState(false)
  const { concertId } = useParams();

  const { user, isLoggedIn } = useContext(AuthContext)

  const navigate = useNavigate();

  const showHideEditContainer = () => setshowEditContainer(!showEditContainer)

  const getConcertById = () => {

    concertService.getConcertById(concertId)
      .then((response) => {
        setConcertDetails(response.data)
      })
      .catch((error) => console.log(error));
  };

  const deleteConcert = () => {

    concertService.deleteConcert(concertId)
      .then((response) => {
        navigate('/concerts')
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getConcertById();
  }, []);

  return (
    <div className="">
      <div className="ConcertDetailsContainer">
        <div className="ConcertDetailsImageContainer">
          {concertDetails === null
            ? <h1>Loading concert details...</h1>
            : <ConcertDetailsContainer concert={concertDetails} />
          }
        </div>
      </div>
      {isLoggedIn && concertDetails !== null && concertDetails.author !== null && user._id === concertDetails.author._id ? (
        <div className="EditDeleteContainer">
          <button onClick={showHideEditContainer} className="button">Edit</button>
          <div className={`EditContainer ${showEditContainer ? "show" : "hide"}`}>
            {<EditConcert concert={concertDetails} />}
          </div>
          <button onClick={deleteConcert} className="button">Delete</button>
        </div>
      ) : null}
    </div>
  );
}

export default ConcertDetailsPage
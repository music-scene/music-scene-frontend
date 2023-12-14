/* import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";*/
import { useState } from "react";

function ConcertDetailsContainer(props) {
  const [showVenueDetails, setShowVenueDetails] = useState(false);

  const showHideVenueDetails = () => setShowVenueDetails(!showVenueDetails);

  return (
    <div>
      <div>
        <h1 className="ConcertPageTitle">{props.concert.title}</h1>
        <div className="ConcertPageContainer">
          <div className="ConcertDetailsContainer">
            <div className="ConcertDetailsImageDiv">
              <img src={props.concert.imageUrl} alt={props.concert.title} />
            </div>
            <div className="ConcertDetailsInfoDiv">
              <div className="InfoRow">
                <h3 className="">Artist:</h3>
                {props.concert.artist === null || props.concert.artist.length === 0 ? (
                  <p>No artists selected</p>
                ) : (
                  props.concert.artist.map((artist, index) => <p key={index}>{artist.name}</p>)
                )}
              </div>
              <div className="InfoRow">
                <h3 className="">Description:</h3>
                <p>{props.concert.description}</p>
              </div>
              <div className="InfoRow">
                <h3 className="">Date:</h3>
                <p className="">{`${props.concert.date.substring(0, 10)} at ${props.concert.date.substring(11, 16)}`}</p>
              </div>
              <div className="InfoRow">
                <h3 className="">Price</h3>
                {props.concert.price <= 0 ? (
                  <p className="">FREE</p>
                ) : (
                  <p className="">{props.concert.price}€</p>
                )}
              </div>
            </div>
          </div>
          <div className="VenueDetailsButtonDiv">
            <button className="VenueDetailsButton" onClick={showHideVenueDetails}>
              Display Venue Details
            </button>
          </div>
          <div className={`VenueDetailsContainer ${showVenueDetails ? "show" : "hide"}`}>
            <div className="VenueDetailsImageDiv">
              <img src={props.concert.venue.imageUrl} alt={props.concert.venue.name} />
            </div>
            <div>
              <h3 className="">NAME</h3>
              <p className="">{props.concert.venue.name}</p>
              <h3 className="">DESCRIPTION</h3>
              <p className="">{props.concert.venue.description}</p>
              <h3 className="">LOCATION</h3>
              <p className="">{props.concert.venue.location}</p>
              <h3 className="">CAPACITY</h3>
              <p className="">{props.concert.venue.capacity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConcertDetailsContainer;



/* const [slide, setSlide] = useState(0);

 const nextSlide = () => {
   setSlide(slide === props.game.images.length - 1 ? 0 : slide + 1);
 };

 const prevSlide = () => {
   setSlide(slide === 0 ? props.game.images.length - 1 : slide - 1);
 };

 function fixedUrl(url) {
   if (url.length === 0) return "";
   const fixedUrl = url.replace("watch?v=", "embed/");

   return fixedUrl;
 } */
/*   console.log(props.concert.venue.name) */
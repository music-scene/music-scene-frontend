import { Link } from "react-router-dom";

function ConcertDetailsContainer(props) {

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
                {props.concert.artist === null || props.concert.artist.length === 0
                  ? ""
                  : <p className="ArtistsP"><span className="DetailsSpans">Artist: </span>
                    {props.concert.artist.map((artist, index) => props.concert.artist.length === 1
                      ? <Link to={`/artists/${artist._id}`}>{artist.name}</Link>
                      : <Link to={`/artists/${artist._id}`}><>{index === 0 ? '' : ", "}{artist.name}</></Link>)} </p>}
              </div>
              <div className="InfoRow">
                <p><span className="DetailsSpans">Date: </span>{`${props.concert.date.substring(0, 10)} at ${props.concert.date.substring(11, 16)}`}</p>
              </div>
              <div className="InfoRow">
                <p><span className="DetailsSpans">Venue: </span><Link to={`/venues/${props.concert.venue._id}`}>{props.concert.venue.name}</Link></p>
              </div>
              <div className="InfoRow">
                <p><span className="DetailsSpans">Price: </span>{props.concert.price <= 0 ? <>Free</> : <>{props.concert.price}€</>}</p>
              </div>
              <div className="InfoRow">
                <p><span className="DetailsSpans">Description: </span>{props.concert.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConcertDetailsContainer;
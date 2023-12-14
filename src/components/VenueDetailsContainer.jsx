function VenueDetailsContainer(props) {


    return (
        <div>
            <div>
                <h1 className="ConcertPageTitle">{props.venue.name}</h1>
                <div className="ConcertPageContainer">
                    <div className="ConcertDetailsContainer">
                        <div className="ConcertDetailsImageDiv">
                            <img src={props.venue.imageUrl} alt={props.venue.name} />
                        </div>
                        <div className="ConcertDetailsInfoDiv">
                            <div className="InfoRow">
                                <p><span className="DetailsSpans">Location: </span>{props.venue.location}</p>
                            </div>
                            <div className="InfoRow">
                                <p><span className="DetailsSpans">Capacity: </span>{props.venue.capacity}</p>
                            </div>
                            <div className="InfoRow">
                                <p><span className="DetailsSpans">Description: </span>{props.venue.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VenueDetailsContainer;

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
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
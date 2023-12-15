function ArtistDetailsContainer(props) {

    return (
        <div>
            <div>
                <h1 className="ConcertPageTitle">{props.artist.name}</h1>
                <div className="ConcertPageContainer">
                    <div className="ConcertDetailsContainer">
                        <div className="ConcertDetailsImageDiv">
                            <img src={props.artist.imageUrl} alt={props.artist.name} />
                        </div>
                        <div className="ConcertDetailsInfoDiv">
                            <div className="InfoRow">
                                {props.artist.genre === null || props.artist.genre.length === 0
                                    ? ""
                                    : <p className="ArtistsP"><span className="DetailsSpans">Genres: </span>
                                        {props.artist.genre.map((genre, index) => props.artist.genre.length === 1
                                            ? <>{genre.name}</>
                                            : <>{index === 0 ? '' : ", "}{genre.name}</>)} </p>}
                            </div>
                            <div className="InfoRow">
                                <p><span className="DetailsSpans">Description: </span>{props.artist.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtistDetailsContainer;
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import concertService from '../services/concert.service'
import ConcertDetailsContainer from "../components/ConcertDetailsContainer"

function ConcertDetailsPage() {

    const [concertDetails, setConcertDetails] = useState(null);
    const { concertId } = useParams();

    const getConcertById = () => {

        concertService.getConcertById(concertId)
            .then((response) => {
                setConcertDetails(response.data)
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getConcertById();
    }, []);

    return (
        <div className="">
            <div className="">
                {concertDetails === null
                    ? (<h1>Loading concert details...</h1>)
                    : (<ConcertDetailsContainer concert={concertDetails} />
                    )}
            </div>
        </div>
    )
}

export default ConcertDetailsPage
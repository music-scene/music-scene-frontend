import axios from "axios";

class ConcertService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
        });

        // Automatically set JWT token in the headers for every request
        this.api.interceptors.request.use((config) => {
            // Retrieve the JWT token from the local storage
            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config;
        });
    }

    getAllConcerts = () => {
        return this.api.get("/api/concerts");
    };

    addConcert = (concertData) => {
        return this.api.post("/api/concerts", concertData);
    };

    getConcertById = (concertId) => {
        return this.api.get(`/api/concerts/${concertId}`);
    };

    editConcert = (concertId, updatedConcertData) => {
        return this.api.put(`/api/concerts/${concertId}`, updatedConcertData);
    };

    deleteConcert = (concertId) => {
        return this.api.delete(`/api/concerts/${concertId}`);
    };
}

const concertService = new ConcertService();

export default concertService;

import axios from "axios";

class ArtistService {
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

    getAllArtists = () => {
        return this.api.get("/api/artists");
    };

    addArtist = (artistData) => {
        return this.api.post("/api/artists", artistData);
    };

    getArtistById = (artistId) => {
        return this.api.get(`/api/artists/${artistId}`);
    };

    editArtist = (artistId, requestBody) => {
        return this.api.put(`/api/artists/${artistId}`, requestBody);
    };

    deleteArtist = (artistId) => {
        return this.api.delete(`/api/artists/${artistId}`);
    };
}

const artistService = new ArtistService();

export default artistService;

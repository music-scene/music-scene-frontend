import axios from "axios";

class GenreService {
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

    getAllGenres = () => {
        return this.api.get('/api/genres')
    }

    addGenre = (requestBody) => {
        return this.api.post('/api/genres', requestBody);
    };

    getGenreById = (genreId) => {
        return this.api.get(`/api/genres/${genreId}`);
    };
}

const genreService = new GenreService();

export default genreService;

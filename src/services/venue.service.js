import axios from "axios";

class VenueService {
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

    getAllVenues = () => {
        return this.api.get("/api/venues");
    };

    addVenue = (venueData) => {
        return this.api.post("/api/venues", venueData);
    };

    getVenueById = (venueId) => {
        return this.api.get(`/api/venues/${venueId}`);
    };

    editVenue = (venueId, updatedVenueData) => {
        return this.api.put(`/api/venues/${venueId}`, updatedVenueData);
    };

    deleteVenue = (venueId) => {
        return this.api.delete(`/api/venues/${venueId}`);
    };
}

const venueService = new VenueService();

export default venueService;

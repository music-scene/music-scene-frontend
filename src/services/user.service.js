import axios from "axios";

class UserService {
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

    getUserById = (userId) => {
        return this.api.get(`/api/users/${userId}`);
    };

    editUser = (userId, requestBody) => {
        return this.api.put(`/api/users/${userId}`, requestBody);
    };

    deleteUser = (userId) => {
        return this.api.delete(`/api/users/${userId}`);
    };
}

const userService = new UserService();

export default userService;

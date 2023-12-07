import axios from "axios";

class VenueService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || 'http://localhost:5005'
    });
  }

  allVenues = () => {
    return this.api.get('/api/venues');
  }

  addVenue = (venueData) => {
    return this.api.post('/api/venues', venueData);
  }

  venueById = (venueId) => {
    return this.api.get(`/api/venues/${venueId}`);
  }

  editVenue = (venueId, updatedVenueData) => {
    return this.api.put(`/api/venues/${venueId}`, updatedVenueData);
  }

  deleteVenue = (venueId) => {
    return this.api.delete(`/api/venues/${venueId}`);
  }

}

const venueService = new VenueService();

export default venueService;

import axios from "axios";

class VenueService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || 'http://localhost:5005'
    });
  }

  venues = () => {
    return this.api.get('/venues');
  }

  venuesByName = () => {
    return this.api.get('/venues/by-name');
  }

  venuesByLocation = (location) => {
    return this.api.get(`/venues/by-location/${location}`);
  }

  venuesByCapacityRange = (minCapacity, maxCapacity) => {
    return this.api.get(`/venues/by-capacity/${minCapacity}/${maxCapacity}`);
  }


}

const venueService = new VenueService();

export default venueService;

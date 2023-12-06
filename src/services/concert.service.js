import axios from "axios";

class ConcertService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || 'http://localhost:5005'
    });
  }

  upcomingConcerts = () => {
    return this.api.get('/concerts/upcoming');
  }

  concertsByVenue = (venueId) => {
    return this.api.get(`/concerts/by-venue/${venueId}`);
  }

  concertsByPriceRange = (minPrice, maxPrice) => {
    return this.api.get(`/concerts/by-price/${minPrice}/${maxPrice}`);
  }

}

const concertService = new ConcertService();

export default concertService;

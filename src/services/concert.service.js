import axios from "axios";

class ConcertService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || 'http://localhost:5005'
    });
  }

  allConcerts = () => {
    return this.api.get('/api/concerts');
  }

  addConcert = (concertData) => {
    return this.api.post('/api/concerts', concertData);
  }

  concertById = (concertId) => {
    return this.api.get(`/api/concerts/${concertId}`);
  }

  editConcert = (concertId, updatedConcertData) => {
    return this.api.put(`/api/concerts/${concertId}`, updatedConcertData);
  }

  deleteConcert = (concertId) => {
    return this.api.delete(`/api/concerts/${concertId}`);
  }

}

const concertService = new ConcertService();

export default concertService;

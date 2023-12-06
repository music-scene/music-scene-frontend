import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import ConcertListPage from "./pages/ConcertListPage"
import ConcertDetailsPage from "./pages/ConcertDetailsPage"
import EditConcertPage from "./pages/EditConcertPage"
import AddConcertPage from "./pages/AddConcertPage"
import VenueListPage from "./pages/VenueListPage"
import VenuetDetailsPage from "./pages/VenueDetailsPage"
import EditVenuePage from "./pages/EditVenuePage"
import AddVenuePage from "./pages/AddVenuePage"
import IsAnon from "./components/IsAnon"
import IsPrivate from "./components/IsPrivate"
import './App.css'

function App() {

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/"
          element={<HomePage />}
        />
        <Route exact path="/concerts"
          element={<IsAnon> <ConcertListPage /> </IsAnon>}
        />
        <Route exact path="/concerts/:concertId"
          element={<IsAnon> <ConcertDetailsPage /> </IsAnon>}
        />
        <Route exact path="/concerts/edit/:concertId"
          element={<IsPrivate> <EditConcertPage /> </IsPrivate>}
        />
        <Route exact path="/concerts/add"
          element={<IsPrivate> <AddConcertPage /> </IsPrivate>}
        />
        <Route exact path="/venues"
          element={<IsAnon> <VenueListPage /> </IsAnon>}
        />
        <Route exact path="/venues/:venueId"
          element={<IsAnon> <VenuetDetailsPage /> </IsAnon>}
        />
        <Route exact path="/venues/edit/:venueId"
          element={<IsPrivate> <EditVenuePage /> </IsPrivate>}
        />
        <Route exact path="/venues/add"
          element={<IsPrivate> <AddVenuePage /> </IsPrivate>}
        />
        <Route path="/signup"
          element={<IsAnon> <SignupPage /> </IsAnon>}
        />
        <Route path="/login"
          element={<IsAnon> <LoginPage /> </IsAnon>}
        />
      </Routes>
    </div>
  )
}

export default App

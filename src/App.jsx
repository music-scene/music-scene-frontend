import { Routes, Route } from "react-router-dom";
import NavbarMVP from "./components/Navbar"
import HomePage from "./pages/HomePage"
import ConcertListPage from "./pages/ConcertListPage"
import ConcertDetailsPage from "./pages/ConcertDetailsPage"
import AddConcertPage from "./pages/AddConcertPage"
import VenueListPage from "./pages/VenueListPage"
import VenuetDetailsPage from "./pages/VenueDetailsPage"
import AddVenuePage from "./pages/AddVenuePage"
import ArtistListPage from "./pages/ArtistListPage"
import ArtistDetailsPage from "./pages/ArtistDetailsPage"
import AddArtistPage from "./pages/AddArtistPage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import IsAnon from "./components/IsAnon"
import IsPrivate from "./components/IsPrivate"

import "semantic-ui-css/semantic.min.css";
import './App.css'

function App() {

  return (
    <div className="App">
      <NavbarMVP />

      <Routes>
        <Route path="/"
          element={<HomePage />}
        />
        <Route exact path="/concerts"
          element={<ConcertListPage />}
        />
        <Route exact path="/concerts/:concertId"
          element={<ConcertDetailsPage />}
        />
        <Route exact path="/concerts/add"
          element={<IsPrivate> <AddConcertPage /> </IsPrivate>}
        />
        <Route exact path="/venues"
          element={<VenueListPage />}
        />
        <Route exact path="/venues/:venueId"
          element={<VenuetDetailsPage />}
        />
        <Route exact path="/venues/add"
          element={<IsPrivate> <AddVenuePage /> </IsPrivate>}
        />
        <Route exact path="/artists"
          element={ <ArtistListPage /> }
        />
        <Route exact path="/artists/:artistId"
          element={ <ArtistDetailsPage /> }
        />
        <Route exact path="/artists/add"
          element={ <AddArtistPage /> }
        />
        <Route path="/users/:userId"
          element={<IsPrivate> <ProfilePage /> </IsPrivate>}
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
import '../App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Navbar from './Navbar'
import MoviesPage from './MoviesPage'
import HomePage from './HomePage'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Locations from './pages/Locations';
import Schedule from './pages/Schedule';
import { FaHome, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Toaster position="top-right" toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
        }} />
        
        {/* Navigation */}
        <nav className="nav-bar">
          <div className="nav-container">
            <div className="nav-content">
              <Link to="/" className="nav-logo">
                <span className="nav-logo-icon">🏖️</span>
                <h1 className="nav-logo-text">Kampot Trip</h1>
              </Link>
              
              <div className="nav-links">
                <Link to="/" className="nav-link">
                  <FaHome className="nav-link-icon" />
                  <span className="nav-link-text">Home</span>
                </Link>
                <Link to="/locations" className="nav-link locations">
                  <FaMapMarkerAlt className="nav-link-icon blue" />
                  <span className="nav-link-text">Locations</span>
                </Link>
                <Link to="/schedule" className="nav-link schedule">
                  <FaCalendarAlt className="nav-link-icon green" />
                  <span className="nav-link-text">Schedule</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

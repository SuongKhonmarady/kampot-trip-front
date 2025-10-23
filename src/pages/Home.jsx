import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaMapPin } from 'react-icons/fa';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section - Simple and Clean */}
      <div className="hero-section">
        <div className="hero-icon">
          <span>🏖️</span>
        </div>
        <h1 className="hero-title">
          Kampot Trip Planner
        </h1>
        <p className="hero-description">
          Explore beautiful locations and plan your 3-day adventure in Kampot, Cambodia
        </p>
      </div>

      {/* Main Action Cards - Simple Grid */}
      <div className="action-cards">
        {/* Locations Card */}
        <Link to="/locations" className="action-card locations">
          <div className="action-card-content">
            <div className="action-card-icon blue">
              <FaMapMarkerAlt />
            </div>
            <h2 className="action-card-title">Locations</h2>
            <p className="action-card-description">Browse and manage amazing places to visit</p>
          </div>
        </Link>

        {/* Schedule Card */}
        <Link to="/schedule" className="action-card schedule">
          <div className="action-card-content">
            <div className="action-card-icon green">
              <FaCalendarAlt />
            </div>
            <h2 className="action-card-title">Schedule</h2>
            <p className="action-card-description">Plan your 3-day trip itinerary</p>
          </div>
        </Link>
      </div>

      {/* Features - Simple List */}
      <div className="features-section">
        <h3 className="features-title">Features</h3>
        <div className="features-list">
          <div className="feature-item">
            <div className="feature-icon">📍</div>
            <div>
              <h4 className="feature-title">Add & Manage Locations</h4>
              <p className="feature-description">Save your favorite places with Google Maps links</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✏️</div>
            <div>
              <h4 className="feature-title">Edit Anytime</h4>
              <p className="feature-description">Update or remove locations and schedules easily</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🗓️</div>
            <div>
              <h4 className="feature-title">3-Day Planning</h4>
              <p className="feature-description">Organize your trip day by day with times and notes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Home Base - Simple Card */}
      <div className="homestay-card">
        <div className="homestay-content">
          <div className="homestay-info">
            <div className="homestay-header">
              <span className="homestay-icon">🏠</span>
              <h3 className="homestay-title">DLK Private Homestay</h3>
            </div>
            <p className="homestay-subtitle">Your home base in Kampot Province</p>
          </div>
          <a
            href="https://maps.app.goo.gl/eWy91DAhBY2JkBfV9"
            target="_blank"
            rel="noopener noreferrer"
            className="homestay-link"
          >
            <FaMapPin />
            <span>View Location</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;

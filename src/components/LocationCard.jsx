import { FaMapMarkerAlt, FaEdit, FaTrash, FaThumbtack } from 'react-icons/fa';
import './LocationCard.css';

function LocationCard({ location, onEdit, onDelete, onTogglePin }) {
  return (
    <div className={`location-card ${location.is_pinned ? 'pinned' : ''}`}>
      <div className="location-card-header">
        <div className="location-card-info">
          <span className="location-card-icon">{location.icon}</span>
          <div>
            <h3 className="location-card-name">{location.name}</h3>
            {location.name_khmer && (
              <p className="location-card-name-khmer">{location.name_khmer}</p>
            )}
          </div>
        </div>
        
        {location.is_pinned && (
          <div className="location-pinned-badge">
            <FaThumbtack />
            <span>Pinned</span>
          </div>
        )}
      </div>

      <p className="location-card-description">{location.description}</p>

      {location.distance_from_homestay && (
        <div className="location-card-distance">
          <span>📏 {location.distance_from_homestay} km from homestay</span>
        </div>
      )}

      <div className="location-card-footer">
        <a
          href={location.google_map_link}
          target="_blank"
          rel="noopener noreferrer"
          className="location-card-map-link"
        >
          <FaMapMarkerAlt />
          <span>View Map</span>
        </a>

        <div className="location-card-actions">
          <button
            onClick={() => onTogglePin(location)}
            className={`location-card-btn pin ${location.is_pinned ? 'pinned' : ''}`}
            title={location.is_pinned ? 'Unpin' : 'Pin'}
          >
            <FaThumbtack />
          </button>
          <button
            onClick={() => onEdit(location)}
            className="location-card-btn edit"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(location)}
            className="location-card-btn delete"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocationCard;

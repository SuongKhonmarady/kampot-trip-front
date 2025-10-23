import { FaEdit, FaTrash, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import './ScheduleDayCard.css';

function ScheduleDayCard({ schedule, onEdit, onDelete }) {
  return (
    <div className="schedule-day-card">
      <div className="schedule-day-content">
        <div className="schedule-day-info">
          <span className="schedule-day-icon">{schedule.location?.icon || '📍'}</span>
          <div className="schedule-day-details">
            <h4 className="schedule-day-name">
              {schedule.location?.name || 'Unknown Location'}
            </h4>
            {schedule.location?.name_khmer && (
              <p className="schedule-day-name-khmer">
                {schedule.location.name_khmer}
              </p>
            )}
            {schedule.time && (
              <div className="schedule-day-time">
                <FaClock />
                <span>{schedule.time}</span>
              </div>
            )}
            {schedule.notes && (
              <p className="schedule-day-notes">{schedule.notes}</p>
            )}
            {schedule.location?.distance_from_homestay && (
              <p className="schedule-day-distance">
                📏 {schedule.location.distance_from_homestay} km away
              </p>
            )}
          </div>
        </div>
        
        <div className="schedule-day-actions">
          <a
            href={schedule.location?.google_map_link}
            target="_blank"
            rel="noopener noreferrer"
            className="schedule-day-btn map"
            title="View map"
          >
            <FaMapMarkerAlt />
          </a>
          <button
            onClick={() => onEdit(schedule)}
            className="schedule-day-btn edit"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(schedule)}
            className="schedule-day-btn delete"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleDayCard;

import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import './ScheduleForm.css';

function ScheduleForm({ schedule, locations, selectedDay, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    day: selectedDay || 1,
    location_id: '',
    time: '',
    notes: '',
    order: 999,
  });

  useEffect(() => {
    if (schedule) {
      setFormData({
        day: schedule.day,
        location_id: schedule.location_id,
        time: schedule.time || '',
        notes: schedule.notes || '',
        order: schedule.order || 999,
      });
    } else if (selectedDay) {
      setFormData((prev) => ({ ...prev, day: selectedDay }));
    }
  }, [schedule, selectedDay]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="schedule-form-overlay">
      <div className="schedule-form-container">
        <div className="schedule-form-header">
          <h2 className="schedule-form-title">
            {schedule ? 'Edit Schedule' : 'Add to Schedule'}
          </h2>
          <button
            onClick={onClose}
            className="schedule-form-close-btn"
            type="button"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="schedule-form-content">
          <div className="schedule-form-field">
            <label className="schedule-form-label">
              Day *
            </label>
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              required
              className="schedule-form-select"
            >
              <option value={1}>Day 1</option>
              <option value={2}>Day 2</option>
              <option value={3}>Day 3</option>
            </select>
          </div>

          <div className="schedule-form-field">
            <label className="schedule-form-label">
              Location *
            </label>
            <select
              name="location_id"
              value={formData.location_id}
              onChange={handleChange}
              required
              className="schedule-form-select"
            >
              <option value="">Select a location...</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.icon} {location.name}
                </option>
              ))}
            </select>
          </div>

          <div className="schedule-form-field">
            <label className="schedule-form-label">
              Time (Optional)
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="schedule-form-input"
            />
          </div>

          <div className="schedule-form-field">
            <label className="schedule-form-label">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="schedule-form-textarea"
              placeholder="Add any notes or special instructions..."
            />
          </div>

          <div className="schedule-form-actions">
            <button
              type="button"
              onClick={onClose}
              className="schedule-form-cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="schedule-form-submit-btn"
            >
              {schedule ? 'Update Schedule' : 'Add to Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScheduleForm;

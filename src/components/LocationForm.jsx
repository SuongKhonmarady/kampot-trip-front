import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import './LocationForm.css';

function LocationForm({ location, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    name_khmer: '',
    description: '',
    google_map_link: '',
    icon: '📍',
    distance_from_homestay: '',
    order: 999,
  });

  useEffect(() => {
    if (location) {
      setFormData({
        name: location.name || '',
        name_khmer: location.name_khmer || '',
        description: location.description || '',
        google_map_link: location.google_map_link || '',
        icon: location.icon || '📍',
        distance_from_homestay: location.distance_from_homestay || '',
        order: location.order || 999,
      });
    }
  }, [location]);

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

  const commonIcons = ['📍', '☕', '🏖️', '💧', '⛰️', '🏨', '🌴', '🏘️', '🌿', '🍽️'];

  return (
    <div className="location-form-overlay">
      <div className="location-form-container">
        <div className="location-form-header">
          <h2 className="location-form-title">
            {location ? 'Edit Location' : 'Add New Location'}
          </h2>
          <button
            onClick={onClose}
            className="location-form-close-btn"
            type="button"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="location-form-content">
          <div className="location-form-field">
            <label className="location-form-label">
              Location Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="location-form-input"
              placeholder="e.g., Starbucks Cafe"
            />
          </div>

          <div className="location-form-field">
            <label className="location-form-label">
              Khmer Name (Optional)
            </label>
            <input
              type="text"
              name="name_khmer"
              value={formData.name_khmer}
              onChange={handleChange}
              className="location-form-input"
              placeholder="e.g., ស្តារបាក់កាហ្វេ"
            />
          </div>

          <div className="location-form-field">
            <label className="location-form-label">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="location-form-textarea"
              placeholder="Describe this location..."
            />
          </div>

          <div className="location-form-field">
            <label className="location-form-label">
              Google Maps Link *
            </label>
            <input
              type="url"
              name="google_map_link"
              value={formData.google_map_link}
              onChange={handleChange}
              required
              className="location-form-input"
              placeholder="https://maps.app.goo.gl/..."
            />
          </div>

          <div className="location-form-field-row">
            <div className="location-form-field">
              <label className="location-form-label">
                Icon
              </label>
              <div className="location-form-icon-section">
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="location-form-icon-input"
                  maxLength="2"
                />
              </div>
              <div className="location-form-icon-picker">
                {commonIcons.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, icon: emoji }))}
                    className="location-form-icon-btn"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="location-form-field">
              <label className="location-form-label">
                Distance from Homestay (km)
              </label>
              <input
                type="number"
                name="distance_from_homestay"
                value={formData.distance_from_homestay}
                onChange={handleChange}
                step="0.1"
                className="location-form-input"
                placeholder="e.g., 5.5"
              />
            </div>
          </div>

          <div className="location-form-actions">
            <button
              type="button"
              onClick={onClose}
              className="location-form-cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="location-form-submit-btn"
            >
              {location ? 'Update Location' : 'Add Location'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LocationForm;

import { useState, useEffect } from 'react';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { locationApi } from '../services/api';
import LocationCard from '../components/LocationCard';
import LocationForm from '../components/LocationForm';
import './Locations.css';

function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await locationApi.getAll();
      setLocations(response.data);
    } catch (error) {
      toast.error('Failed to load locations');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingLocation(null);
    setShowForm(true);
  };

  const handleEdit = (location) => {
    setEditingLocation(location);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingLocation) {
        await locationApi.update(editingLocation.id, formData);
        toast.success('Location updated successfully!');
      } else {
        await locationApi.create(formData);
        toast.success('Location added successfully!');
      }
      setShowForm(false);
      setEditingLocation(null);
      fetchLocations();
    } catch (error) {
      toast.error('Failed to save location');
      console.error(error);
    }
  };

  const handleDelete = async (location) => {
    if (!window.confirm(`Are you sure you want to delete "${location.name}"?`)) {
      return;
    }

    try {
      await locationApi.delete(location.id);
      toast.success('Location deleted successfully!');
      fetchLocations();
    } catch (error) {
      toast.error('Failed to delete location');
      console.error(error);
    }
  };

  const handleTogglePin = async (location) => {
    try {
      await locationApi.togglePin(location.id);
      toast.success(location.is_pinned ? 'Location unpinned' : 'Location pinned!');
      fetchLocations();
    } catch (error) {
      toast.error('Failed to toggle pin');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <FaSpinner />
      </div>
    );
  }

  return (
    <div className="locations-container">
      <div className="locations-header">
        <div className="locations-title-section">
          <h1>📍 Locations</h1>
          <p className="locations-count">
            {locations.length} places in Kampot Province
          </p>
        </div>
        <button onClick={handleAdd} className="add-location-btn">
          <FaPlus />
          <span>Add Location</span>
        </button>
      </div>

      <div className="locations-grid">
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onTogglePin={handleTogglePin}
          />
        ))}
      </div>

      {locations.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📍</div>
          <h3>No locations yet</h3>
          <p>Start adding amazing places to visit in Kampot!</p>
          <button onClick={handleAdd} className="empty-state-btn">
            <FaPlus />
            <span>Add Your First Location</span>
          </button>
        </div>
      )}

      {showForm && (
        <LocationForm
          location={editingLocation}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingLocation(null);
          }}
        />
      )}
    </div>
  );
}

export default Locations;

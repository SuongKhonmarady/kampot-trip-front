import { useState, useEffect } from 'react';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { scheduleApi, locationApi } from '../services/api';
import ScheduleDayCard from '../components/ScheduleDayCard';
import ScheduleForm from '../components/ScheduleForm';
import './Schedule.css';

function Schedule() {
  const [schedules, setSchedules] = useState({});
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [schedulesResponse, locationsResponse] = await Promise.all([
        scheduleApi.getAll(),
        locationApi.getAll(),
      ]);
      setSchedules(schedulesResponse.data);
      setLocations(locationsResponse.data);
    } catch (error) {
      toast.error('Failed to load data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (day) => {
    setEditingSchedule(null);
    setSelectedDay(day);
    setShowForm(true);
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setSelectedDay(schedule.day);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingSchedule) {
        await scheduleApi.update(editingSchedule.id, formData);
        toast.success('Schedule updated successfully!');
      } else {
        await scheduleApi.create(formData);
        toast.success('Added to schedule!');
      }
      setShowForm(false);
      setEditingSchedule(null);
      setSelectedDay(null);
      fetchData();
    } catch (error) {
      toast.error('Failed to save schedule');
      console.error(error);
    }
  };

  const handleDelete = async (schedule) => {
    if (!window.confirm('Are you sure you want to remove this from the schedule?')) {
      return;
    }

    try {
      await scheduleApi.delete(schedule.id);
      toast.success('Removed from schedule!');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete schedule');
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

  const days = [1, 2, 3];

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h1 className="schedule-title">🗓️ 3-Day Trip Schedule</h1>
        <p className="schedule-subtitle">Plan your perfect vacation itinerary</p>
      </div>

      <div className="schedule-days">
        {days.map((day) => {
          const daySchedules = schedules[day] || [];
          
          // Sort schedules by time (earliest to latest)
          const sortedSchedules = [...daySchedules].sort((a, b) => {
            // If no time, put at the end
            if (!a.time && !b.time) return 0;
            if (!a.time) return 1;
            if (!b.time) return -1;
            
            // Compare times
            return a.time.localeCompare(b.time);
          });

          return (
            <div key={day} className="day-card">
              <div className="day-card-header">
                <div className="day-title-section">
                  <h2 className="day-title-text">Day {day}</h2>
                  <p className="day-location-count">
                    {daySchedules.length} {daySchedules.length === 1 ? 'location' : 'locations'}
                  </p>
                </div>
                <button
                  onClick={() => handleAdd(day)}
                  className="add-schedule-btn"
                >
                  <FaPlus />
                  <span>Add Location</span>
                </button>
              </div>

              {sortedSchedules.length > 0 ? (
                <div className="schedule-items">
                  {sortedSchedules.map((schedule) => (
                    <ScheduleDayCard
                      key={schedule.id}
                      schedule={schedule}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <div className="schedule-empty-state">
                  <div className="schedule-empty-icon">📅</div>
                  <p className="schedule-empty-text">
                    No locations scheduled for Day {day}
                  </p>
                  <button
                    onClick={() => handleAdd(day)}
                    className="schedule-empty-btn"
                  >
                    <FaPlus />
                    <span>Add your first location</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showForm && (
        <ScheduleForm
          schedule={editingSchedule}
          locations={locations}
          selectedDay={selectedDay}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingSchedule(null);
            setSelectedDay(null);
          }}
        />
      )}
    </div>
  );
}

export default Schedule;

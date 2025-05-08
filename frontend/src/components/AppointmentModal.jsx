import React, { useState } from "react";
import axios from "axios";

const AppointmentModal = ({ show, handleClose, userId }) => {
  const [formData, setFormData] = useState({
    doctor: "",
    department: "",
    date: "",
    time: "",
    problem: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointment = {
      patient: userId,
      ...formData,
    };

    try {
      await axios.post(
        "https://your-backend.com/api/appointments/",
        appointment
      );
      alert("Appointment booked!");
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Error booking appointment");
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0 rounded">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Book Appointment</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Doctor ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  placeholder="Enter doctor ID"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Department ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter department ID"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  className="form-control"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Describe Your Problem</label>
                <textarea
                  className="form-control"
                  name="problem"
                  rows="3"
                  value={formData.problem}
                  onChange={handleChange}
                  placeholder="Briefly describe your issue"
                  required
                ></textarea>
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-success">
                Book Appointment
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;

import React, { useState } from "react";
import axios from "axios";

const NewDoctorModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    doctorId: "",
    experience: "",
    phone: "",
    specialization: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://your-backend.com/api/doctors/", formData);
      alert("Doctor added successfully!");
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add doctor.");
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0 rounded">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">Add New Doctor</h5>
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
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  placeholder="Enter doctor ID"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Experience</label>
                <input
                  type="number"
                  className="form-control"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Specialization</label>
                <input
                  type="text"
                  className="form-control"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="e.g. Cardiologist, Neurologist"
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-success">
                Save Doctor
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

export default NewDoctorModal;

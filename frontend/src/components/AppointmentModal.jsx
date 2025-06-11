import React, { useState } from "react";
import api from "../api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setappointments } from "../redux/actions/hospitalActions";

// AppointmentModal component for booking a doctor's appointment
const AppointmentModal = ({ show, handleClose, userId }) => {
  // Form state for storing user input
  const [formData, setFormData] = useState({
    doctor: "",
    department: "",
    date: "",
    time: "",
    problem: "",
  });

  const dispatch = useDispatch();

  // Fetch departments and store in Redux
  const departments = useSelector((state) => state.hospitalinfo.departments);
  const appointments = useSelector((state) => state.hospitalinfo.appointments);

  // Fetch doctors and store in Redux
  const doctors = useSelector((state) => state.hospitalinfo.doctors);
  console.log(doctors); // Debug: log doctor data to console

  // Function to fetch departments from API
  const fetchDepartments = async () => {
    const res = await api.get("api/departments");
    console.log("DEPARTMENTS", res.data); // Debug: log fetched departments
    dispatch({ type: "SET_DEPARTMENTS", payload: res.data }); // Dispatch to Redux
  };

  // useEffect to load departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Function to fetch all users and filter out doctors
  const fetchDoctors = async () => {
    const res = await api.get("api/users");
    const doctors = res.data.filter((user) => user.role === "doctor"); // Filter by role
    dispatch({
      type: "SET_DOCTORS",
      payload: doctors,
    });
  };

  // useEffect to load doctors on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handles change in form inputs
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const appointment = {
    //   formData,
    // };

    try {
      const res = await api.post("api/appointments/", formData);
      const newAppointment = res.data;
      dispatch(setappointments([...appointments, newAppointment]));
      alert("Appointment booked!"); // Notify user
      handleClose(); // Close modal
    } catch (err) {
      console.error(err); // Log error
      alert("Error booking appointment"); // Notify error
    }
  };

  // If modal is not supposed to show, return null
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

          {/* Appointment Form */}
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Doctor Selection */}
              <div className="mb-3">
                <label className="form-label">Doctor</label>
                <select
                  className="form-control"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      Dr {doctor.first_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department Selection */}
              <div className="mb-3">
                <label className="form-label">Department</label>
                <select
                  className="form-control"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Appointment Date */}
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

              {/* Appointment Time */}
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

              {/* Patient's Problem Description */}
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

            {/* Form Actions */}
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

import React, { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import api from "../../api";

function DoctorAppointments() {
  const { doctorappointments, setDoctorAppointments } = useContext(AdminContext);
  console.log("DoctorAppointments render, doctorappointments:", doctorappointments);


  return (
    <div className="p-4 bg-white rounded shadow-sm m-2">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">Appointments</h3>
        <button className="btn btn-primary">Add Appointment</button>
      </div>

      {/* Empty State */}
      {(!doctorappointments || doctorappointments.length === 0) && (
        <p className="text-muted">No appointments available.</p>
      )}

      {/* Table */}
      {doctorappointments && doctorappointments.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Problem</th>
                <th>Status</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctorappointments.flat().map((apt, index) => (
                <tr key={apt.id || index}>
                  <td>{index + 1}</td>
                  <td>{apt.patient.first_name}</td>
                  <td>{apt.date}</td>
                  <td>{apt.time}</td>
                  <td>{apt.problem}</td>
                  <td>{apt.status}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(apt)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(apt.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DoctorAppointments;

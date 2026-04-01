import React, { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import api from "../../api";

function Patients() {
  const { allUsers, setAllUsers } = useContext(AdminContext);
  console.log("Patients render, allUsers:", allUsers);
  const patientMembers = allUsers.filter((user) => user.role === "patient");
  console.log("FIL PATIENTS", patientMembers);

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`api/users/${id}/`);
      setAllUsers(patientMembers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // EDIT (placeholder)
  const handleEdit = (user) => {
    console.log("Edit user:", user);
    // later: open modal or navigate
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm m-2">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">Patients</h3>
        <button className="btn btn-primary">Add Patient</button>
      </div>

      {/* Empty State */}
      {(!patientMembers || patientMembers.length === 0) && (
        <p className="text-muted">No patients available.</p>
      )}

      {/* Table */}
      {patientMembers && patientMembers.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Patient Name</th>

                <th>Date Joined</th>
                <th>Email</th>

                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patientMembers.map((user, index) => (
                <tr key={user.id || index}>
                  <td>{index + 1}</td>
                  <td>{user.first_name}</td>

                  <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                  <td>{user.email}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user.id)}
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

export default Patients;

import React, { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import api from "../../api";

function Staffs() {
  const { allUsers, setAllUsers } = useContext(AdminContext);
  console.log("Staffs render, allUsers:", allUsers);
  const staffMembers = allUsers.filter((user) => user.role !== "patient");
  console.log("FIL STAFF", staffMembers)

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`api/users/${id}/`);
      setAllUsers(staffMembers.filter((user) => user.id !== id));
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
        <h3 className="fw-bold mb-0">Staffs</h3>
        <button className="btn btn-primary">Add Staff</button>
      </div>

      {/* Empty State */}
      {(!staffMembers || staffMembers.length === 0) && (
        <p className="text-muted">No staff members available.</p>
      )}

      {/* Table */}
      {staffMembers && staffMembers.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Dr Name</th>
                <th>Staff Number</th>
                <th>Date Joined</th>
                <th>Email</th>
                <th>Role</th>

                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffMembers.map((user, index) => (
                <tr key={user.id || index}>
                  <td>{index + 1}</td>
                  <td>Dr. {user.first_name}</td>
                  <td>{user.doctor_number}</td>
                  <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
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

export default Staffs;

import React, { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import api from "../../api";

function Departments() {
  const { departments, setDepartments } = useContext(AdminContext);

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`api/departments/${id}/`);
      setDepartments(departments.filter((dept) => dept.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // EDIT (placeholder)
  const handleEdit = (dept) => {
    console.log("Edit department:", dept);
    // later: open modal or navigate
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm m-2">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">Departments</h3>
        <button className="btn btn-primary">Add Department</button>
      </div>

      {/* Empty State */}
      {(!departments || departments.length === 0) && (
        <p className="text-muted">No departments available.</p>
      )}

      {/* Table */}
      {departments && departments.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, index) => (
                <tr key={dept.id || index}>
                  <td>{index + 1}</td>
                  <td>{dept.name}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(dept)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(dept.id)}
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

export default Departments;

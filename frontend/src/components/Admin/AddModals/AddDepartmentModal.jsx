import React, { useState, useContext } from "react";
import api from "../../../api";
import { toast } from "react-toastify";
import { AdminContext } from "../../../contexts/AdminContext";

const AddDepartmentModal = ({ show, handleClose }) => {
  const { departments, setDepartments } = useContext(AdminContext);

  const [formData, setFormData] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("api/departments/", formData);

      // Update global state
      setDepartments([...departments, res.data]);

      toast.success("Department added successfully");
      resetForm();
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add department");
    } finally {
      setLoading(false);
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
        <div className="modal-content border-0 shadow">
          {/* Header */}
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Add Department</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleClose}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Department Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Department"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentModal;

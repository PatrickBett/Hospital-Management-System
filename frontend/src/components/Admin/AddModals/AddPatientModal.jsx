import React, { useState, useContext } from "react";
import api from "../../../api";
import { toast } from "react-toastify";
import { AdminContext } from "../../../contexts/AdminContext";

const AddPatientModal = ({ show, handleClose }) => {
  const { medicine, setMedicine } = useContext(AdminContext);

  const [formData, setFormData] = useState({
    name: "",
    quantity_in_stock: "",
    price_per_unit: "",
    expiry_date: "",
    batch: "",
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
      quantity_in_stock: "",
      price_per_unit: "",
      expiry_date: "",
      batch: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("api/inventory/", formData);

      // Update global state
      setMedicine([...medicine, res.data]);

      toast.success("Patient added successfully");
      resetForm();
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add patient");
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
            <h5 className="modal-title">Add Patient</h5>
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
                <label className="form-label">Patient Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Batch */}
              <div className="mb-3">
                <label className="form-label">Batch Number</label>
                <input
                  type="text"
                  name="batch"
                  className="form-control"
                  value={formData.batch}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>

              {/* Stock */}
              <div className="mb-3">
                <label className="form-label">Quantity in Stock</label>
                <input
                  type="number"
                  name="quantity_in_stock"
                  className="form-control"
                  value={formData.quantity_in_stock}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              {/* Price */}
              <div className="mb-3">
                <label className="form-label">Price per Unit ($)</label>
                <input
                  type="number"
                  name="price_per_unit"
                  className="form-control"
                  value={formData.price_per_unit}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              {/* Expiry */}
              <div className="mb-3">
                <label className="form-label">Expiry Date</label>
                <input
                  type="date"
                  name="expiry_date"
                  className="form-control"
                  value={formData.expiry_date}
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
                {loading ? "Adding..." : "Add Patient"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPatientModal;

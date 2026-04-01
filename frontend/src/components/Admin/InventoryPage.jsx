import React, { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import api from "../../api";

function InventoryPage() {
  const { medicine, setMedicine } = useContext(AdminContext);

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`api/inventory/${id}/`);
      setMedicine(medicine.filter((med) => med.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // EDIT (placeholder)
  const handleEdit = (med) => {
    console.log("Edit medicine:", med);
    // later: open modal or navigate
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm m-2">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">Inventory</h3>
        <button className="btn btn-primary">Add Medicine</button>
      </div>

      {/* Empty State */}
      {(!medicine || medicine.length === 0) && (
        <p className="text-muted">No medicines available.</p>
      )}

      {/* Table */}
      {medicine && medicine.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price Per Unit</th>
                <th>Date Stocked</th>
                <th>Expiry Date</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicine.map((med, index) => (
                <tr key={med.id || index}>
                  <td>{index + 1}</td>
                  <td>{med.name}</td>
                  <td>{med.quantity_in_stock}</td>
                  <td>{med.price_per_unit}</td>
                  <td>{med.date_added}</td>
                  <td>{med.expiry_date}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(med)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(med.id)}
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

export default InventoryPage;

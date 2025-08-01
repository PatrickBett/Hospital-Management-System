import React, { useState } from "react";
import { Button } from "react-bootstrap";
import api from "../api";

function Mpesa() {
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!mpesaNumber) {
        alert("Phone Number can't be blank");
      }
      const res = await api.post("/api/stk-push/", { mpesaNumber });
      setIsLoading(false);

      console.log("Mpesa Number", mpesaNumber);
      console.log(res.data);

      // Clear the input field after success
      setMpesaNumber("");
    } catch (e) {
      console.log(e);

      // Optionally clear on error as well
      setMpesaNumber("");
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#mymodal"
      >
        Pay
      </Button>

      <div className="modal mt-5" id="mymodal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-success text-light">
              <h4 className="modal-title p-1 m-auto">MPESA</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form className="modal-body" onSubmit={handleSubmit}>
              <label className="me-5 m-1">Phone:</label>
              <input
                type="number"
                placeholder="Enter Mpesa Number"
                className="form-control no-outline mb-5"
                value={mpesaNumber}
                onChange={(e) => setMpesaNumber(e.target.value)}
              />
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  {isLoading ? (
                    <div className="spinner-border text-primary"></div>
                  ) : (
                    "Pay"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mpesa;

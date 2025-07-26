import React from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
function ViewMessage() {
  return (
    <div className="container-fluid vh-100 d-flex flex-column bg-dark text-light">
      <div className="container d-flex flex-column bg-dark h-100 p-0">
        {/* Header */}
        <div className="row bg-primary text-light p-4">
          <div className="col-sm-2 d-flex align-items-center justify-content-center">
            <ArrowBackIosNewOutlinedIcon
              className="text-light"
              style={{ cursor: "pointer", fontSize: "1.5rem" }}
              onClick={() => window.history.back()} // Optional: add your own handler
            />
          </div>

          <div className="col-sm-8">
            <h4 className="m-0 ">Patient Support</h4>
          </div>
        </div>

        {/* Chat body */}
        <div
          className="flex-grow-1 bg-light text-dark p-3 overflow-auto"
          style={{ maxHeight: "70vh" }}
        >
          {/* messages */}
          <div className="mb-3">
            <div className="bg-secondary text-light p-2 rounded w-50">
              Hello, how can I help you?
            </div>
          </div>
          <div className="d-flex justify-content-end mb-3">
            <div className="bg-primary text-light p-2 rounded w-50 text-end">
              I need help with my prescription.
            </div>
          </div>
          {/* Add your chat messages dynamically here */}
        </div>

        {/* Chat input */}
        <div className="bg-white p-3 border-top">
          <div className="row g-2 align-items-center">
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                placeholder="Type here and press enter..."
              />
            </div>
            <div className="col-2 text-center">
              <button className="btn btn-dark w-100">
                <SendOutlinedIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMessage;

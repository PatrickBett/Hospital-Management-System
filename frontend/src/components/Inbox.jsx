import React from "react";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
function Inbox({ messages }) {
  console.log("Mssages:", messages);
  return (
    <div className="mb-4 p-3 rounded border">
      <h5 className="fw-bold mb-3">Messages</h5> {/* <-- This is the title */}
      <ul className="list-unstyled">
        {messages.length > 0 ? (
          messages.map((message) => (
            <li
              key={message.id}
              className="bg-white px-4 py-1 border rounded mb-2"
            >
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <p className="mb-0 fw-semibold text-dark">
                    <PersonOutlineOutlinedIcon style={{ color: "orange" }} />
                    {message.patient}
                  </p>
                </div>
                <div className="col-sm-4 text-end">
                  <button className="border bg-light rounded p-1">
                    <MessageOutlinedIcon style={{ color: "orange" }} />
                    View
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="text-muted px-4 py-3">Messages unavailable</li>
        )}
      </ul>
    </div>
  );
}

export default Inbox;

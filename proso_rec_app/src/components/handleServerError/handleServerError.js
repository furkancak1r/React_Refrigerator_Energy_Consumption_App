import React from "react";
import "./handleServerError.css";
import { useNavigate } from "react-router-dom";

export default function HandleServerError() {
  const navigate = useNavigate();

  return (
    <div className="loading">
      <h1 className="error-number">500</h1>
      <h2 className="unexpected-error">
        Unexpected Error <b>{":("}</b>
      </h2>
      <div className="gears">
        <div className="gear one">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="gear two">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="gear three">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <button
          className="try-connection-button"
          onClick={() => {
            navigate("/");
          }}
        >
          Try Connection
        </button>
      </div>

      <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
      <script src="js/main.js" type="text/javascript"></script>
    </div>
  );
}

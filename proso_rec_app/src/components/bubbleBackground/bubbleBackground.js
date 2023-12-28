import React, { useState } from "react";
import "./bubbleBackground.css";
import { useAuth } from "../../authContext/authContext";

export default function BubbleBackground() {
  const [serialNumber, setSerialNumber] = useState("");

  const { loginInfo } = useAuth();
  const getRandomSize = () => {
    const size = Math.floor(Math.random() * 60) + 50; // Random size between 50px and 150px
    return size;
  };
  BubbleBackground.setSerialNumberFn = (newSerialNumber) => {
    setSerialNumber(newSerialNumber);
  };
  if (loginInfo === "testtakimi" || serialNumber || serialNumber !== "") {
    return null;
  } else {
    return (
      <section className="sticky">
        <div className="bubbles">
          {Array.from({ length: 10 }, (_, index) => (
            <div
              key={index}
              className="bubble"
              style={{
                width: `${getRandomSize()}px`,
                height: `${getRandomSize()}px`,
              }}
            >
              <img
                src="images/prosoLogo.ico" // Replace with the correct path to your image
                alt="logo"
                className="logo-bubble"
              />
            </div>
          ))}
        </div>
      </section>
    );
  }
}

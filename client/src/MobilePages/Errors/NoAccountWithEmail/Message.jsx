import React from "react";
import "./Message.css";
import { useNavigate } from "react-router-dom";

export default function Form() {
  let navigate = useNavigate();
  return (
    <div className="message-mob">
      <h1 className="message-error-mob">
      We're not able to find an account associated <br /> with given email-id. Please Sign-Up!
      </h1>
      <div className="button-wrapper-message-mob">
      <button
          type="submit"
          className="home-btn-mob-err"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          type="submit"
          className="signup-btn-mob-err"
          onClick={() => navigate("/signUp")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

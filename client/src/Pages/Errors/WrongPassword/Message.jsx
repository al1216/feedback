import React from "react";
import "./Message.css";
import { useNavigate } from "react-router-dom";

export default function Form() {
  let navigate = useNavigate();
  return (
    <div className="message">
      <h1 className="message-error">
        Please enter correct password!
      </h1>
      <div className="button-wrapper-message">
      <button
          type="submit"
          className="home-btn"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          type="submit"
          className="signup-btn"
          onClick={() => navigate("/signUp")}
        >
          Sign Up
        </button>
        <button
          type="submit"
          className="login-btn"
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  let [isToken, setIsToken] = useState(false);

  useEffect(() => {
    let t = localStorage.getItem("token");
    if (!t) setIsToken(false);
    else setIsToken(true);
  }, []);

  return (
    <div className="navbar-main">
      <h1 className="heading-navbar" onClick={() => navigate(0)}>
        Feedback
      </h1>
      <div className="buttons-main">
        {!isToken && (
          <button className="login-main" onClick={() => navigate("/login")}>
            Log in
          </button>
        )}
        {!isToken && (
          <button className="signup-main" onClick={() => navigate("/signup")}>
            Sign up
          </button>
        )}

        {isToken && (
          <button
            className="login-main"
            onClick={() => {
              localStorage.clear();
              navigate(0);
            }}
          >
            Log out
          </button>
        )}
        {isToken && <button className="login-main">Hello!</button>}
        {isToken && <img src="avatar.png" alt="" className="avatar-img" />}
      </div>
    </div>
  );
}

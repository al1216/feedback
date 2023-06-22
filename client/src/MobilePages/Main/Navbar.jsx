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
    <div className="navbar-main-mob">
      <h1 className="heading-navbar-mob" onClick={() => navigate(0)}>
        Feedback
      </h1>
      <div className="buttons-main-mob">
        {!isToken && (
          <button className="login-main-mob" onClick={() => navigate("/login")}>
            Log in
          </button>
        )}
        {!isToken && (
          <button className="signup-main-mob" onClick={() => navigate("/signup")}>
            Sign up
          </button>
        )}

        {isToken && (
          <button
            className="login-main-mob"
            onClick={() => {
              localStorage.clear();
              navigate(0);
            }}
          >
            Log out
          </button>
        )}
        {isToken && <button className="login-main-mob">Hello!</button>}
        {isToken && <img src="avatar.png" alt="" className="avatar-img-mob" />}
      </div>
    </div>
  );
}

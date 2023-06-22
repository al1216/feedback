import React from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Form() {
  let navigate = useNavigate();
  let onSubmitForm = async () => {
    await axios
      .get(`${process.env.REACT_APP_HOST}/get-token`)
      .then((res) => {
        const code = res.data.code;
        if (code === 200) {
          localStorage.setItem("token", res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="form-login">
      <form
        action={`${process.env.REACT_APP_HOST}/login`}
        method="post"
        onSubmit={() => onSubmitForm()}
      >
        <table>
          <tbody>
            <tr>
              <td>
                <img src="email.png" alt="" className="email-icon" />
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  className="email"
                  placeholder="Email"
                />
              </td>
            </tr>
            <tr>
              <td>
                <img src="password.png" alt="" className="password-icon" />
              </td>
              <td>
                <input
                  type="password"
                  name="password"
                  className="password"
                  placeholder="Password"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p className="login-login">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up</span>
        </p>
        <div className="button-wrapper-login">
          <button type="submit" className="login-btn">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

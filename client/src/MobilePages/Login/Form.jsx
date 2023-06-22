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
    <div className="form-login-mob">
      <form
        action={`${process.env.REACT_APP_HOST}/login`}
        method="post"
        onSubmit={() => onSubmitForm()}
      >
        <table>
          <tbody>
            <tr>
              <td>
                <img src="email.png" alt="" className="email-icon-mob" />
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  className="email-mob"
                  placeholder="Email"
                />
              </td>
            </tr>
            <tr>
              <td>
                <img src="password.png" alt="" className="password-icon-mob" />
              </td>
              <td>
                <input
                  type="password"
                  name="password"
                  className="password-mob"
                  placeholder="Password"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p className="login-login-mob">
          Don’t have an account?{" "} <br />
          <span onClick={() => navigate("/signup")}>Sign up</span>
        </p>
        <div className="button-wrapper-login-mob">
          <button type="submit" className="login-btn-mob">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

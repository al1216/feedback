import React from "react";
import "./Form.css";
import {useNavigate} from "react-router-dom";


export default function Form() {
  let navigate = useNavigate();

  return (
    <div className="form-signup">
      <form action="" method="post">
        <table>
          <tbody>
            <tr>
              <td>
                <img src="name.png" alt="" className="name-icon" />
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  className="name"
                  placeholder="Name"
                  autoFocus
                />
              </td>
            </tr>
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
                <img src="phone.png" alt="" className="phone-icon" />
              </td>
              <td>
                <input
                  type="tel"
                  name="phone"
                  className="phone"
                  placeholder="Mobile"
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
        <p className="login-signup">
          Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
        </p>
        <div className="button-wrapper-signup">
          <button type="submit" className="signup-btn">Signup</button>
        </div>
      </form>
    </div>
  );
}

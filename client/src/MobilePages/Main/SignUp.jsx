import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProduct() {
  let navigate = useNavigate();
  let [activateLogin, setActivateLogin] = useState(false);
  let onFormSubmitSignUp = async () => {
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
    // localStorage.setItem("closeSignUp", "true");
    navigate("/");
  };

  let onFormSubmitLogin = async () => {
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
    // localStorage.setItem("closeSignUp", "true");
    navigate("/");
  };

  let crossClicked = () => {
    navigate(0);
  };
  return (
    <div className="addProduct-modal-mob">
      {activateLogin === false && (
        <div className="left-login-sign-modal-mob sign-login-mob">
          <h1 className="modal-add-heading-mob">Signup to continue</h1>
          <div className="add-form-mob">
            <form
              action={`${process.env.REACT_APP_HOST}/signup`}
              method="post"
              onSubmit={() => onFormSubmitSignUp()}
            >
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
                        className="namef-add-mob"
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
                        className="email-add-mob"
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
                        className="phone-add-mob"
                        placeholder="Mobile"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="password.png"
                        alt=""
                        className="password-icon-mob"
                      />
                    </td>
                    <td>
                      <input
                        type="password"
                        name="password"
                        className="password-add-mob"
                        placeholder="Password"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="login-signup-mob">
                Already have an account?{" "} <br />
                <span
                  onClick={() => {
                    setActivateLogin(true);
                  }}
                >
                  Log in
                </span>
              </p>
              <div className="">
                <button type="submit" className="submit-add-btn-mob">
                  Signup
                </button>
              </div>
            </form>
            <p className="crossbutton-mob" onClick={() => crossClicked()}>
              X
            </p>
          </div>
        </div>
      )}
      {activateLogin === true && (
        <div className="left-login-sign-modal-mob login-modal-mob">
          <h1 className="modal-add-heading-mob">Log in to continue</h1>
          <div className="add-form-mob login-form-mob">
            <form
              action={`${process.env.REACT_APP_HOST}/login`}
              method="post"
              onSubmit={() => onFormSubmitLogin()}
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
                        className="email-add-mob"
                        placeholder="Email"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <img
                        src="password.png"
                        alt=""
                        className="password-icon-mob"
                      />
                    </td>
                    <td>
                      <input
                        type="password"
                        name="password"
                        className="password-add-mob"
                        placeholder="Password"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="login-signup-mob">
                Don’t have an account?{" "}
                <span
                  onClick={() => {
                    setActivateLogin(false);
                  }}
                >
                  Sign up
                </span>
              </p>
              <div className="">
                <button type="submit" className="submit-add-btn-mob">
                  Log in
                </button>
              </div>
            </form>
            <p className="crossbutton-mob" onClick={() => crossClicked()}>
              X
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

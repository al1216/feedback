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
  }
  return (
    <div className="addProduct-modal">
      {activateLogin === false && (
        <div className="left-add-modal">
          <h1 className="modal-add-heading">Signup to continue</h1>
          <div className="add-form">
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
                        className="name-add"
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
                        className="email-add"
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
                        className="phone-add"
                        placeholder="Mobile"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src="password.png"
                        alt=""
                        className="password-icon"
                      />
                    </td>
                    <td>
                      <input
                        type="password"
                        name="password"
                        className="password-add"
                        placeholder="Password"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="login-signup">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setActivateLogin(true);
                  }}
                >
                  Log in
                </span>
              </p>
              <div className="">
                <button type="submit" className="submit-add-btn">
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {activateLogin === true && (
        <div className="left-add-modal login-modal">
          <h1 className="modal-add-heading">Log in to continue</h1>
          <div className="add-form">
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
                        className="email-add"
                        placeholder="Email"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <img
                        src="password.png"
                        alt=""
                        className="password-icon"
                      />
                    </td>
                    <td>
                      <input
                        type="password"
                        name="password"
                        className="password-add"
                        placeholder="Password"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="login-signup">
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
                <button type="submit" className="submit-add-btn">
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="right-add-modal">
        <div className="wrapper-left-add">
          <h1 className="heading-right-add">Feedback</h1>
          <p className="content-right-add">
            Add your <br />
            product and <br /> rate other <br /> items.............
          </p>
        </div>

        <p className="crossbutton" onClick={() => crossClicked()}>
          X
        </p>
      </div>
    </div>
  );
}

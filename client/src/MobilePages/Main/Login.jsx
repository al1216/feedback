import React from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  let navigate = useNavigate();
  let onFormSubmit = () => {
  };
  return (
    <div className="addProduct-modal">
      <div className="left-add-modal">
        <h1 className="modal-add-heading">Signup to continue</h1>
        <div className="add-form">
          <form
            action={`${process.env.REACT_APP_HOST}/signup`}
            method="post"
            onSubmit={() => onFormSubmit()}
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
                    <img src="password.png" alt="" className="password-icon" />
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
              <span onClick={() => navigate("/login")}>Log in</span>
            </p>
            <div className="">
              <button type="submit" className="submit-add-btn">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="right-add-modal">
        <div className="wrapper-left-add">
          <h1 className="heading-right-add">Feedback</h1>
          <p className="content-right-add">
            Add your <br />
            product and <br /> rate other <br /> items.............
          </p>
        </div>

        <p className="crossbutton" onClick={() => onFormSubmit()}>
          X
        </p>
      </div>
    </div>
  );
}

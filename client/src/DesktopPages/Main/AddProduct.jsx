import React from "react";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  let navigate = useNavigate();
  let onFormSubmit = () => {
    navigate(0);
  };
  return (
    <div className="addProduct-modal">
      <div className="left-add-modal">
        <h1 className="modal-add-heading">Add your product</h1>
        <form
          action={`${process.env.REACT_APP_HOST}/add-products`}
          className="add-form"
          method="post"
          onSubmit={() => onFormSubmit()}
        >
          <input
            type="text"
            name="name"
            className="name-add"
            placeholder="Name of the company"
          />
          <input
            type="text"
            name="category"
            className="category-add"
            placeholder="Category"
          />
          <input
            type="text"
            name="logoUrl"
            className="logo-add"
            placeholder="Add logo url"
          />
          <input
            type="text"
            name="linkProduct"
            className="link-add"
            placeholder="Link of product"
          />
          <input
            type="text"
            name="desc"
            className="desc-add"
            placeholder="Add description"
          />

          <button type="submit" className="submit-add-btn">
            + Add
          </button>
        </form>
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

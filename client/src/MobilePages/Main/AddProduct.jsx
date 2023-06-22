import React from "react";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  let navigate = useNavigate();
  let onFormSubmit = () => {
    navigate(0);
  };
  return (
    <div className="addProduct-modal-mob">
      <div className="left-add-modal-mob">
        <h1 className="modal-add-heading-mob">Add your product</h1>
        <form
          action={`${process.env.REACT_APP_HOST}/add-products`}
          className="add-form-mob"
          method="post"
          onSubmit={() => onFormSubmit()}
        >
          <input
            type="text"
            name="name"
            className="name-add-mob"
            placeholder="Name of the company"
          />
          <input
            type="text"
            name="category"
            className="category-add-mob"
            placeholder="Category"
          />
          <input
            type="text"
            name="logoUrl"
            className="logo-add-mob"
            placeholder="Add logo url"
          />
          <input
            type="text"
            name="linkProduct"
            className="link-add-mob"
            placeholder="Link of product"
          />
          <input
            type="text"
            name="desc"
            className="desc-add-mob"
            placeholder="Add description"
          />

          <button type="submit" className="submit-add-btn-mob">
            + Add
          </button>
        </form>
      </div>
      <p className="crossbutton-mob" onClick={() => onFormSubmit()}>
        X
      </p>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./EditProduct.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProduct() {
  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [category, setCategory] = useState("");
  let [logoUrl, setLogoUrl] = useState("");
  let [link, setLink] = useState("");
  let [desc, setDesc] = useState("");
  let [pid, setpId] = useState("");
  let onFormSubmit = () => {
    navigate(0);
  };

  useEffect(() => {
    let id = localStorage.getItem("id");

    axios
      .get(`${process.env.REACT_APP_HOST}/product/${id}`)
      .then((res) => {
        let data = res.data;
        setpId(data._id);
        setName(data.name);
        setCategory(data.category);
        setLogoUrl(data.logoUrl);
        setLink(data.linkProduct);
        setDesc(data.desc);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="addProduct-modal-mob">
      <div className="left-add-modal-mob">
        <h1 className="modal-add-heading-mob">Edit your product</h1>
        <form
          action={`${process.env.REACT_APP_HOST}/edit-product/${pid}`}
          className="add-form-mob"
          method="post"
          onSubmit={() => onFormSubmit()}
        >
          <input
            type="text"
            name="name"
            className="name-add-mob"
            placeholder="Name of the company"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            name="category"
            className="category-add-mob"
            placeholder="Category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <input
            type="text"
            name="logoUrl"
            className="logo-add-mob"
            placeholder="Add logo url"
            value={logoUrl}
            onChange={(e) => {
              setLogoUrl(e.target.value);
            }}
          />
          <input
            type="text"
            name="linkProduct"
            className="link-add-mob"
            placeholder="Link of product"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          <input
            type="text"
            name="desc"
            className="desc-add-mob"
            placeholder="Add description"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />

          <button type="submit" className="submit-add-btn-mob">
            + Add
          </button>
        </form>
        <p className="crossbutton-mob" onClick={() => onFormSubmit()}>
          X
        </p>
      </div>
    </div>
  );
}

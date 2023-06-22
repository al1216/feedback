import React, { useEffect } from "react";
import "./style.css";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Feedback from "./Feedback";
import axios from "axios";

export default function Index() {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST}/get-token`)
      .then((res) => {
        const code = res.data.code;
        console.log(res.data);

        if (code === 200) {
          localStorage.setItem("token", res.data.message);
        }

        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className={`container-main`}>
      <Navbar></Navbar>
      <Hero></Hero>
      <Feedback></Feedback>
    </div>
  );
}

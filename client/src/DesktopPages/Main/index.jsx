import React from "react";
import "./style.css";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Feedback from "./Feedback";
// import axios from 'axios';

export default function Index() {
  return (
    <div
      className={`container-main`}
    >
      <Navbar></Navbar>
      <Hero></Hero>
      <Feedback></Feedback>
    </div>
  );
}

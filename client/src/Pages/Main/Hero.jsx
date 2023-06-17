import React from "react";
import './Hero.css';

export default function Hero() {
  return (
    <div className="hero-main">
      <img src="hero.png" alt="" className="hero-left-img" />
      <div className="hero-right">
        <h1 className="hero-heading">
          Add your products and give your valuable feedback
        </h1>
        <p className="content-hero">Easily give your feedback in a matter of minutes. Access your audience on all platforms. Observe result manually in real time</p>
      </div>
    </div>
  );
}

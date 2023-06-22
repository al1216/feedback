import React from "react";
import './Hero.css';

export default function Hero() {
  return (
    <div className="hero-main-mob">
      <img src="hero.png" alt="" className="hero-left-img-mob" />
      <div className="hero-right-mob">
        <h1 className="hero-heading-mob">
          Add your products and give your valuable feedback
        </h1>
        <p className="content-hero-mob">Easily give your feedback in a matter of minutes. Access your audience on all platforms. Observe result manually in real time</p>
      </div>
    </div>
  );
}

import React from "react";
import "./Homepage.css";
import Card from "../Cards/Card";
import Whyus from "../Cards/Whyus";
import Whatwedo from "../Cards/Whatwedo";
import Testimonial from "../Testimonial/Testimonial";
import Faq from "../Faq/Faq.jsx";

const Homepage = () => {

  return (
    <div>
      <div className="text">
        <span className="typing-text">Welcome to CARBONMITRA</span>
        <h1 style={{ padding: "1.5rem" }}>
          Your Ultimate Guide to Sustainable Living and Environmental Awareness
        </h1>
      </div>
      <div className="getting-started">
        <button className="start-btn">
          Getting Started
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="about-btn">
          Learn More
        </button>
      </div>
      <br></br>
      <br></br>
      <div class="container">
    <div class="left">
        <h1>DISCOVER</h1>
    </div>

    <div class="middle">
        <h1>OUR</h1>
        <h2>IMPACT</h2>
        
        <button class="explore-btn">Explore</button>
    </div>

    <div class="right"><h2>Empowering Coal Mines</h2></div>
</div>

<div class="right"></div> 
      <Card />
      <Whyus />
      <Whatwedo />
      <Testimonial />
      <Faq />
    </div>
  );
};

export default Homepage;

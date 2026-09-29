import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./lookbook.css";
import lookbookImage from "../assets/lookbook.png";
import img1 from "../assets/1.webp";
import img2 from "../assets/2.webp";
import img3 from "../assets/3.webp";
import img4 from "../assets/4.webp";
import img5 from "../assets/5.webp";
import img6 from "../assets/6.webp";
import img7 from "../assets/7.webp";

const cards = [
  {
    image: img1,
    title: "UNSTITCHED COTTON SATIN",
  },
  {
    image: img2,
    title: "WEDDING FESTIVE",
  },
  {
    image: img3,
    title: "EVERYDAY ESSENTIALS",
  },
  {
    image: img4,
    title: "PREMIUM COLLECTION",
  },
  {
    image: img5,
    title: "ACCESSORIES",
  },
  {
    image: img7,
    title: "SEASONAL SPECIAL",
  },
];

function Lookbook() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === cards.length - 2 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? cards.length - 2 : prevIndex - 1
    );
  };

  return (
    <div className="home">
      {/* Navbar */}
      {/* <header className="navbar">
        <div className="nav-left">
          <div className="menu">☰</div>
          <div className="logo">CROSS STITCH</div>
        </div>

        <nav>
          <a href="#">UNSTITCHED</a>
          <a href="#">READY TO WEAR</a>
          <a href="#">FRAGRANCES</a>
        </nav>

        <div className="nav-right">
          <span>⌕</span>
          <span>♧</span>
        </div>
      </header> */}

      {/* Hero Image */}
      <section className="hero">
        <img
          src={lookbookImage}
          alt="Cross Stitch Lookbook Collection"
        />
        <div className="hero-text">
          <h1>COTTON SATIN 2026</h1>
          <p>PREMIUM UNSTITCHED COLLECTION</p>
          <h3>IN STORES &amp; ONLINE</h3>
        </div>
      </section>

      {/* New In Section */}
      <section className="new-in-section">
        {/* Left Content */}
        <div className="new-in-left">
          <h2>NEW IN</h2>
          <p>CURATED FOR THE MODERN MUSE.<br />DISCOVER WHAT'S NEW.</p>
          <button className="shop-now-btn" onClick={() => navigate('/ready-to-wear')}>SHOP NOW</button>
        </div>

        {/* Cards Container */}
        <div className="cards-container">
          <button className="nav-arrow left-arrow" onClick={prevSlide}>
            &#8249;
          </button>
          
          <div className="cards-wrapper">
            <div className="cards-track" style={{transform: `translateX(-${currentIndex * 45}%)`}}>
              {cards.map((card, index) => (
                <div className="product-card" key={index}>
                  <div className="card-image">
                    <img src={card.image} alt={card.title} />
                  </div>
                  <h3 className="card-title">{card.title}</h3>
                </div>
              ))}
            </div>
          </div>

          <button className="nav-arrow right-arrow" onClick={nextSlide}>
            &#8250;
          </button>
        </div>
      </section>
    </div>
  );
}

export default Lookbook;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./hero2.css";
import "./everything.css";

import img11 from "../../assets/11.webp";
import img12 from "../../assets/12.webp";
import img13 from "../../assets/13.webp";
import img14 from "../../assets/14.webp";

const Hero2 = () => {
  const navigate = useNavigate();

  // Har card ka apna button text + apna alag function
  const cards = [
    {
      id: 1,
      image: img11,
      title: "UNSTITCHED",
      buttonText: "SHOP UNSTITCHED",
      onClick: () => navigate("/unstitched"),
    },
    {
      id: 2,
      image: img12,
      title: "Ready To Wear",
      buttonText: "SHOP NOW",
      onClick: () => navigate("/ready-to-wear"),
    },
    {
      id: 3,
      image: img13,
      title: "STUDIO",
      buttonText: "SHOP NOW",
      onClick: () => navigate("/accessories"),
    },
    {
      id: 4,
      image: img14,
      title: "Wedding Special",
      buttonText: "SHOP NOW",
      onClick: () => navigate("/ready-to-wear/wedding-collection"),
    },
  ];

  return (
    <>
      {/* ================= HERO 2 ================= */}
      <div className="hero2-container">
        <div className="hero2-cards-grid">
          {cards.map((card) => (
            <div key={card.id} className="hero2-card">
              <div className="hero2-card-image">
                <img src={card.image} alt={card.title} />

                <div className="hero2-card-overlay">
                  <div className="hero2-card-content">
                    <h3 className="hero2-card-title">{card.title}</h3>

                    <button
                      type="button"
                      className="hero2-card-btn"
                      onClick={card.onClick}
                    >
                      {card.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= EVERYTHING YOU NEED ================= */}
      <section className="everything-section">
        <h2 className="everything-title">Everything You Need</h2>

        <div className="everything-links">
          <Link to="/unstitched" className="everything-link">
            Unstitched
          </Link>

          <Link to="/ready-to-wear" className="everything-link">
            Ready to Wear
          </Link>

          <Link to="/fragrances" className="everything-link">
            Fragrances
          </Link>

          <Link to="/bags" className="everything-link">
            Bags
          </Link>

          <Link to="/footwear" className="everything-link">
            Footwear
          </Link>

          <Link to="/accessories" className="everything-link">
            Accessories
          </Link>
        </div>
      </section>
    </>
  );
};

export default Hero2;
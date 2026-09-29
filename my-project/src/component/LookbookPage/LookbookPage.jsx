import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LookbookPage.css';
import lookbookImage from '../../assets/lookbook.png';
import img1 from '../../assets/1.webp';
import img2 from '../../assets/2.webp';
import img3 from '../../assets/3.webp';
import img4 from '../../assets/4.webp';
import img5 from '../../assets/5.webp';
import img7 from '../../assets/7.webp';

const cards = [
  {
    image: img1,
    title: 'UNSTITCHED COTTON SATIN',
    route: '/unstitched',
  },
  {
    image: img2,
    title: 'WEDDING FESTIVE',
    route: '/unstitched/wedding-collection',
  },
  {
    image: img3,
    title: 'EVERYDAY ESSENTIALS',
    route: '/unstitched/daily-wear',
  },
  {
    image: img4,
    title: 'PREMIUM COLLECTION',
    route: '/ready-to-wear/luxury-pret',
  },
  {
    image: img5,
    title: 'ACCESSORIES',
    route: '/accessories',
  },
  {
    image: img7,
    title: 'SEASONAL SPECIAL',
    route: '/ready-to-wear',
  },
];

function LookbookPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className="lookbook-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span>Lookbook</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <section className="hero">
        <img src={lookbookImage} alt="Cross Stitch Lookbook Collection" />
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
          <p>
            CURATED FOR THE MODERN MUSE.<br />DISCOVER WHAT'S NEW.
          </p>
          <button
            type="button"
            className="shop-now-btn"
            onClick={() => navigate('/unstitched')}
          >
            SHOP NOW
          </button>
        </div>

        {/* Cards Container */}
        <div className="cards-container">
          <button type="button" className="nav-arrow left-arrow" onClick={prevSlide}>
            &#8249;
          </button>

          <div className="cards-wrapper">
            <div
              className="cards-track"
              style={{ transform: `translateX(-${currentIndex * 45}%)` }}
            >
              {cards.map((card, index) => (
                <div className="product-card" key={index}>
                  <div className="card-image">
                    <img src={card.image} alt={card.title} />
                  </div>

                  <h3 className="card-title">
                    <button
                      type="button"
                      className="card-title-btn"
                      onClick={() => card.route && navigate(card.route)}
                    >
                      {card.title}
                    </button>
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <button type="button" className="nav-arrow right-arrow" onClick={nextSlide}>
            &#8250;
          </button>
        </div>
      </section>
    </div>
  );
}

export default LookbookPage;
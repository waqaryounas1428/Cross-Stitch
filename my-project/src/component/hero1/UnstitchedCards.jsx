import "./UnstitchedCards.css";    
import React, { useState, useEffect, useRef } from "react";  
import { useNavigate } from "react-router-dom";
import img7 from "../../assets/7.webp";  
import img8 from "../../assets/8.webp";  
import img9 from "../../assets/9.webp";  
import img10 from "../../assets/10.webp";  
  
// Categories exactly like your image
const unstitchedCategories = [    
  "Cotton Satin",    
  "Premium Lawn",    
  "Mahiri",    
  "Chikankari",    
  "Daily Wear",    
  "Wedding Festive",    
  "Luxe", 
];  
  
const readyToWearCategories = [  
  "Exclusive Pret",  
  "Everyday Essentials",  
  "Co-Ords",  
  "Occasion Wear",  
  "Wedding Pret",    


];  
  
const accessoriesCategories = [  
  "WEDDING FESTIVE",  
  "OCASSION WEAR",    
];  
  
const fragranceCategories = [  
  "FRAGRANCES",  
  "BAGS",  
  "FootWear",  
  "DUPATTA/SHAWLS",  
  "SCARVES",   
];  

const cardData = [
  { image: img7, title: "UNSTITCHED", categories: unstitchedCategories, reverse: false },
  { image: img8, title: "READY TO WEAR", categories: readyToWearCategories, reverse: true },
  { image: img9, title: "STUDIO", categories: accessoriesCategories, reverse: false },
  { image: img10, title: "ACCESSORIES", categories: fragranceCategories, reverse: true },
];
    
export default function UnstitchedCards({ onSelectCategory = () => {} }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatingCategories, setAnimatingCategories] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // Route mapping for categories
  const categoryRoutes = {
    // UNSTITCHED
    "Cotton Satin": "/unstitched",
    "Premium Lawn": "/unstitched/premium-lawn",
    "Mahiri": "/unstitched/mahiri-embroidered",
    "Chikankari": "/unstitched/chikankari-lawn",
    "Daily Wear": "/unstitched/daily-wear",
    "Wedding Festive": "/unstitched/wedding-collection",
    "Luxe": "/unstitched/luxe-atelier",
    // READY TO WEAR
    "Exclusive Pret": "/ready-to-wear/exclusive-pret",
    "Everyday Essentials": "/ready-to-wear/everyday-essentials",
    "Co-Ords": "/ready-to-wear/coords",
    "Occasion Wear": "/ready-to-wear/luxury-pret",
    "Wedding Pret": "/ready-to-wear/wedding-collection",
    // STUDIO/ACCESSORIES
    "WEDDING FESTIVE": "/accessories",
    "OCASSION WEAR": "/accessories",
    // FRAGRANCES & OTHERS
    "FRAGRANCES": "/fragrances",
    "BAGS": "/bags",
    "FootWear": "/footwear",
    "DUPATTA/SHAWLS": "/accessories",
    "SCARVES": "/accessories",
  };

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    const route = categoryRoutes[category];
    if (route) {
      navigate(route);
    }
  };

  // Intersection Observer to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio > 0.5);
      },
      {
        threshold: 0.5, // Component must be at least 50% visible
        rootMargin: '0px 0px -100px 0px' // Add some margin to be more precise
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Auto slide effect - only when visible
  useEffect(() => {
    if (!isVisible) return; // Don't run if not visible

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cardData.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isVisible]); // Re-run when visibility changes

  // Trigger category animation when card changes
  useEffect(() => {
    setAnimatingCategories(true);
    const timeout = setTimeout(() => setAnimatingCategories(false), 100);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentCard = cardData[currentIndex];
      
  return (    
    <div className="unstitched-main-container" ref={containerRef}>
      {/* Progress Indicators - Inside hero1 component only */}
      <div className="progress-indicator">
        {cardData.map((_, index) => (
          <div
            key={index}
            className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Main Card Display */}
      <div className="card-display">
        <div className={`unstitched-grid ${currentCard.reverse ? 'reverse-grid' : ''}`}>
          {/* Image Section */}
          <div className="image-card">
            <img
              src={currentCard.image}
              alt={currentCard.title}
              className="card-img"
              key={currentIndex} // Force re-render for animation
            />
          </div>

          {/* Category Section */}
          <div className="category-card">
            <h1 className="category-title">
              {currentCard.title}
            </h1>

            <div className="category-list">
              {currentCard.categories.map((cat, index) => (
                <button
                  key={`${currentIndex}-${cat}`} // Unique key for animation reset
                  onClick={() => handleCategoryClick(cat)}
                  className={`category-btn ${animatingCategories ? 'animate-in' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>    
  );    
}
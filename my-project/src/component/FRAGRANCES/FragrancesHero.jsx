import React from 'react';
import './FragrancesHero.css';
import fragrancesImg from '../../img/FRAGRANCES/Fragrances.webp';

const FragrancesHero = () => {
  return (
    <div className="fragrances-hero">
      <img src={fragrancesImg} alt="Fragrances Collection" className="fragrances-hero-img" />
    </div>
  );
};

export default FragrancesHero;

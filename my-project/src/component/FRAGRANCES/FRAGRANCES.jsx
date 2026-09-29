import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FRAGRANCES.css';
import '../NormalGrid/NormalGrid.css';
import AdvancedFilterPanel from '../AdvancedFilterPanel/AdvancedFilterPanel';
import FragrancesHero from './FragrancesHero';
import FragrancesVideo from './FragrancesVideo';
import { useCart } from '../../context/CartContext.jsx';

// Import all fragrance images
import frag1 from '../../img/FRAGRANCES/Fragrances.webp';
import frag2 from '../../img/FRAGRANCES/Untitled-1_0000_ChatGPTImageAug18_2026_04_51_00PMcopy.webp';
import frag3 from '../../img/FRAGRANCES/Untitled-1_0000_ChatGPTImageAug18_2026_04_56_13PMcopy.webp';
import frag4 from '../../img/FRAGRANCES/Untitled-1_0000_ChatGPTImageAug18_2026_05_24_22PM.webp';
import frag5 from '../../img/FRAGRANCES/Untitled-1_0000_Untitled-1_0002_ChatGPTImageAug12_2026_03_35_04PM.webp';
import frag6 from '../../img/FRAGRANCES/Untitled-1_0001_ChatGPTImageAug12_2026_02_51_16PM.webp';
import frag7 from '../../img/FRAGRANCES/Untitled-1_0002_ChatGPTImageAug18_2026_04_45_53PMcopy.webp';
import frag8 from '../../img/FRAGRANCES/Untitled-1_0002_ChatGPTImageAug18_2026_05_22_20PM.webp';
import frag9 from '../../img/FRAGRANCES/Untitled-1_0003_ChatGPTImageAug12_2026_03_18_12PM.webp';
import frag10 from '../../img/FRAGRANCES/Untitled-1_0003_ChatGPTImageAug12_2026_03_24_49PM.webp';
import frag11 from '../../img/FRAGRANCES/Untitled-1_0003_ChatGPTImageAug12_2026_03_35_13PM.webp';
import frag12 from '../../img/FRAGRANCES/Untitled-1_0003_ChatGPTImageAug17_2026_04_39_58PM.webp';
import frag13 from '../../img/FRAGRANCES/Untitled-1_0004_ChatGPTImageAug17_2026_04_39_56PM.webp';

// Fragrance products data
const fragrancesData = [
  { id: 1, name: "Signature Eau de Parfum", image: frag1, price: "Rs. 4,500", type: "luxury" },
  { id: 2, name: "Rose Garden Perfume", image: frag2, price: "Rs. 3,800", type: "floral" },
  { id: 3, name: "Amber Luxe Scent", image: frag3, price: "Rs. 5,200", type: "amber" },
  { id: 4, name: "Oriental Dreams", image: frag4, price: "Rs. 4,200", type: "oriental" },
  { id: 5, name: "Fresh Citrus Blend", image: frag5, price: "Rs. 3,500", type: "citrus" },
  { id: 6, name: "Midnight Elegance", image: frag6, price: "Rs. 5,800", type: "luxury" },
  { id: 7, name: "Vanilla Essence", image: frag7, price: "Rs. 3,200", type: "vanilla" },
  { id: 8, name: "Floral Monsoon", image: frag8, price: "Rs. 4,800", type: "floral" },
  { id: 9, name: "Woody Charm", image: frag9, price: "Rs. 4,100", type: "woody" },
  { id: 10, name: "Jasmine Romance", image: frag10, price: "Rs. 3,900", type: "floral" },
  { id: 11, name: "Spice Affair", image: frag11, price: "Rs. 4,600", type: "spice" },
  { id: 12, name: "Ocean Breeze", image: frag12, price: "Rs. 3,700", type: "fresh" },
  { id: 13, name: "Gold Rush Eau", image: frag13, price: "Rs. 6,200", type: "luxury" },
];

// Filter options
const fragranceTypeOptions = [
  { name: 'LUXURY', count: 3 },
  { name: 'FLORAL', count: 3 },
  { name: 'ORIENTAL', count: 1 },
  { name: 'AMBER', count: 1 },
  { name: 'CITRUS', count: 1 },
  { name: 'WOODY', count: 1 },
  { name: 'VANILLA', count: 1 },
  { name: 'FRESH', count: 1 },
  { name: 'SPICE', count: 1 }
];

const volumeOptions = [
  { name: '50ml', count: 4 },
  { name: '100ml', count: 5 },
  { name: '150ml', count: 4 }
];

const concentrationOptions = [
  { name: 'EAU DE PARFUM', count: 6 },
  { name: 'EAU DE TOILETTE', count: 4 },
  { name: 'EAU DE COLOGNE', count: 3 }
];

const ProductCard = ({ product }) => {
  const [selectedVolume, setSelectedVolume] = useState('100ml');
  const { addToCart } = useCart();
  const volumes = ['50ml', '100ml', '150ml'];

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      ...product,
      volume: selectedVolume,
    });
    alert(`${product.name} (${selectedVolume}) added to cart!`);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-overlay"></div>
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">
          <span className="price-label">Rs.</span>
          <span className="price-value"> {product.price.replace('Rs. ', '')}</span>
        </div>
        <div className="volume-selector">
          {volumes.map(volume => (
            <button
              key={volume}
              className={`volume-btn ${selectedVolume === volume ? 'active' : ''}`}
              onClick={() => setSelectedVolume(volume)}
            >
              {volume}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const FragrancesPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    sizes: [],
    fabrics: [],
    productDetails: [],
    colors: [],
    price: { min: 1830, max: 100000 }
  });

  const filteredProducts = fragrancesData;

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      setSelectedFilters({
        sizes: [],
        fabrics: [],
        productDetails: [],
        colors: [],
        price: { min: 1830, max: 100000 }
      });
    } else if (filterType === 'price') {
      setSelectedFilters(prev => ({
        ...prev,
        price: value
      }));
    } else {
      setSelectedFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  return (
    <div className="fragrances-page">
      {/* Hero Section */}
      <FragrancesHero />



      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Fragrances</span>
          </div>
        </div>
      </div>

      {/* Filter Button */}
      <div className="filter-section">
        <div className="container">
          <div className="filter-button-wrapper">
            <button 
              className="filter-by-btn"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <svg className="filter-icon" viewBox="0 0 24 24" width="16" height="16">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Filter By
            </button>
            
            {/* Filter Dropdown Panel */}
            {filterOpen && (
              <AdvancedFilterPanel
                isOpen={filterOpen}
                onClose={() => setFilterOpen(false)}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                productCount={filteredProducts.length}
              />
            )}
          </div>
        </div>
      </div>

      {/* Products Grid - Uniform (not pattern grid) */}
      <div className="products-grid-uniform">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No fragrances match the selected filters.</p>
          </div>
        )}
      </div>

      {/* Video Section */}
      <FragrancesVideo />
    </div>
  );
};

export default FragrancesPage;

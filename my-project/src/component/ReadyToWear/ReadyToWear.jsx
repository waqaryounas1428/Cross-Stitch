import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './ReadyToWear.css';
import '../NormalGrid/NormalGrid.css';
import '../BottomsGrid/BottomsGrid.css';
import AdvancedFilterPanel from '../AdvancedFilterPanel/AdvancedFilterPanel';
import PatternGrid from '../PatternGrid/PatternGrid';
import { useCart } from '../../context/CartContext.jsx';

// Dynamically import all images from folders
const readyToWearImages = import.meta.glob('../../img/Ready To Wear/*.webp', { eager: true });
const exclusivePretImages = import.meta.glob('../../img/Ready To Wear/*.webp', { eager: true });
const bottomImages = import.meta.glob('../../img/Bottom/*.webp', { eager: true });
const coordsImages = import.meta.glob('../../img/co-codr/*.webp', { eager: true });
const everydayImages = import.meta.glob('../../img/EVERYDAY ESSENTIALS/*.webp', { eager: true });
const luxuryImages = import.meta.glob('../../img/LUXURY PRET/*.webp', { eager: true });
const weddingImages = import.meta.glob('../../img/WEDDING COLLECTION/*.webp', { eager: true });

// Helper function to convert glob imports to array of image URLs
const getImagesFromGlob = (globObj) => {
  return Object.values(globObj).map(module => module.default);
};

// Get all images per category
const exclusivePretImgs = getImagesFromGlob(exclusivePretImages);
const btnImgs = getImagesFromGlob(bottomImages);
const coordsImgs = getImagesFromGlob(coordsImages);
const everydayImgs = getImagesFromGlob(everydayImages);
const luxuryImgs = getImagesFromGlob(luxuryImages);
const weddingImgs = getImagesFromGlob(weddingImages);

// Create product arrays with category field
const createProductsWithCategory = (images, category, basePrice) => {
  return images.map((img, idx) => ({
    id: `${category}-${idx}`,
    name: `${category} Item ${idx + 1}`,
    image: img,
    price: `Rs. ${basePrice + idx * 1000}`,
    category: category,
    type: category
  }));
};

// Individual category data
const exclusivePretData = createProductsWithCategory(exclusivePretImgs, 'exclusive-pret', 12500);
const bottomsData = createProductsWithCategory(btnImgs, 'bottoms', 2500);
const coordsData = createProductsWithCategory(coordsImgs, 'coords', 5200);
const everydayData = createProductsWithCategory(everydayImgs, 'everyday', 3200);
const luxuryData = createProductsWithCategory(luxuryImgs, 'luxury', 18500);
const weddingData = createProductsWithCategory(weddingImgs, 'wedding', 45000);

// Combined "VIEW ALL" data - merge all categories (WITHOUT bottoms)
const allCombinedData = [
  ...exclusivePretData,
  ...coordsData,
  ...everydayData,
  ...luxuryData,
  ...weddingData
];

// Sub-category tabs configuration
const subCategories = [
  { id: 'all', label: 'VIEW ALL', route: '/ready-to-wear', active: true },
  { id: 'exclusive-pret', label: 'EXCLUSIVE PRET', route: '/ready-to-wear/exclusive-pret' },
  { id: 'coords', label: 'CO-ORDS', route: '/ready-to-wear/coords' },
  { id: 'everyday', label: 'EVERYDAY ESSENTIALS', route: '/ready-to-wear/everyday-essentials' },
  { id: 'luxury', label: 'LUXURY PRET', route: '/ready-to-wear/luxury-pret' },
  { id: 'wedding', label: 'WEDDING COLLECTION', route: '/ready-to-wear/wedding-collection' },
  { id: 'bottoms', label: 'BOTTOMS', route: '/ready-to-wear/bottoms' }
];

// Size options
const sizeOptions = [
  { name: 'XS', count: 8 },
  { name: 'S', count: 12 },
  { name: 'M', count: 15 },
  { name: 'L', count: 12 },
  { name: 'XL', count: 8 }
];

const fabricOptions = [
  { name: 'COTTON', count: 10 },
  { name: 'SILK', count: 8 },
  { name: 'LINEN', count: 6 },
  { name: 'BLEND', count: 12 },
  { name: 'KHADDAR', count: 7 }
];

const colorOptions = [
  { name: 'WHITE', count: 8 },
  { name: 'BLACK', count: 6 },
  { name: 'NAVY', count: 7 },
  { name: 'RED', count: 5 },
  { name: 'EARTH TONES', count: 9 }
];

  const ProductCardRenderer = ({ product }) => {
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState('M');
    const { addToCart } = useCart();
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    const handleAddToCart = (e) => {
      e.stopPropagation();
      addToCart({
        ...product,
        size: selectedSize,
      });
      alert(`${product.name} (Size: ${selectedSize}) added to cart!`);
    };

    const handleProductClick = () => {
      navigate(`/ready-to-wear/product/${product.id}`);
    };

    return (
      <div 
        className="product-card"
        onClick={handleProductClick}
        style={{ cursor: 'pointer' }}
      >
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
          <h3 style={{ cursor: 'pointer' }}>{product.name}</h3>
          <p className="product-price">{product.price}</p>
        </div>
      </div>
    );
  };

const ReadyToWearPage = () => {
  const location = useLocation();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    sizes: [],
    fabrics: [],
    productDetails: [],
    colors: [],
    price: { min: 1830, max: 100000 }
  });

  // Determine active category from route
  const getActiveCategory = () => {
    const path = location.pathname;
    if (path.includes('exclusive-pret')) return 'exclusive-pret';
    if (path.includes('coords')) return 'coords';
    if (path.includes('everyday-essentials')) return 'everyday';
    if (path.includes('luxury-pret')) return 'luxury';
    if (path.includes('wedding-collection')) return 'wedding';
    if (path.includes('bottoms')) return 'bottoms';
    return 'all';
  };

  const activeCategory = getActiveCategory();

  // Get products based on active category
  const getProducts = () => {
    switch(activeCategory) {
      case 'exclusive-pret':
        return exclusivePretData;
      case 'coords':
        return coordsData;
      case 'everyday':
        return everydayData;
      case 'luxury':
        return luxuryData;
      case 'wedding':
        return weddingData;
      case 'bottoms':
        return bottomsData;
      default:
        // "VIEW ALL" - return combined data from all categories
        return allCombinedData;
    }
  };

  const filteredProducts = getProducts();

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      // Clear all filters
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
    <div className="ready-to-wear-page">
      {/* Sub-category Navigation */}
      <div className="subcategory-nav">
        <div className="container">
          <div className="subcategory-tabs">
            {subCategories.map((tab, index) => (
              <React.Fragment key={tab.id}>
                <Link 
                  to={tab.route} 
                  className={`subcategory-tab ${activeCategory === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                  {activeCategory === tab.id && <span className="active-indicator"></span>}
                </Link>
                {index < subCategories.length - 1 && <span className="tab-separator">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Ready To Wear</span>
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

      {/* Products Grid - Conditional Layout */}
      {/* Bottoms tab: separate uniform grid; all others: PatternGrid */}
      {activeCategory === 'bottoms' ? (
        <div className="products-grid-bottoms">
          {filteredProducts.map(product => (
            <ProductCardRenderer key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="no-products">
              <p>No bottoms match the selected filters.</p>
            </div>
          )}
        </div>
      ) : (
        <PatternGrid
          products={filteredProducts}
          renderProduct={(product) => <ProductCardRenderer key={product.id} product={product} />}
        />
      )}
    </div>
  );
};

export default ReadyToWearPage;

import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Accessories.css';
import '../NormalGrid/NormalGrid.css';
import { useCart } from '../../context/CartContext.jsx';

// ================= BAGS DATA =================
import bag1 from '../../img/Bags/0123ACCBAGCLU0105_3_medium.webp';
import bag2 from '../../img/Bags/0123ACCBAGCLU0110_2_medium.webp';
import bag3 from '../../img/Bags/0123ACCBAGHBG0101_2_medium.webp';
import bag4 from '../../img/Bags/21_c77c4277-f6f5-43e4-bd81-5c6279b1ad5e_medium.webp';
import bag5 from '../../img/Bags/4P2A5465_medium.webp';
import bag6 from '../../img/Bags/9_5a58cc3e-6275-432a-bceb-2b99be8fbc6c_medium.webp';
import bag7 from '../../img/Bags/Bags2_0002_02_1_medium.webp';
import bag8 from '../../img/Bags/bags_0004_006_1_medium.webp';
import bag9 from '../../img/Bags/bags_0004_009_1_medium.webp';
import bag10 from '../../img/Bags/bags_0007_004_2_medium.webp';
import bag11 from '../../img/Bags/bags_0007_008_1_medium.webp';
import bag12 from '../../img/Bags/bags_0009_005_2_medium.webp';
import bag13 from '../../img/Bags/new_0002_003_medium.webp';
import bag14 from '../../img/Bags/new_0002_19.webp';
import bag15 from '../../img/Bags/new_0006_24_medium.webp';
import bag16 from '../../img/Bags/new_0009_30_medium.webp';
import bag17 from '../../img/Bags/new_0011_16.webp';
import bag18 from '../../img/Bags/new_0012_15_3c7c4023-ae5c-4414-b813-b815381921fc_medium.webp';
import bag19 from '../../img/Bags/new_0012_27.webp';
import bag20 from '../../img/Bags/new_0017_10_medium.webp';
import bag21 from '../../img/Bags/new_0018_10.10jpg.webp';

const bagsData = [
  { id: 'bag-1', name: "Clutch Bag - Classic", image: bag1, price: "Rs. 2,500", category: "Bags" },
  { id: 'bag-2', name: "Clutch Bag - Premium", image: bag2, price: "Rs. 3,200", category: "Bags" },
  { id: 'bag-3', name: "Handbag - Elegant", image: bag3, price: "Rs. 4,500", category: "Bags" },
  { id: 'bag-4', name: "Designer Bag", image: bag4, price: "Rs. 5,800", category: "Bags" },
  { id: 'bag-5', name: "Evening Bag", image: bag5, price: "Rs. 3,800", category: "Bags" },
  { id: 'bag-6', name: "Casual Bag", image: bag6, price: "Rs. 2,900", category: "Bags" },
  { id: 'bag-7', name: "Luxury Handbag", image: bag7, price: "Rs. 6,200", category: "Bags" },
  { id: 'bag-8', name: "Classic Shoulder Bag", image: bag8, price: "Rs. 4,100", category: "Bags" },
  { id: 'bag-9', name: "Modern Tote", image: bag9, price: "Rs. 3,600", category: "Bags" },
  { id: 'bag-10', name: "Stylish Crossbody", image: bag10, price: "Rs. 3,400", category: "Bags" },
  { id: 'bag-11', name: "Chic Messenger", image: bag11, price: "Rs. 4,800", category: "Bags" },
  { id: 'bag-12', name: "Premium Collection", image: bag12, price: "Rs. 7,500", category: "Bags" },
  { id: 'bag-13', name: "Contemporary Style", image: bag13, price: "Rs. 4,200", category: "Bags" },
  { id: 'bag-14', name: "Trendy Design", image: bag14, price: "Rs. 3,100", category: "Bags" },
  { id: 'bag-15', name: "Classic Elegance", image: bag15, price: "Rs. 5,200", category: "Bags" },
  { id: 'bag-16', name: "Fashion Forward", image: bag16, price: "Rs. 4,600", category: "Bags" },
  { id: 'bag-17', name: "Sophisticated Look", image: bag17, price: "Rs. 5,900", category: "Bags" },
  { id: 'bag-18', name: "Luxury Statement", image: bag18, price: "Rs. 8,200", category: "Bags" },
  { id: 'bag-19', name: "Everyday Essential", image: bag19, price: "Rs. 2,800", category: "Bags" },
  { id: 'bag-20', name: "Professional Style", image: bag20, price: "Rs. 4,900", category: "Bags" },
  { id: 'bag-21', name: "Exclusive Design", image: bag21, price: "Rs. 6,800", category: "Bags" },
];

// ================= FRAGRANCE DATA =================
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

const fragrancesData = [
  { id: 'frag-1', name: "Signature Eau de Parfum", image: frag1, price: "Rs. 4,500", category: "Fragrance" },
  { id: 'frag-2', name: "Rose Garden Perfume", image: frag2, price: "Rs. 3,800", category: "Fragrance" },
  { id: 'frag-3', name: "Amber Luxe Scent", image: frag3, price: "Rs. 5,200", category: "Fragrance" },
  { id: 'frag-4', name: "Oriental Dreams", image: frag4, price: "Rs. 4,200", category: "Fragrance" },
  { id: 'frag-5', name: "Fresh Citrus Blend", image: frag5, price: "Rs. 3,500", category: "Fragrance" },
  { id: 'frag-6', name: "Midnight Elegance", image: frag6, price: "Rs. 5,800", category: "Fragrance" },
  { id: 'frag-7', name: "Vanilla Essence", image: frag7, price: "Rs. 3,200", category: "Fragrance" },
  { id: 'frag-8', name: "Floral Monsoon", image: frag8, price: "Rs. 4,800", category: "Fragrance" },
  { id: 'frag-9', name: "Woody Charm", image: frag9, price: "Rs. 4,100", category: "Fragrance" },
  { id: 'frag-10', name: "Jasmine Romance", image: frag10, price: "Rs. 3,900", category: "Fragrance" },
  { id: 'frag-11', name: "Spice Affair", image: frag11, price: "Rs. 4,600", category: "Fragrance" },
  { id: 'frag-12', name: "Ocean Breeze", image: frag12, price: "Rs. 3,700", category: "Fragrance" },
  { id: 'frag-13', name: "Gold Rush Eau", image: frag13, price: "Rs. 6,200", category: "Fragrance" },
];

// ================= DUPATTA DATA (Dynamic) =================
const dupattaImages = import.meta.glob(
  '../../img/DUPATTA/*.webp',
  { eager: true, import: 'default' }
);
const dupattaImageList = Object.values(dupattaImages);

const dupattaData = dupattaImageList.map((image, index) => ({
  id: `dupatta-${index}`,
  name: `Dupatta/Shawl ${index + 1}`,
  image: image,
  price: `Rs. ${2000 + index * 300}`,
  category: "Dupatta"
}));

// ================= COMBINED DATA =================
const allAccessories = [
  ...bagsData,
  ...fragrancesData,
  ...dupattaData
];

// Tab definitions
const tabs = [
  { key: 'all', label: 'VIEW ALL' },
  { key: 'bags', label: 'BAGS' },
  { key: 'dupatta', label: 'DUPATTA' },
  { key: 'fragrance', label: 'FRAGRANCE' }
];

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category
    });
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-fabric">{product.category}</p>
        <p className="product-price">{product.price}</p>
      </div>
    </div>
  );
};

const AccessoriesPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all');

  // Determine active tab based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('bags')) {
      setActiveTab('bags');
    } else if (path.includes('dupatta')) {
      setActiveTab('dupatta');
    } else if (path.includes('fragrance')) {
      setActiveTab('fragrance');
    } else {
      setActiveTab('all');
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Filter products based on active tab
  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case 'bags':
        return bagsData;
      case 'dupatta':
        return dupattaData;
      case 'fragrance':
        return fragrancesData;
      case 'all':
      default:
        return allAccessories;
    }
  }, [activeTab]);

  const getTabUrl = (tabKey) => {
    switch (tabKey) {
      case 'all':
        return '/accessories';
      case 'bags':
        return '/collections/bags';
      case 'dupatta':
        return '/collections/dupatta';
      case 'fragrance':
        return '/collections/fragrance';
      default:
        return '/accessories';
    }
  };

  return (
    <div className="accessories-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb-section">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span>Accessories</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="accessories-header">
          {/* <h1 className="accessories-title">Accessories</h1> */}
        </div>

        {/* Subcategory Tabs */}
        <div className="subcategory-tabs">
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.key}>
              <Link
                to={getTabUrl(tab.key)}
                className={`subcategory-tab ${activeTab === tab.key ? 'active' : ''}`}
              >
                {tab.label}
                {activeTab === tab.key && <span className="active-indicator">•</span>}
              </Link>
              {index < tabs.length - 1 && <span className="tab-separator">|</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <button className="filter-by-btn">
            <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
            Filter By
          </button>
        </div>

        {/* Products Grid - UNIFORM GRID (NO PATTERN GRID) */}
        <div className="products-grid-uniform">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="no-products">
              <p>No items available in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessoriesPage;

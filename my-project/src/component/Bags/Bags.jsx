import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Bags.css';
import './FilterPanel.css';
import FilterPanel from './FilterPanel';

// Import bag images
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
import bag20 from '../../img/Bags/new_0014_12_medium.webp';
import bag21 from '../../img/Bags/new_0017_10_medium.webp';
import bag22 from '../../img/Bags/new_0018_10.10jpg.webp';

const bagsData = [
  { id: 1, name: "Clutch Bag - Classic", image: bag1, price: "Rs. 2,500", category: "Clutch", color: "Black" },
  { id: 2, name: "Clutch Bag - Premium", image: bag2, price: "Rs. 3,200", category: "Clutch", color: "Gold" },
  { id: 3, name: "Handbag - Elegant", image: bag3, price: "Rs. 4,500", category: "Handbag", color: "Black" },
  { id: 4, name: "Designer Bag", image: bag4, price: "Rs. 5,800", category: "Designer", color: "Green" },
  { id: 5, name: "Evening Bag", image: bag5, price: "Rs. 3,800", category: "Evening", color: "Black" },
  { id: 6, name: "Casual Bag", image: bag6, price: "Rs. 2,900", category: "Casual", color: "Grey" },
  { id: 7, name: "Luxury Handbag", image: bag7, price: "Rs. 6,200", category: "Luxury", color: "Black" },
  { id: 8, name: "Classic Shoulder Bag", image: bag8, price: "Rs. 4,100", category: "Shoulder", color: "Burgundy" },
  { id: 9, name: "Modern Tote", image: bag9, price: "Rs. 3,600", category: "Tote", color: "Black" },
  { id: 10, name: "Stylish Crossbody", image: bag10, price: "Rs. 3,400", category: "Crossbody", color: "Champagne" },
  { id: 11, name: "Chic Messenger", image: bag11, price: "Rs. 4,800", category: "Messenger", color: "Black" },
  { id: 12, name: "Premium Collection", image: bag12, price: "Rs. 7,500", category: "Premium", color: "Gold" },
  { id: 13, name: "Contemporary Style", image: bag13, price: "Rs. 4,200", category: "Contemporary", color: "Black" },
  { id: 14, name: "Trendy Design", image: bag14, price: "Rs. 3,100", category: "Trendy", color: "Blue" },
  { id: 15, name: "Classic Elegance", image: bag15, price: "Rs. 5,200", category: "Classic", color: "Black" },
  { id: 16, name: "Fashion Forward", image: bag16, price: "Rs. 4,600", category: "Fashion", color: "Lilac" },
  { id: 17, name: "Sophisticated Look", image: bag17, price: "Rs. 5,900", category: "Sophisticated", color: "Black" },
  { id: 18, name: "Luxury Statement", image: bag18, price: "Rs. 8,200", category: "Statement", color: "Gold" },
  { id: 19, name: "Everyday Essential", image: bag19, price: "Rs. 2,800", category: "Essential", color: "Black" },
  { id: 20, name: "Professional Style", image: bag20, price: "Rs. 4,900", category: "Professional", color: "Grey" },
  { id: 21, name: "Exclusive Design", image: bag21, price: "Rs. 6,800", category: "Exclusive", color: "Black" },
  { id: 22, name: "Signature Collection", image: bag22, price: "Rs. 7,900", category: "Signature", color: "Green" },
];

const categories = ["All", "Clutch", "Handbag", "Designer", "Evening", "Casual", "Luxury", "Shoulder", "Tote", "Crossbody"];

// Turns "Rs. 2,500" into 2500 for filtering/sorting
const parsePrice = (priceStr) => Number(priceStr.replace(/[^0-9]/g, ''));

const BagsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBag, setSelectedBag] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeColors, setActiveColors] = useState([]);

  // Price bounds derived from the actual data, so the slider always fits
  const [priceMin, priceMax] = useMemo(() => {
    const prices = bagsData.map((b) => parsePrice(b.price));
    return [Math.min(...prices), Math.max(...prices)];
  }, []);
  const [priceRange, setPriceRange] = useState([priceMin, priceMax]);

  // Color list with counts, built from bagsData
  const colorOptions = useMemo(() => {
    const counts = {};
    bagsData.forEach((b) => {
      counts[b.color] = (counts[b.color] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredBags = bagsData.filter((bag) => {
    const categoryMatch = selectedCategory === "All" || bag.category === selectedCategory;
    const colorMatch = activeColors.length === 0 || activeColors.includes(bag.color);
    const price = parsePrice(bag.price);
    const priceMatch = price >= priceRange[0] && price <= priceRange[1];
    return categoryMatch && colorMatch && priceMatch;
  });

  const openModal = (bag) => {
    setSelectedBag(bag);
  };

  const closeModal = () => {
    setSelectedBag(null);
  };

  return (
    <div className="bags-page">
      {/* Page Header */}
      <div className="page-header">
        {/* <h1>Bags Collection</h1>
        <p>Discover our exquisite range of handcrafted bags and accessories</p> */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> / Bags
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="page-content">
          
          {/* Filter Section */}
          <div className="category-filter">
            <h2>Bags Collection</h2>
            <button
              type="button"
              className="filter-trigger-btn"
              onClick={() => setFilterOpen(true)}
            >
              FILTER BY
            </button>
          </div>

          {/* Bags Grid */}
          <div className="bags-grid">
            {filteredBags.map((bag) => (
              <div key={bag.id} className="bag-card" onClick={() => openModal(bag)}>
                <div className="bag-image">
                  <img src={bag.image} alt={bag.name} />
                  <div className="bag-overlay">
                    <span className="view-details">View Details</span>
                  </div>
                </div>
                <div className="bag-info">
                  <h3>{bag.name}</h3>
                  <p className="bag-category">{bag.category}</p>
                  <p className="bag-price">{bag.price}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredBags.length === 0 && (
            <p style={{ textAlign: 'center', color: '#777', padding: '40px 0' }}>
              No bags match the selected filters.
            </p>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        categories={categories}
        colors={colorOptions}
        minPrice={priceMin}
        maxPrice={priceMax}
        selectedCategory={selectedCategory}
        selectedColors={activeColors}
        selectedRange={priceRange}
        matchCount={filteredBags.length}
        onChange={({ category, colors, range }) => {
          setSelectedCategory(category);
          setActiveColors(colors);
          setPriceRange(range);
        }}
        onApply={() => setFilterOpen(false)}
      />

      {/* Modal */}
      {selectedBag && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedBag.image} alt={selectedBag.name} />
              </div>
              <div className="modal-info">
                <h2>{selectedBag.name}</h2>
                <p className="modal-category">{selectedBag.category}</p>
                <p className="modal-price">{selectedBag.price}</p>
                <div className="modal-actions">
                  <button className="btn-primary">Add to Cart</button>
                  <button className="btn-secondary">Add to Wishlist</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BagsPage;
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Unstitched.css';
import UnstitchedFilterPanel from './UnstitchedFilterPanel';

// Import all unstitched images
import img1 from '../../img/UNSTITCHED/Untitled-1-Recovered_0001_7I0A4214.webp';
import img2 from '../../img/UNSTITCHED/Untitled-1-Recovered_0002_7I0A5283.webp';
import img3 from '../../img/UNSTITCHED/Untitled-1-Recovered_0005_7I0A5130.webp';
import img4 from '../../img/UNSTITCHED/Untitled-1-Recovered_0005_7I0A5456.webp';
import img5 from '../../img/UNSTITCHED/Untitled-1-Recovered_0006_7I0A4378.webp';
import img6 from '../../img/UNSTITCHED/Untitled-1-Recovered_0010_7I0A4774_821af959-fbc9-48f0-86f7-e1112d44daf3.webp';
import img7 from '../../img/UNSTITCHED/Untitled-1_0000_DSC07258.webp';
import img8 from '../../img/UNSTITCHED/Untitled-1_0000_DSC07437.webp';
import img9 from '../../img/UNSTITCHED/Untitled-1_0001_7I0A5657.webp';
import img10 from '../../img/UNSTITCHED/Untitled-1_0002_DSC06962.webp';
import img11 from '../../img/UNSTITCHED/Untitled-1_0003_7I0A6540.webp';
import img12 from '../../img/UNSTITCHED/Untitled-1_0003_7I0A7357.webp';
import img13 from '../../img/UNSTITCHED/Untitled-1_0004_7I0A6795.webp';
import img14 from '../../img/UNSTITCHED/Untitled-1_0004_7I0A6877.webp';
import img15 from '../../img/UNSTITCHED/Untitled-1_0004_DSC07139.webp';
import img16 from '../../img/UNSTITCHED/Untitled-1_0004_DSC07321.webp';
import img17 from '../../img/UNSTITCHED/Untitled-1_0005_7I0A6034.webp';
import img18 from '../../img/UNSTITCHED/Untitled-1_0005_7I0A6676.webp';
import img19 from '../../img/UNSTITCHED/Untitled-1_0005_AKS03142.webp';
import img20 from '../../img/UNSTITCHED/Untitled-1_0005_AKS03411.webp';
import img21 from '../../img/UNSTITCHED/Untitled-1_0006_AKS02894.webp';
import img22 from '../../img/UNSTITCHED/Untitled-1_0006_DSC02209.webp';
import img23 from '../../img/UNSTITCHED/Untitled-1_0008_AKS03471.webp';
import img24 from '../../img/UNSTITCHED/Untitled-1_0008_AKS03521.webp';
import img25 from '../../img/UNSTITCHED/Untitled-1_0009_DSC07675.webp';
import img26 from '../../img/UNSTITCHED/Untitled-1_0014_DSC07506 (1).webp';
import img27 from '../../img/UNSTITCHED/Untitled-1_0014_DSC07506.webp';

// Complete unstitched products data with all images
const unstitchedData = [
  { id: 'unstitched-1', name: "Mahiri Embroidered Elegance", image: img1, price: "Rs. 8,500", category: "mahiri", fabric: "LAWN", detail: "EMBROIDERED", size: "UNSTITCH", color: "MULTI", designCode: "UNS-001", workDetails: "Hand embroidered with traditional mahiri technique", collection: "unstitched" },
  { id: 'unstitched-2', name: "Chikankari Lawn Collection", image: img2, price: "Rs. 6,200", category: "chikankari", fabric: "LAWN", detail: "EMBROIDERED", size: "UNSTITCH", color: "CREAM", designCode: "UNS-002", workDetails: "Delicate chikankari embroidery on premium lawn", collection: "unstitched" },
  { id: 'unstitched-3', name: "Daily Wear Cotton Comfort", image: img3, price: "Rs. 3,800", category: "daily-wear", fabric: "CAMBRIC", detail: "PRINTED", size: "UNSTITCH", color: "NAVY", designCode: "UNS-003", workDetails: "Contemporary digital print on soft cambric", collection: "unstitched" },
  { id: 'unstitched-4', name: "Premium Lawn Design", image: img4, price: "Rs. 7,500", category: "premium", fabric: "LAWN", detail: "DIGITAL PRINT", size: "UNSTITCH", color: "RUST", designCode: "UNS-004", workDetails: "Premium digital print with traditional motifs", collection: "unstitched" },
  { id: 'unstitched-5', name: "Luxe Atelier Special", image: img5, price: "Rs. 12,000", category: "luxe", fabric: "CHIFFON", detail: "EMBROIDERED", size: "UNSTITCH", color: "GOLD", designCode: "UNS-005", workDetails: "Luxury embroidered chiffon with beadwork", collection: "unstitched" },
  { id: 'unstitched-6', name: "Wedding Collection Elite", image: img6, price: "Rs. 15,500", category: "wedding", fabric: "FANCY YARN", detail: "EMBROIDERED", size: "UNSTITCH", color: "SILVER", designCode: "UNS-006", workDetails: "Exquisite wedding embroidery with zari", collection: "unstitched" },
  { id: 'unstitched-7', name: "Dobby Lawn Casual", image: img7, price: "Rs. 4,200", category: "daily-wear", fabric: "DOBBY LAWN", detail: "PRINTED", size: "UNSTITCH", color: "TEAL", designCode: "UNS-007", workDetails: "Contemporary dobby pattern", collection: "unstitched" },
  { id: 'unstitched-8', name: "Khaddar Winter Collection", image: img8, price: "Rs. 5,800", category: "premium", fabric: "KHADDAR", detail: "DIGITAL PRINT", size: "UNSTITCH", color: "MAROON", designCode: "UNS-008", workDetails: "Premium winter khaddar fabric", collection: "unstitched" },
  { id: 'unstitched-9', name: "Linen Summer Breeze", image: img9, price: "Rs. 6,800", category: "luxe", fabric: "LINEN", detail: "PRINTED", size: "UNSTITCH", color: "BEIGE", designCode: "UNS-009", workDetails: "Breathable linen summer collection", collection: "unstitched" },
  { id: 'unstitched-10', name: "Cambric Comfort", image: img10, price: "Rs. 3,200", category: "daily-wear", fabric: "Cambric", detail: "DIGITAL PRINT", size: "UNSTITCH", color: "WHITE", designCode: "UNS-010", workDetails: "Soft cambric comfort wear", collection: "unstitched" },
  { id: 'unstitched-11', name: "Mahiri Premium Embroidered", image: img11, price: "Rs. 9,200", category: "mahiri", fabric: "LAWN", detail: "EMBROIDERED", size: "UNSTITCH", color: "PEACH", designCode: "UNS-011", workDetails: "Premium mahiri with intricate details", collection: "unstitched" },
  { id: 'unstitched-12', name: "Chikankari Delicate Work", image: img12, price: "Rs. 7,800", category: "chikankari", fabric: "LAWN", detail: "EMBROIDERED", size: "UNSTITCH", color: "MINT", designCode: "UNS-012", workDetails: "Delicate chikankari handwork", collection: "unstitched" },
  { id: 'unstitched-13', name: "Daily Essential Cotton", image: img13, price: "Rs. 2,900", category: "daily-wear", fabric: "CAMBRIC", detail: "PRINTED", size: "UNSTITCH", color: "GREY", designCode: "UNS-013", workDetails: "Essential daily wear cotton", collection: "unstitched" },
  { id: 'unstitched-14', name: "Premium Luxury Lawn", image: img14, price: "Rs. 8,200", category: "premium", fabric: "LAWN", detail: "DIGITAL PRINT", size: "UNSTITCH", color: "PLUM", designCode: "UNS-014", workDetails: "Premium luxury lawn fabric", collection: "unstitched" },
  { id: 'unstitched-15', name: "Luxe Designer Collection", image: img15, price: "Rs. 13,500", category: "luxe", fabric: "CHIFFON", detail: "EMBROIDERED", size: "UNSTITCH", color: "EMERALD", designCode: "UNS-015", workDetails: "Designer collection embroidery", collection: "unstitched" },
  { id: 'unstitched-16', name: "Wedding Bridal Special", image: img16, price: "Rs. 18,000", category: "wedding", fabric: "FANCY YARN", detail: "EMBROIDERED", size: "UNSTITCH", color: "WHITE-GOLD", designCode: "UNS-016", workDetails: "Bridal special with premium embroidery", collection: "unstitched" },
  { id: 'unstitched-17', name: "Casual Dobby Lawn", image: img17, price: "Rs. 4,800", category: "daily-wear", fabric: "DOBBY LAWN", detail: "PRINTED", size: "UNSTITCH", color: "SAGE", designCode: "UNS-017", workDetails: "Casual dobby pattern", collection: "unstitched" },
  { id: 'unstitched-18', name: "Winter Khaddar Warmth", image: img18, price: "Rs. 6,200", category: "premium", fabric: "KHADDAR", detail: "DIGITAL PRINT", size: "UNSTITCH", color: "BROWN", designCode: "UNS-018", workDetails: "Winter warmth khaddar", collection: "unstitched" },
  { id: 'unstitched-19', name: "Luxe Linen Elegance", image: img19, price: "Rs. 7,400", category: "luxe", fabric: "LINEN", detail: "PRINTED", size: "UNSTITCH", color: "TAN", designCode: "UNS-019", workDetails: "Elegant linen luxury", collection: "unstitched" },
  { id: 'unstitched-20', name: "Mahiri Royal Collection", image: img20, price: "Rs. 10,500", category: "mahiri", fabric: "LAWN", detail: "EMBROIDERED", size: "UNSTITCH", color: "WINE", designCode: "UNS-020", workDetails: "Royal mahiri collection", collection: "unstitched" },
  { id: 'unstitched-21', name: "Chikankari Heritage", image: img21, price: "Rs. 8,800", category: "chikankari", fabric: "LAWN", detail: "EMBROIDERED", size: "UNSTITCH", color: "IVORY", designCode: "UNS-021", workDetails: "Heritage chikankari", collection: "unstitched" },
  { id: 'unstitched-22', name: "Daily Comfort Wear", image: img22, price: "Rs. 3,500", category: "daily-wear", fabric: "Cambric", detail: "DIGITAL PRINT", size: "UNSTITCH", color: "SLATE", designCode: "UNS-022", workDetails: "Comfort daily wear", collection: "unstitched" },
  { id: 'unstitched-23', name: "Premium Designer Lawn", image: img23, price: "Rs. 9,800", category: "premium", fabric: "LAWN", detail: "DIGITAL PRINT", size: "UNSTITCH", color: "MAUVE", designCode: "UNS-023", workDetails: "Premium designer lawn", collection: "unstitched" },
  { id: 'unstitched-24', name: "Luxe Atelier Masterpiece", image: img24, price: "Rs. 16,200", category: "luxe", fabric: "CHIFFON", detail: "EMBROIDERED", size: "UNSTITCH", color: "BLUSH", designCode: "UNS-024", workDetails: "Masterpiece embroidery", collection: "unstitched" },
  { id: 'unstitched-25', name: "Wedding Grand Collection", image: img25, price: "Rs. 22,000", category: "wedding", fabric: "FANCY YARN", detail: "EMBROIDERED", size: "UNSTITCH", color: "GOLD-RED", designCode: "UNS-025", workDetails: "Grand wedding collection", collection: "unstitched" },
  { id: 'unstitched-26', name: "Signature Lawn Design", image: img26, price: "Rs. 11,500", category: "premium", fabric: "LAWN", detail: "DIGITAL PRINT", size: "UNSTITCH", color: "OLIVE", designCode: "UNS-026", workDetails: "Signature design lawn", collection: "unstitched" },
  { id: 'unstitched-27', name: "Elite Wedding Series", image: img27, price: "Rs. 19,800", category: "wedding", fabric: "FANCY YARN", detail: "EMBROIDERED", size: "UNSTITCH", color: "CHAMPAGNE", designCode: "UNS-027", workDetails: "Elite wedding series", collection: "unstitched" },
];

// Sub-category tabs configuration
const subCategories = [
  { id: 'all', label: 'VIEW ALL', route: '/unstitched', active: true },
  { id: 'mahiri', label: 'MAHIRI EMBROIDERED', route: '/unstitched/mahiri-embroidered' },
  { id: 'chikankari', label: 'CHIKANKARI LAWN', route: '/unstitched/chikankari-lawn' },
  { id: 'daily-wear', label: 'DAILY WEAR', route: '/unstitched/daily-wear' },
  { id: 'premium', label: 'PREMIUM LAWN', route: '/unstitched/premium-lawn' },
  { id: 'luxe', label: 'LUXE ATELIER', route: '/unstitched/luxe-atelier' },
  { id: 'wedding', label: 'WEDDING COLLECTION', route: '/unstitched/wedding-collection' }
];

// Filter options
const fabricOptions = [
  { name: 'CAMBRIC', count: 4 },
  { name: 'CHIFFON', count: 3 },
  { name: 'Cambric', count: 2 },
  { name: 'DOBBY LAWN', count: 2 },
  { name: 'FANCY YARN', count: 4 },
  { name: 'KHADDAR', count: 2 },
  { name: 'LAWN', count: 8 },
  { name: 'LINEN', count: 2 }
];

const productDetailOptions = [
  { name: 'DIGITAL PRINT', count: 8 },
  { name: 'EMBROIDERED', count: 13 },
  { name: 'PRINTED', count: 6 }
];

const sizeOptions = [
  { name: 'UNSTITCH', count: 27 }
];

const UnstitchedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    sizes: [],
    fabrics: [],
    details: []
  });

  // Handle product card click
  const handleProductClick = (product) => {
    navigate(`/unstitched/product/${product.id}`);
  };

  // Determine active category from route
  const getActiveCategory = () => {
    const path = location.pathname;
    if (path.includes('mahiri')) return 'mahiri';
    if (path.includes('chikankari')) return 'chikankari';
    if (path.includes('daily-wear')) return 'daily-wear';
    if (path.includes('premium')) return 'premium';
    if (path.includes('luxe')) return 'luxe';
    if (path.includes('wedding')) return 'wedding';
    return 'all';
  };

  const activeCategory = getActiveCategory();

  // Filter products based on active category and selected filters
  const filteredProducts = unstitchedData.filter(product => {
    const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
    const sizeMatch = selectedFilters.sizes.length === 0 || selectedFilters.sizes.includes(product.size);
    const fabricMatch = selectedFilters.fabrics.length === 0 || selectedFilters.fabrics.includes(product.fabric);
    const detailMatch = selectedFilters.details.length === 0 || selectedFilters.details.includes(product.detail);
    
    return categoryMatch && sizeMatch && fabricMatch && detailMatch;
  });

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="unstitched-page">
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
            <span>New Unstitched</span>
          </div>
        </div>
      </div>

      {/* Filter Button */}
      <div className="filter-section">
        <div className="container">
          <button 
            className="filter-by-btn"
            onClick={() => setFilterOpen(true)}
          >
            <svg className="filter-icon" viewBox="0 0 24 24" width="16" height="16">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Filter By
          </button>
        </div>
      </div>

      {/* Products Grid - Full Width, No Gaps */}
      <div className="products-grid-mixed">
        {(() => {
          const rows = [];
          for (let i = 0; i < filteredProducts.length; i += 3) {
            // Single card (250vh height, full width)
            const singleProduct = filteredProducts[i];
            if (singleProduct) {
              rows.push(
                <div key={`single-${singleProduct.id}`} className="grid-row single-row">
                  <div 
                    className="product-card"
                    onClick={() => handleProductClick(singleProduct)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="product-image">
                      <img src={singleProduct.image} alt={singleProduct.name} />
                      <div className="product-overlay"></div>
                      <button 
                        className="add-to-cart-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(singleProduct);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                    <div className="product-info">
                      <h3 style={{ cursor: 'pointer' }}>{singleProduct.name}</h3>
                      <p className="product-fabric">{singleProduct.fabric}</p>
                      <p className="product-price">{singleProduct.price}</p>
                    </div>
                  </div>
                </div>
              );
            }

            // Double cards (140vh height each, side by side, no gap)
            const doubleProduct1 = filteredProducts[i + 1];
            const doubleProduct2 = filteredProducts[i + 2];
            
            if (doubleProduct1 || doubleProduct2) {
              rows.push(
                <div key={`double-${i}`} className="grid-row double-row">
                  {doubleProduct1 && (
                    <div 
                      className="product-card"
                      onClick={() => handleProductClick(doubleProduct1)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="product-image">
                        <img src={doubleProduct1.image} alt={doubleProduct1.name} />
                        <div className="product-overlay"></div>
                        <button 
                          className="add-to-cart-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(doubleProduct1);
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                      <div className="product-info">
                        <h3 style={{ cursor: 'pointer' }}>{doubleProduct1.name}</h3>
                        <p className="product-fabric">{doubleProduct1.fabric}</p>
                        <p className="product-price">{doubleProduct1.price}</p>
                      </div>
                    </div>
                  )}
                  {doubleProduct2 && (
                    <div 
                      className="product-card"
                      onClick={() => handleProductClick(doubleProduct2)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="product-image">
                        <img src={doubleProduct2.image} alt={doubleProduct2.name} />
                        <div className="product-overlay"></div>
                        <button 
                          className="add-to-cart-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(doubleProduct2);
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                      <div className="product-info">
                        <h3 style={{ cursor: 'pointer' }}>{doubleProduct2.name}</h3>
                        <p className="product-fabric">{doubleProduct2.fabric}</p>
                        <p className="product-price">{doubleProduct2.price}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          }
          return rows;
        })()}

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No products match the selected filters.</p>
          </div>
        )}
      </div>

      {/* Filter Panel */}
      <UnstitchedFilterPanel
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        sizeOptions={sizeOptions}
        fabricOptions={fabricOptions}
        detailOptions={productDetailOptions}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        productCount={filteredProducts.length}
      />
    </div>
  );
};

export default UnstitchedPage;
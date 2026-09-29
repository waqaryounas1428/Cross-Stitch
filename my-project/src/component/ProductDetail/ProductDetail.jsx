import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { getProductById } from '../../data/products.js';
import { useCart } from '../../context/CartContext.jsx';

// Import detail images
import detail1 from '../../img/detail pic/m_0020_DSC09634_b9366761-bc41-4f1d-9bec-a999daf008e8_360x.webp';
import detail2 from '../../img/detail pic/Untitled-1-Recovered_0009_MTB00664_360x.webp';
import detail3 from '../../img/detail pic/Untitled-1_0002_DSC00436_360x.webp';
import detail4 from '../../img/detail pic/Untitled-1_0005_DSC00386_934e5971-40e4-4383-9eef-c9f4a975de18_360x.webp';
import detail5 from '../../img/detail pic/Untitled-1_0007_AKS04054_360x.webp';
import detail6 from '../../img/detail pic/Untitled-1_0007_DSC01085_cab2c765-9203-4fd9-abb1-255ba05d9100_360x.webp';
import detail7 from '../../img/detail pic/Untitled-1_0010_DSC02329_360x.webp';
import detail8 from '../../img/detail pic/Untitled-1_0011_DSC05329_360x.webp';
import detail9 from '../../img/detail pic/Untitled-1_0012_DSC00734_360x.webp';
import detail10 from '../../img/detail pic/Untitled-1_0016_MTB09153_360x.webp';

const allDetailImages = [detail1, detail2, detail3, detail4, detail5, detail6, detail7, detail8, detail9, detail10];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    // Get product from data
    const foundProduct = getProductById(id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImageIndex(0);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="pd-container">
        <div className="pd-not-found">
          <h1>Product not found</h1>
          <Link to="/unstitched" className="pd-back-link">Back to Unstitched</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      size: product.collection === 'ready-to-wear' ? selectedSize : 'UNSTITCH',
      quantity: quantity,
      collection: product.collection
    });
    alert(`${product.name} (Qty: ${quantity}) added to cart!`);
  };

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty >= 1) {
      setQuantity(newQty);
    }
  };

  const priceNumber = parseInt(product.price.replace(/[^0-9]/g, ''));
  const installmentPrice = Math.round(priceNumber / 3);

  return (
    <div className="pd-page">
      {/* Breadcrumb */}
      <div className="pd-breadcrumb-section">
        <div className="pd-container">
          <div className="pd-breadcrumb">
            <Link to="/">HOME</Link>
            <span className="pd-breadcrumb-sep">&gt;</span>
            <span>{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Product Detail */}
      <div className="pd-container">
        <div className="pd-main">
          {/* LEFT SIDE - GALLERY */}
          <div className="pd-gallery">
            {/* Main Image */}
            <div className="pd-main-image-wrapper">
              <img 
                src={product.image} 
                alt={product.name}
                className="pd-main-image"
              />
              {/* Prev/Next Arrows - Hidden for single image */}
              {/* Can be enabled if we add multiple images per product */}
            </div>

            {/* Thumbnails - Hidden for single image */}
            {/* Can be enabled if we add multiple images per product */}
          </div>

          {/* RIGHT SIDE - DETAILS */}
          <div className="pd-details">
            {/* Product Title */}
            <h1 className="pd-title">{product.name}</h1>

            {/* Price */}
            <div className="pd-price">{product.price}</div>

            {/* Design Code, Fabric, Color, Work */}
            <div className="pd-info-grid">
              <div className="pd-info-item">
                <span className="pd-info-label">DESIGN CODE:</span>
                <span className="pd-info-value">{product.designCode || 'N/A'}</span>
              </div>
              <div className="pd-info-item">
                <span className="pd-info-label">FABRIC:</span>
                <span className="pd-info-value">{product.fabric}</span>
              </div>
              <div className="pd-info-item">
                <span className="pd-info-label">COLOR:</span>
                <span className="pd-info-value">{product.color || 'MULTI'}</span>
              </div>
              <div className="pd-info-item">
                <span className="pd-info-label">WORK DETAILS:</span>
                <span className="pd-info-value">{product.detail}</span>
              </div>
            </div>

            {/* Size Selector - Only for Ready To Wear */}
            {product.collection === 'ready-to-wear' && (
              <div className="pd-size-selector">
                <label className="pd-size-label">SIZE:</label>
                <div className="pd-size-buttons">
                  {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                    <button
                      key={size}
                      className={`pd-size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="pd-quantity-selector">
              <label className="pd-qty-label">QUANTITY:</label>
              <div className="pd-qty-controls">
                <button 
                  className="pd-qty-btn"
                  onClick={() => handleQuantityChange(-1)}
                >
                  −
                </button>
                <span className="pd-qty-display">{quantity}</span>
                <button 
                  className="pd-qty-btn"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button 
              className="pd-add-to-cart-btn"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>

            {/* Try It On Button */}
            <button 
              className="pd-try-it-on-btn"
              onClick={() => alert('Try It On feature coming soon!')}
            >
              <svg className="pd-try-icon" viewBox="0 0 24 24" width="16" height="16">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="currentColor"/>
              </svg>
              TRY IT ON ME
            </button>

            {/* Installments Box */}
            <div className="pd-installments">
              <div className="pd-installments-header">
                <svg className="pd-installments-icon" viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span className="pd-installments-text">alif shop</span>
              </div>
              <p className="pd-installments-offer">Pay in 3 Installments of <strong>Rs {installmentPrice.toLocaleString()}</strong></p>
            </div>

            {/* TABS - NOW INSIDE DETAILS */}
            <div className="pd-tabs-section">
              <div className="pd-tabs-header">
                <button
                  className={`pd-tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                  onClick={() => setActiveTab('description')}
                >
                  DESCRIPTION
                </button>
                <button
                  className={`pd-tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                  onClick={() => setActiveTab('features')}
                >
                  FEATURES
                </button>
                <button
                  className={`pd-tab-btn ${activeTab === 'care' ? 'active' : ''}`}
                  onClick={() => setActiveTab('care')}
                >
                  COMPOSITION & CARE
                </button>
              </div>

              {/* Tab Content */}
              <div className="pd-tab-content">
                {activeTab === 'description' && (
                  <div className="pd-tab-panel active">
                    <h3>SHIRT</h3>
                    <p>Premium quality {product.collection === 'unstitched' ? 'unstitched' : 'ready-to-wear'} shirt piece with intricate detailing. Perfect for your style and body measurements.</p>
                    
                    <h3>DUPATTA</h3>
                    <p>Complementing dupatta featuring coordinated design and embellishments to complete your ensemble.</p>
                    
                    <h3>TROUSER</h3>
                    <p>Coordinating trouser piece with elegant finishing, ready for your preference.</p>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="pd-tab-panel active">
                    <h3>KEY FEATURES</h3>
                    <ul className="pd-features-list">
                      <li>High-quality premium {product.fabric} fabric</li>
                      <li>Intricate traditional craftsmanship</li>
                      <li>{product.collection === 'unstitched' ? 'Perfect for custom tailoring' : 'Ready to wear'}</li>
                      <li>Comfortable and breathable material</li>
                      <li>Versatile design for multiple occasions</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className="pd-tab-panel active">
                    <h3>COMPOSITION</h3>
                    <p>100% Natural Fabric - {product.fabric}</p>
                    
                    <h3>CARE INSTRUCTIONS</h3>
                    <ul className="pd-care-list">
                      <li>Dry clean or hand wash recommended</li>
                      <li>Use cold water and mild detergent</li>
                      <li>Iron on medium heat</li>
                      <li>Store in cool, dry place</li>
                      <li>Avoid direct sunlight for extended periods</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* DETAIL PICTURES GALLERY */}
            <div className="pd-detail-pics-gallery">
              <div className="pd-detail-pics-header">
              </div>
              <div className="pd-detail-pics-grid">
                {allDetailImages.map((img, idx) => (
                  <div key={idx} className="pd-detail-pic-card">
                    <div className="pd-detail-pic-image-wrapper">
                      <img 
                        src={img} 
                        alt={`Detail Picture ${idx + 1}`}
                        className="pd-detail-pic-img"
                      />
                      <div className="pd-detail-pic-overlay"></div>
                      <button 
                        className="pd-detail-add-to-cart-btn"
                        onClick={() => handleAddToCart()}
                      >
                        Add to Cart
                      </button>
                    </div>
                    <div className="pd-detail-pic-info">
                      <h3>{product.name}</h3>
                      <p className="pd-detail-pic-fabric">{product.fabric}</p>
                      <p className="pd-detail-pic-price">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

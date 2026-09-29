import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footwear.css';
import '../NormalGrid/NormalGrid.css';
import { useCart } from '../../context/CartContext.jsx';

// Dynamically import all footwear images
const footwearImages = import.meta.glob(
  '../../img/FootWear/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, import: 'default' }
);
const footwearImageList = Object.values(footwearImages);

// Build footwear data array
const footwearData = footwearImageList.map((image, index) => ({
  id: `footwear-${index}`,
  name: `Footwear Item ${index + 1}`,
  image: image,
  price: `Rs. ${3500 + index * 500}`,
  category: 'Footwear'
}));

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
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

const FootwearPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(footwearData);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    setFilteredProducts(footwearData);
  }, []);

  return (
    <div className="footwear-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb-section">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span>Footwear</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="footwear-header">
          <h1 className="footwear-title">Footwear Collection</h1>
        </div>

        {/* Products Grid - UNIFORM GRID (NO PATTERN GRID) */}
        <div className="products-grid-uniform">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="no-products">
              <p>No footwear items available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FootwearPage;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, getTotalItems } = useCart();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'Pakistan',
    postalCode: '',
    phone: '',
    newsletter: false,
  });

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-empty">
            <h1>Your Cart is Empty</h1>
            <p>Please add items to your cart before proceeding to checkout.</p>
            <Link to="/ready-to-wear" className="back-shopping-btn">
              Back to Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Checkout data:', formData);
    navigate('/payment');
  };

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const shippingCost = 200;
  const grandTotal = totalPrice + shippingCost;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Breadcrumb */}
        <div className="checkout-breadcrumb">
          <Link to="/cart">Cart</Link>
          <span> &gt; </span>
          <span>Information</span>
          <span> &gt; </span>
          <span>Shipping</span>
          <span> &gt; </span>
          <span>Payment</span>
        </div>

        <div className="checkout-content">
          {/* Left Side - Checkout Form */}
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              {/* Contact Section */}
              <div className="form-section">
                <h2>Contact</h2>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group checkbox">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="newsletter">Email me with news and offers</label>
                </div>
              </div>

              {/* Shipping Address Section */}
              <div className="form-section">
                <h2>Shipping Address</h2>

                <div className="form-group">
                  <label htmlFor="country">Country/Region</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="Other">Other Countries</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address or P.O. box"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="apartment">Apartment, suite, etc. (optional)</label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    placeholder="Apartment or suite (optional)"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="postalCode">Postal Code (optional)</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="Postal code"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="checkout-submit-btn">
                Continue to Shipping
              </button>

              <Link to="/cart" className="checkout-back-btn">
                Back to Cart
              </Link>
            </form>
          </div>

          {/* Right Side - Order Summary */}
          <div className="checkout-summary-section">
            <div className="order-summary">
              <h2>Order Summary</h2>

              {/* Order Items */}
              <div className="order-items">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="order-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                      {item.quantity > 1 && (
                        <span className="item-quantity-badge">{item.quantity}</span>
                      )}
                    </div>

                    <div className="item-info">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-size">Size: {item.size}</p>
                      <p className="item-price">
                        Rs. {item.price.toLocaleString()}
                        {item.quantity > 1 && (
                          <span className="item-qty-price">
                            {' '} x {item.quantity} = Rs. {(item.price * item.quantity).toLocaleString()}
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="item-subtotal">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Details */}
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal ({totalItems} items):</span>
                  <span>Rs. {totalPrice.toLocaleString()}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>Rs. {shippingCost.toLocaleString()}</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-total">
                  <span>Total:</span>
                  <span>Rs. {grandTotal.toLocaleString()}</span>
                </div>

                <p className="shipping-note">
                  Note: For local orders, you may receive multiple packages for a single order without any extra shipping charges. You may exchange products within 30 days after the purchase. Nationwide orders will be delivered within 3 to 5 working days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import './PaymentPage.css';

const PaymentPage = () => {
  const { cart, getTotalPrice, getTotalItems } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [billingAddress, setBillingAddress] = useState({
    sameAsShipping: true,
    country: 'Pakistan',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
  });

  if (cart.length === 0) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="payment-empty">
            <h1>Your Cart is Empty</h1>
            <p>Please add items to your cart before proceeding to payment.</p>
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
    setBillingAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment data:', { paymentMethod, billingAddress });
    alert('Payment processed! Order confirmed.');
  };

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const shippingCost = 200;
  const grandTotal = totalPrice + shippingCost;

  return (
    <div className="payment-page">
      <div className="payment-container">
        {/* Breadcrumb */}
        <div className="payment-breadcrumb">
          <Link to="/cart">Cart</Link>
          <span> &gt; </span>
          <Link to="/checkout">Information</Link>
          <span> &gt; </span>
          <span>Shipping</span>
          <span> &gt; </span>
          <span className="active">Payment</span>
        </div>

        <div className="payment-content">
          {/* Left Side - Payment Form */}
          <div className="payment-form-section">
            <form onSubmit={handleSubmit} className="payment-form">
              {/* Payment Method Section */}
              <div className="form-section">
                <h2>Payment</h2>
                <p className="payment-info">All transactions are secure and encrypted.</p>

                {/* Cash on Delivery */}
                <div className="payment-method-group">
                  <label className="payment-method-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={handlePaymentMethodChange}
                    />
                    <span className="method-text">Cash on Delivery (COD)</span>
                  </label>
                  <p className="method-info">ONLY FOR DELIVERIES IN PAKISTAN</p>
                </div>

                {/* PAYFAST */}
                <div className="payment-method-group">
                  <label className="payment-method-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="payfast"
                      checked={paymentMethod === 'payfast'}
                      onChange={handlePaymentMethodChange}
                    />
                    <span className="method-text">PAYFAST (Pay via Debit/Credit/Wallet/Bank Account)</span>
                  </label>
                  <div className="payment-icons">
                    <img src="https://via.placeholder.com/30x20?text=VISA" alt="Visa" />
                    <img src="https://via.placeholder.com/30x20?text=MC" alt="Mastercard" />
                    <img src="https://via.placeholder.com/30x20?text=JCB" alt="JCB" />
                  </div>
                </div>

                {/* Alishop Installments */}
                <div className="payment-method-group">
                  <label className="payment-method-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="alishop"
                      checked={paymentMethod === 'alishop'}
                      onChange={handlePaymentMethodChange}
                    />
                    <span className="method-text">Alishop - Pay in 3 Instalments</span>
                  </label>
                  <div className="payment-icons">
                    <img src="https://via.placeholder.com/30x20?text=VISA" alt="Visa" />
                    <img src="https://via.placeholder.com/30x20?text=MC" alt="Mastercard" />
                  </div>
                </div>
              </div>

              {/* Billing Address Section */}
              <div className="form-section">
                <h2>Billing address</h2>
                <p className="address-info">Select the address that matches your card or payment method.</p>

                <div className="billing-address-options">
                  <label className="address-option-label">
                    <input
                      type="radio"
                      name="sameAsShipping"
                      checked={billingAddress.sameAsShipping}
                      onChange={() => setBillingAddress(prev => ({ ...prev, sameAsShipping: true }))}
                    />
                    <span>Same as shipping address</span>
                  </label>

                  <label className="address-option-label">
                    <input
                      type="radio"
                      name="sameAsShipping"
                      checked={!billingAddress.sameAsShipping}
                      onChange={() => setBillingAddress(prev => ({ ...prev, sameAsShipping: false }))}
                    />
                    <span>Use a different billing address</span>
                  </label>
                </div>

                {!billingAddress.sameAsShipping && (
                  <div className="billing-form-group">
                    <div className="form-group">
                      <label htmlFor="country">Country/Region</label>
                      <select
                        id="country"
                        name="country"
                        value={billingAddress.country}
                        onChange={handleInputChange}
                      >
                        <option value="Pakistan">Pakistan</option>
                        <option value="Other">Other Countries</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={billingAddress.firstName}
                          onChange={handleInputChange}
                          placeholder="First name"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Last name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={billingAddress.lastName}
                          onChange={handleInputChange}
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={billingAddress.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={billingAddress.city}
                          onChange={handleInputChange}
                          placeholder="City"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="postalCode">Postal code (optional)</label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={billingAddress.postalCode}
                          onChange={handleInputChange}
                          placeholder="Postal code"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className="payment-submit-btn">
                Complete Payment
              </button>

              <Link to="/checkout" className="payment-back-btn">
                Back to Shipping
              </Link>
            </form>
          </div>

          {/* Right Side - Order Summary */}
          <div className="payment-summary-section">
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

              {/* Discount Code */}
              <div className="discount-section">
                <input
                  type="text"
                  className="discount-input"
                  placeholder="Discount code"
                />
                <button type="button" className="discount-btn">Apply</button>
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

export default PaymentPage;

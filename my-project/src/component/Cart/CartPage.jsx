import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-empty">
            <h1>Your Cart is Empty</h1>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/ready-to-wear" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">Rs. {item.price.toLocaleString()}</p>
                  <p className="cart-item-size">Size: {item.size}</p>
                </div>

                <div className="cart-item-quantity">
                  <label>Qty:</label>
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-subtotal">
                  <p>Rs. {(item.price * item.quantity).toLocaleString()}</p>
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id, item.size)}
                  title="Remove from cart"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items ({totalItems}):</span>
              <span>Rs. {totalPrice.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span>Shipping:</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total:</span>
              <span>Rs. {totalPrice.toLocaleString()}</span>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>

            <Link to="/ready-to-wear" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

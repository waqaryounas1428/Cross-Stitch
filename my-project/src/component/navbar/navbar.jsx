import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useCart } from "../../context/CartContext.jsx";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const { getTotalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Check if we're on the homepage
  const isHomePage = location.pathname === '/';

  // Load all products for search (mock data - in real app, this would come from database)
  useEffect(() => {
    // This would ideally be loaded from a global state or API
    // For now we're using a lazy loading approach
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    // Only add scroll listener on homepage
    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (isHomePage) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isHomePage]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    // Navigate to search results page
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [searchOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [searchOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Determine navbar classes based on current route
  const getNavbarClasses = () => {
    let classes = "navbar";

    if (isHomePage) {
      if (scrolled) {
        classes += " navbar-scrolled";
      }
    } else {
      classes += " navbar-white-always";
    }

    return classes;
  };

  const cartCount = getTotalItems();

  return (
    <>
      <header className={getNavbarClasses()}>
        <div className="nav-left">
          <div className="menu">
            <button
              className="menu-button"
              onClick={toggleMenu}
            >
              ☰
            </button>

            {/* MENU LIST */}
            {menuOpen && (
              <div className="menu-dropdown">
                <Link to="/unstitched">
                  Unstitched Cotton Satin
                </Link>

                <a href="g">
                  Wedding Festive
                </a>

                <Link to="/unstitched">
                  Unstitched
                </Link>

                <Link to="/ready-to-wear">
                  Ready To Wear
                </Link>

                <a href="">
                  New Arrivals
                </a>

                <Link
                  to="/accessories"
                  className="everything-link"
                >
                  Accessories
                </Link>

                <Link to="/fragrances">
                  Fragrances
                </Link>

                <a href="">
                  Sale
                </a>

                <Link to="/lookbook">
                  LookBook
                </Link>

                <a href="/login">
                  Login
                </a>

                <a href="/contact-us">
                  Contact Us
                </a>

                <a href="/store-locations">
                  Stores
                </a>
              </div>
            )}
          </div>

          {/* LOGO */}
          <Link to="/" className="logo">
            CROSS STITCH
          </Link>
        </div>

        {/* CENTER NAV - MOVED TO LEFT */}
        <nav className="left-nav">
          <Link to="/unstitched">
            UNSTITCHED
          </Link>

          <Link to="/ready-to-wear">
            READY TO WEAR
          </Link>

          <Link to="/fragrances">
            FRAGRANCES
          </Link>
        </nav>

        {/* RIGHT - SEARCH & CART */}
        <div className="nav-right">
          {/* SEARCH ICON */}
          <div className="search-container" ref={searchRef}>
            <span
              className="search-icon"
              onClick={() => setSearchOpen(!searchOpen)}
              title="Search products"
            >
              ⌕
            </span>

            {/* SEARCH INPUT */}
            {searchOpen && (
              <div className="search-dropdown">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by name, category..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoFocus
                />
                <span
                  className="search-close"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                >
                  ✕
                </span>
              </div>
            )}
          </div>

          {/* CART ICON */}
          <Link to="/cart" className="cart-icon-wrapper" title="View cart">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </header>
    </>
  );
}

export default Navbar;
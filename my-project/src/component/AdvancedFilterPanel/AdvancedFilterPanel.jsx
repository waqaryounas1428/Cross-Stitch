import React, { useState, useRef, useEffect } from 'react';
import './AdvancedFilterPanel.css';

// Filter data with normalized values
const FILTER_DATA = {
  sizes: [
    { label: 'XS', count: 225 },
    { label: 'S', count: 225 },
    { label: 'M', count: 225 },
    { label: 'L', count: 225 },
    { label: 'XL', count: 12 }
  ],
  fabrics: [
    { label: 'Blended Lawn', count: 1 },
    { label: 'CAMBRIC', count: 59 },
    { label: 'CHIFFON', count: 9 },
    { label: 'COTTON', count: 1 },
    { label: 'DOBBY', count: 4 },
    { label: 'KARANDI', count: 4 },
    { label: 'KHADDAR', count: 7 },
    { label: 'LAWN', count: 26 },
    { label: 'LINEN', count: 12 },
    { label: 'MARINA', count: 7 },
    { label: 'NET', count: 12 },
    { label: 'ORGANZA', count: 25 },
    { label: 'RAW SILK', count: 9 },
    { label: 'SILK', count: 44 },
    { label: 'SLUB KHADDAR', count: 2 },
    { label: 'TISSUE', count: 3 },
    { label: 'VELVET', count: 1 }
  ],
  productDetails: [
    { label: 'DIGITAL PRINT', count: 3 },
    { label: 'DYED', count: 12 },
    { label: 'EMBROIDERED', count: 158 },
    { label: 'PRINTED', count: 21 }
  ],
  colors: [
    { label: 'BEIGE', count: 4 },
    { label: 'BLACK', count: 17 },
    { label: 'BLUE', count: 26 },
    { label: 'BROWN', count: 11 },
    { label: 'GOLD', count: 2 },
    { label: 'GRAY', count: 5 },
    { label: 'GREEN', count: 45 },
    { label: 'GREY', count: 9 },
    { label: 'LILAC', count: 2 },
    { label: 'MUSTARD', count: 1 },
    { label: 'OFF WHITE', count: 3 },
    { label: 'OFFWHITE', count: 3 },
    { label: 'ORANGE', count: 4 },
    { label: 'PEACH', count: 9 },
    { label: 'PINK', count: 21 },
    { label: 'PURPLE', count: 20 },
    { label: 'RAVEN', count: 2 },
    { label: 'RED', count: 8 },
    { label: 'TEAL', count: 5 },
    { label: 'WHITE', count: 24 },
    { label: 'YELLOW', count: 8 }
  ]
};

const CollapsibleSection = ({
  title,
  isOpen,
  onToggle,
  children,
  isScrollable = false
}) => {
  return (
    <div className="filter-section-collapsible">
      <button
        className="filter-section-header"
        onClick={onToggle}
      >
        <span className="filter-section-title">{title}</span>
        <svg
          className={`filter-chevron ${isOpen ? 'open' : ''}`}
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className={`filter-section-content ${isScrollable ? 'scrollable' : ''}`}>
          {children}
        </div>
      )}
    </div>
  );
};

const CheckboxGroup = ({ options, selected, onChange }) => {
  return (
    <div className="filter-options">
      {options.map(option => (
        <label key={option.label} className="filter-option">
          <input
            type="checkbox"
            checked={selected.includes(option.label)}
            onChange={() => onChange(option.label)}
          />
          <span className="filter-label">{option.label}</span>
          <span className="filter-count">({option.count})</span>
        </label>
      ))}
    </div>
  );
};

const PriceRangeFilter = ({ minPrice, maxPrice, onChange }) => {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setLocalMin(value);
    onChange({ min: value, max: localMax });
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setLocalMax(value);
    onChange({ min: localMin, max: value });
  };

  const handleSliderMinChange = (e) => {
    const value = parseInt(e.target.value);
    if (value <= localMax) {
      setLocalMin(value);
      onChange({ min: value, max: localMax });
    }
  };

  const handleSliderMaxChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= localMin) {
      setLocalMax(value);
      onChange({ min: localMin, max: value });
    }
  };

  return (
    <div className="price-range-filter">
      {/* Numeric Inputs */}
      <div className="price-inputs">
        <div className="price-input-group">
          <label>Min</label>
          <input
            type="number"
            value={localMin}
            onChange={handleMinChange}
            className="price-input"
            placeholder="0"
          />
        </div>
        <span className="price-separator">-</span>
        <div className="price-input-group">
          <label>Max</label>
          <input
            type="number"
            value={localMax}
            onChange={handleMaxChange}
            className="price-input"
            placeholder="0"
          />
        </div>
      </div>

      {/* Dual Thumb Slider */}
      <div className="price-slider-container">
        <input
          type="range"
          min="0"
          max="100000"
          value={localMin}
          onChange={handleSliderMinChange}
          className="price-slider price-slider-min"
        />
        <input
          type="range"
          min="0"
          max="100000"
          value={localMax}
          onChange={handleSliderMaxChange}
          className="price-slider price-slider-max"
        />
        <div className="price-track"></div>
      </div>
    </div>
  );
};

const AdvancedFilterPanel = ({
  isOpen,
  onClose,
  selectedFilters,
  onFilterChange,
  productCount,
  maxPrice = 100000
}) => {
  const panelRef = useRef(null);

  // Collapsible state
  const [expandedSections, setExpandedSections] = useState({
    sizes: true,
    fabrics: true,
    productDetails: true,
    colors: true,
    price: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  const handleSizeChange = (size) => {
    const updated = selectedFilters.sizes.includes(size)
      ? selectedFilters.sizes.filter(s => s !== size)
      : [...selectedFilters.sizes, size];
    onFilterChange('sizes', updated);
  };

  const handleFabricChange = (fabric) => {
    const updated = selectedFilters.fabrics.includes(fabric)
      ? selectedFilters.fabrics.filter(f => f !== fabric)
      : [...selectedFilters.fabrics, fabric];
    onFilterChange('fabrics', updated);
  };

  const handleProductDetailChange = (detail) => {
    const updated = selectedFilters.productDetails.includes(detail)
      ? selectedFilters.productDetails.filter(d => d !== detail)
      : [...selectedFilters.productDetails, detail];
    onFilterChange('productDetails', updated);
  };

  const handleColorChange = (color) => {
    const updated = selectedFilters.colors.includes(color)
      ? selectedFilters.colors.filter(c => c !== color)
      : [...selectedFilters.colors, color];
    onFilterChange('colors', updated);
  };

  const handlePriceChange = (range) => {
    onFilterChange('price', range);
  };

  const handleClearAll = () => {
    onFilterChange('clear');
  };

  if (!isOpen) return null;

  return (
    <div className="filter-panel-dropdown-advanced" ref={panelRef}>
      {/* Header */}
      <div className="filter-header-advanced">
        <h2>Filter</h2>
        <button className="filter-close-btn" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Filter Content */}
      <div className="filter-content-advanced">
        {/* Size Section */}
        <CollapsibleSection
          title="Size"
          isOpen={expandedSections.sizes}
          onToggle={() => toggleSection('sizes')}
        >
          <CheckboxGroup
            options={FILTER_DATA.sizes}
            selected={selectedFilters.sizes}
            onChange={handleSizeChange}
          />
        </CollapsibleSection>

        {/* Fabric Section */}
        <CollapsibleSection
          title="Fabric"
          isOpen={expandedSections.fabrics}
          onToggle={() => toggleSection('fabrics')}
          isScrollable
        >
          <CheckboxGroup
            options={FILTER_DATA.fabrics}
            selected={selectedFilters.fabrics}
            onChange={handleFabricChange}
          />
        </CollapsibleSection>

        {/* Product Detail Section */}
        <CollapsibleSection
          title="Product Detail"
          isOpen={expandedSections.productDetails}
          onToggle={() => toggleSection('productDetails')}
        >
          <CheckboxGroup
            options={FILTER_DATA.productDetails}
            selected={selectedFilters.productDetails}
            onChange={handleProductDetailChange}
          />
        </CollapsibleSection>

        {/* Color Section */}
        <CollapsibleSection
          title="Color"
          isOpen={expandedSections.colors}
          onToggle={() => toggleSection('colors')}
          isScrollable
        >
          <CheckboxGroup
            options={FILTER_DATA.colors}
            selected={selectedFilters.colors}
            onChange={handleColorChange}
          />
        </CollapsibleSection>

        {/* Price Range Section */}
        <CollapsibleSection
          title="Price Range"
          isOpen={expandedSections.price}
          onToggle={() => toggleSection('price')}
        >
          <PriceRangeFilter
            minPrice={selectedFilters.price.min}
            maxPrice={selectedFilters.price.max}
            onChange={handlePriceChange}
          />
        </CollapsibleSection>
      </div>

      {/* Footer */}
      <div className="filter-footer-advanced">
        <button className="clear-all-btn" onClick={handleClearAll}>
          Clear All
        </button>
        <button className="view-products-btn" onClick={onClose}>
          View Products ({productCount})
        </button>
      </div>
    </div>
  );
};

export default AdvancedFilterPanel;

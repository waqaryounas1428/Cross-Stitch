import React from 'react';
import './FilterPanel.css';

const FilterPanel = ({
  isOpen,
  onClose,
  categories,
  colors,
  minPrice,
  maxPrice,
  selectedCategory,
  selectedColors,
  selectedRange,
  matchCount,
  onChange,
  onApply
}) => {
  const handleCategoryChange = (category) => {
    onChange({
      category: category,
      colors: selectedColors,
      range: selectedRange
    });
  };

  const handleColorToggle = (colorName) => {
    const newColors = selectedColors.includes(colorName)
      ? selectedColors.filter(c => c !== colorName)
      : [...selectedColors, colorName];
    
    onChange({
      category: selectedCategory,
      colors: newColors,
      range: selectedRange
    });
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    const newRange = e.target.name === 'min' 
      ? [value, selectedRange[1]]
      : [selectedRange[0], value];
    
    onChange({
      category: selectedCategory,
      colors: selectedColors,
      range: newRange
    });
  };

  if (!isOpen) return null;

  return (
    <div className="filter-overlay">
      <div className="filter-panel">
        <div className="filter-header">
          <h3>FILTER BY</h3>
          <button className="close-filter" onClick={onClose}>×</button>
        </div>

        <div className="filter-content">
          {/* Category Filter */}
          <div className="filter-section">
            <h4 className="filter-title">CATEGORY</h4>
            <div className="category-options">
              {categories.map((category) => (
                <label key={category} className="category-option">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span className="category-label">
                    {category.toUpperCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="filter-section">
            <h4 className="filter-title">COLOR</h4>
            <div className="color-options">
              {colors.map((color) => (
                <label key={color.name} className="color-option">
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color.name)}
                    onChange={() => handleColorToggle(color.name)}
                  />
                  <span className="color-label">
                    {color.name.toUpperCase()} ({color.count})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <h4 className="filter-title">PRICE RANGE</h4>
            <div className="price-range">
              <div className="price-inputs">
                <div className="price-input-group">
                  <label>Rs</label>
                  <input
                    type="number"
                    name="min"
                    value={selectedRange[0]}
                    min={minPrice}
                    max={maxPrice}
                    onChange={handlePriceChange}
                  />
                </div>
                <span className="price-separator">-</span>
                <div className="price-input-group">
                  <label>Rs</label>
                  <input
                    type="number"
                    name="max"
                    value={selectedRange[1]}
                    min={minPrice}
                    max={maxPrice}
                    onChange={handlePriceChange}
                  />
                </div>
              </div>
              
              <div className="range-slider">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={selectedRange[0]}
                  onChange={(e) => onChange({
                    category: selectedCategory,
                    colors: selectedColors,
                    range: [parseInt(e.target.value), selectedRange[1]]
                  })}
                  className="range-min"
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={selectedRange[1]}
                  onChange={(e) => onChange({
                    category: selectedCategory,
                    colors: selectedColors,
                    range: [selectedRange[0], parseInt(e.target.value)]
                  })}
                  className="range-max"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="filter-footer">
          <button className="apply-filters-btn" onClick={onApply}>
            VIEW {matchCount} PRODUCTS
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
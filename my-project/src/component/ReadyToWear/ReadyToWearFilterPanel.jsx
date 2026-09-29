import React, { useRef, useEffect } from 'react';
import './ReadyToWearFilterPanel.css';

const ReadyToWearFilterPanel = ({
  isOpen,
  onClose,
  sizeOptions,
  fabricOptions,
  colorOptions,
  selectedFilters,
  onFilterChange,
  productCount
}) => {
  const panelRef = useRef(null);

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

  if (!isOpen) return null;

  return (
    <div className="filter-panel-dropdown" ref={panelRef}>
      {/* Header */}
      <div className="filter-header">
        <h2>Filter</h2>
        <button className="filter-close-btn" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Filter Content */}
      <div className="filter-content">
        {/* Size Filter */}
        <div className="filter-group">
          <h3 className="filter-title">SIZE</h3>
          <div className="filter-options">
            {sizeOptions.map(option => (
              <label key={option.name} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.sizes.includes(option.name)}
                  onChange={() => onFilterChange('sizes', option.name)}
                />
                <span className="filter-label">{option.name}</span>
                <span className="filter-count">({option.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fabric Filter */}
        <div className="filter-group">
          <h3 className="filter-title">FABRIC</h3>
          <div className="filter-options">
            {fabricOptions.map(option => (
              <label key={option.name} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.fabrics.includes(option.name)}
                  onChange={() => onFilterChange('fabrics', option.name)}
                />
                <span className="filter-label">{option.name}</span>
                <span className="filter-count">({option.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="filter-group">
          <h3 className="filter-title">COLOR</h3>
          <div className="filter-options">
            {colorOptions.map(option => (
              <label key={option.name} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.colors.includes(option.name)}
                  onChange={() => onFilterChange('colors', option.name)}
                />
                <span className="filter-label">{option.name}</span>
                <span className="filter-count">({option.count})</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="filter-footer">
        <p className="product-count">Showing {productCount} products</p>
      </div>
    </div>
  );
};

export default ReadyToWearFilterPanel;

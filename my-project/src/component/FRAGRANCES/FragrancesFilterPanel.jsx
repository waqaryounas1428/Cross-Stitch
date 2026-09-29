import React, { useRef, useEffect } from 'react';
import './FragrancesFilterPanel.css';

const FragrancesFilterPanel = ({
  isOpen,
  onClose,
  typeOptions,
  volumeOptions,
  concentrationOptions,
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
        {/* Fragrance Type Filter */}
        <div className="filter-group">
          <h3 className="filter-title">FRAGRANCE TYPE</h3>
          <div className="filter-options">
            {typeOptions.map(option => (
              <label key={option.name} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.types.includes(option.name)}
                  onChange={() => onFilterChange('types', option.name)}
                />
                <span className="filter-label">{option.name}</span>
                <span className="filter-count">({option.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Volume Filter */}
        <div className="filter-group">
          <h3 className="filter-title">VOLUME</h3>
          <div className="filter-options">
            {volumeOptions.map(option => (
              <label key={option.name} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.volumes.includes(option.name)}
                  onChange={() => onFilterChange('volumes', option.name)}
                />
                <span className="filter-label">{option.name}</span>
                <span className="filter-count">({option.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Concentration Filter */}
        <div className="filter-group">
          <h3 className="filter-title">CONCENTRATION</h3>
          <div className="filter-options">
            {concentrationOptions.map(option => (
              <label key={option.name} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.concentrations.includes(option.name)}
                  onChange={() => onFilterChange('concentrations', option.name)}
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

export default FragrancesFilterPanel;

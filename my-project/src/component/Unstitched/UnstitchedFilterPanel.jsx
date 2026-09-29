import React, { useState } from 'react';
import './UnstitchedFilterPanel.css';

const UnstitchedFilterPanel = ({
  isOpen,
  onClose,
  sizeOptions,
  fabricOptions,
  detailOptions,
  selectedFilters,
  onFilterChange,
  productCount
}) => {
  const [expandedSections, setExpandedSections] = useState({
    size: true,
    fabric: true,
    detail: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterToggle = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  if (!isOpen) return null;

  return (
    <div className="unstitched-filter-overlay">
      <div className="unstitched-filter-panel">
        <div className="filter-header">
          <h3>FILTER BY</h3>
          <button className="close-filter" onClick={onClose}>×</button>
        </div>

        <div className="filter-content">
          {/* Size Filter */}
          <div className="filter-section">
            <div className="filter-section-header" onClick={() => toggleSection('size')}>
              <h4 className="filter-title">SIZE</h4>
              <span className="expand-icon">{expandedSections.size ? '▲' : '▼'}</span>
            </div>
            {expandedSections.size && (
              <div className="filter-options">
                {sizeOptions.map((size) => (
                  <label key={size.name} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedFilters.sizes.includes(size.name)}
                      onChange={() => handleFilterToggle('sizes', size.name)}
                    />
                    <span className="filter-label">
                      {size.name} ({size.count})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Fabric Filter */}
          <div className="filter-section">
            <div className="filter-section-header" onClick={() => toggleSection('fabric')}>
              <h4 className="filter-title">FABRIC</h4>
              <span className="expand-icon">{expandedSections.fabric ? '▲' : '▼'}</span>
            </div>
            {expandedSections.fabric && (
              <div className="filter-options scrollable">
                {fabricOptions.map((fabric) => (
                  <label key={fabric.name} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedFilters.fabrics.includes(fabric.name)}
                      onChange={() => handleFilterToggle('fabrics', fabric.name)}
                    />
                    <span className="filter-label">
                      {fabric.name} ({fabric.count})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Product Detail Filter */}
          <div className="filter-section">
            <div className="filter-section-header" onClick={() => toggleSection('detail')}>
              <h4 className="filter-title">PRODUCT DETAIL</h4>
              <span className="expand-icon">{expandedSections.detail ? '▲' : '▼'}</span>
            </div>
            {expandedSections.detail && (
              <div className="filter-options">
                {detailOptions.map((detail) => (
                  <label key={detail.name} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedFilters.details.includes(detail.name)}
                      onChange={() => handleFilterToggle('details', detail.name)}
                    />
                    <span className="filter-label">
                      {detail.name} ({detail.count})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Apply Button */}
        <div className="filter-footer">
          <button className="view-products-btn" onClick={onClose}>
            VIEW {productCount} PRODUCTS
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnstitchedFilterPanel;
import React, { useState } from 'react';
import './PatternGrid.css';

/**
 * PatternGrid Component
 * Renders products in an alternating pattern: 1 full-width → 2 side-by-side → 1 full-width → repeat
 * 
 * Props:
 * - products: array of product objects with { id, name, image, price, ...rest }
 * - renderProduct: function to render individual product (receives product object)
 */
const PatternGrid = ({ products, renderProduct }) => {
  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        <p>No products found.</p>
      </div>
    );
  }

  // Build rows with alternating 1 → 2 → 1 → 2 pattern
  const rows = [];
  
  for (let i = 0; i < products.length; i += 3) {
    // Single card (250vh height, full width)
    const singleProduct = products[i];
    
    if (singleProduct) {
      rows.push(
        <div key={`single-${singleProduct.id}`} className="grid-row single-row">
          {renderProduct(singleProduct)}
        </div>
      );
    }

    // Double cards (140vh height each, side by side)
    const doubleProduct1 = products[i + 1];
    const doubleProduct2 = products[i + 2];
    
    if (doubleProduct1 || doubleProduct2) {
      rows.push(
        <div key={`double-${i}`} className="grid-row double-row">
          {doubleProduct1 && renderProduct(doubleProduct1)}
          {doubleProduct2 && renderProduct(doubleProduct2)}
        </div>
      );
    }
  }

  return (
    <div className="products-grid-mixed">
      {rows}
    </div>
  );
};

export default PatternGrid;

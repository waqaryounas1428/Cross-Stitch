import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    // Simulate API call - in a real app, this would fetch from your backend
    const simulateSearch = async () => {
      // Collect all products from different collections
      const mockProducts = [];

      // This is a simplified mock - in a real app, you'd have a proper search API
      const productsByCategory = {
        'ready-to-wear': [
          { id: 'rw-1', name: 'Luxury Pret Suit', category: 'Ready To Wear', price: 8500, image: 'placeholder' },
          { id: 'rw-2', name: 'Evening Wear Dress', category: 'Ready To Wear', price: 6200, image: 'placeholder' },
        ],
        'unstitched': [
          { id: 'us-1', name: 'Mahiri Embroidered Lawn', category: 'Unstitched', price: 5500, image: 'placeholder' },
        ],
        'fragrances': [
          { id: 'fr-1', name: 'Signature Eau de Parfum', category: 'Fragrances', price: 4500, image: 'placeholder' },
        ],
      };

      // Collect all products
      Object.values(productsByCategory).forEach((products) => {
        mockProducts.push(...products);
      });

      // Filter by query
      const filtered = mockProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );

      setTimeout(() => {
        setResults(filtered);
        setLoading(false);
      }, 300);
    };

    simulateSearch();
  }, [query]);

  return (
    <div className="search-results-page">
      <div className="search-results-container">
        <h1 className="results-title">
          Search Results for "<span>{query}</span>"
        </h1>

        {loading && <p className="loading">Searching...</p>}

        {!loading && results.length === 0 && (
          <div className="no-results">
            <p>No products found matching your search.</p>
            <Link to="/ready-to-wear" className="browse-link">
              Browse Collections
            </Link>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="results-grid">
            {results.map((product) => (
              <div key={product.id} className="result-card">
                <div className="result-image">
                  <div className="placeholder-image">📦</div>
                </div>
                <h3>{product.name}</h3>
                <p className="result-category">{product.category}</p>
                <p className="result-price">Rs. {product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;

import React, { useState } from 'react';
import './StoreLocations.css';

const StoreLocations = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const cities = [
    'LAHORE',
    'SIALKOT',
    'GUJRAT',
    'KARACHI',
    'HYDERABAD',
    'FAISALABAD',
    'SARGODHA',
    'SWAT',
    'RAWALPINDI',
    'ISLAMABAD',
    'BAHAWALPUR',
    'MULTAN',
    'GUJRANWALA',
    'MANDI BAHAUDDIN'
  ];

  const storeDetails = {
    LAHORE: [
      { name: 'Cross Stitch - Gulberg Main Store', address: 'Shop 12-13, Main Boulevard, Gulberg III, Lahore', phone: '042-111-111-006' },
      { name: 'Cross Stitch - DHA Lahore', address: 'Y Block, DHA Phase III, Lahore', phone: '042-111-111-006' },
      { name: 'Cross Stitch - Emporium Mall', address: 'Ground Floor, Emporium Mall, Johar Town, Lahore', phone: '042-111-111-006' }
    ],
    KARACHI: [
      { name: 'Cross Stitch - Dolmen City', address: '1st Floor, Dolmen City Mall, Clifton, Karachi', phone: '021-111-111-006' },
      { name: 'Cross Stitch - Lucky One Mall', address: 'Ground Floor, Lucky One Mall, Rashid Minhas Road, Karachi', phone: '021-111-111-006' }
    ],
    ISLAMABAD: [
      { name: 'Cross Stitch - Centaurus Mall', address: '2nd Floor, Centaurus Mall, F-8, Islamabad', phone: '051-111-111-006' }
    ],
    SIALKOT: [
      { name: 'Cross Stitch - Sialkot Store', address: 'Cantt Road, Sialkot', phone: '052-111-111-006' }
    ],
    GUJRAT: [
      { name: 'Cross Stitch - Gujrat Store', address: 'GT Road, Gujrat', phone: '053-111-111-006' }
    ],
    HYDERABAD: [
      { name: 'Cross Stitch - Hyderabad Store', address: 'Saddar, Hyderabad', phone: '022-111-111-006' }
    ],
    FAISALABAD: [
      { name: 'Cross Stitch - Faisalabad Store', address: 'Kohinoor City, Faisalabad', phone: '041-111-111-006' }
    ],
    SARGODHA: [
      { name: 'Cross Stitch - Sargodha Store', address: 'University Road, Sargodha', phone: '048-111-111-006' }
    ],
    SWAT: [
      { name: 'Cross Stitch - Swat Store', address: 'Mingora Bazaar, Swat', phone: '046-111-111-006' }
    ],
    RAWALPINDI: [
      { name: 'Cross Stitch - Rawalpindi Store', address: 'Commercial Market, Satellite Town, Rawalpindi', phone: '051-111-111-006' }
    ],
    BAHAWALPUR: [
      { name: 'Cross Stitch - Bahawalpur Store', address: 'Circular Road, Bahawalpur', phone: '062-111-111-006' }
    ],
    MULTAN: [
      { name: 'Cross Stitch - Multan Store', address: 'Abdali Road, Multan', phone: '061-111-111-006' }
    ],
    GUJRANWALA: [
      { name: 'Cross Stitch - Gujranwala Store', address: 'GT Road, Gujranwala', phone: '055-111-111-006' }
    ],
    'MANDI BAHAUDDIN': [
      { name: 'Cross Stitch - Mandi Bahauddin Store', address: 'Main Bazaar, Mandi Bahauddin', phone: '054-111-111-006' }
    ]
  };

  const defaultQuery = 'Cross Stitch, Gulberg III, Lahore, Pakistan';

  const activeQuery =
    selectedCity && storeDetails[selectedCity]
      ? `${storeDetails[selectedCity][0].name}, ${storeDetails[selectedCity][0].address}`
      : defaultQuery;

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(activeQuery)}&output=embed`;

  const handleCityClick = (cityName) => {
    setSelectedCity(selectedCity === cityName ? null : cityName);
  };

  return (
    <div className="store-locations-page">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <h1>Store Locations</h1>
          <p>Visit our stores nationwide for the latest Cross Stitch collections</p>
          <div className="breadcrumb">
            <a href="/">Home</a> / <span>Store Locations</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-content">
        <div className="store-locator">

          {/* Cities List - Left Side */}
          <div className="locator-sidebar">
            {cities.map((city, index) => (
              <div key={index}>
                <div
                  className={`city-row ${selectedCity === city ? 'active' : ''}`}
                  onClick={() => handleCityClick(city)}
                >
                  <span className="city-name">{city}</span>
                  <span className="toggle-icon">{selectedCity === city ? '−' : '+'}</span>
                </div>

                {selectedCity === city && storeDetails[city] && (
                  <div className="city-stores-panel">
                    {storeDetails[city].map((store, i) => (
                      <div key={i} className="store-card">
                        <h4>{store.name}</h4>
                        <p><span className="icon">📍</span>{store.address}</p>
                        <p><span className="icon">📞</span>{store.phone}</p>
                        <div className="store-actions">
                          <a
                            className="action-btn primary"
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Get Directions
                          </a>
                          <a className="action-btn secondary" href={`tel:${store.phone}`}>
                            Call Store
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Map - Right Side */}
          <div className="locator-map">
            <iframe
              title="Cross Stitch Store Map"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <div className="container">
          <div className="contact-info">
            <h3>Need Help Finding a Store?</h3>
            <div className="contact-details">
              <div className="contact-item">
                <strong>Customer Service:</strong> 042-111-111-006
              </div>
              <div className="contact-item">
                <strong>WhatsApp:</strong> +92 302 8141555
              </div>
              <div className="contact-item">
                <strong>Email:</strong> info@crossstitch.pk
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocations;
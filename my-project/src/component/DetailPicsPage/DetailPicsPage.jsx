import React, { useState, useEffect } from 'react';
import './DetailPicsPage.css';

// Manually import all detail images
import detail1 from '../../img/detail pic/m_0020_DSC09634_b9366761-bc41-4f1d-9bec-a999daf008e8_360x.webp';
import detail2 from '../../img/detail pic/Untitled-1-Recovered_0009_MTB00664_360x.webp';
import detail3 from '../../img/detail pic/Untitled-1_0002_DSC00436_360x.webp';
import detail4 from '../../img/detail pic/Untitled-1_0005_DSC00386_934e5971-40e4-4383-9eef-c9f4a975de18_360x.webp';
import detail5 from '../../img/detail pic/Untitled-1_0007_AKS04054_360x.webp';
import detail6 from '../../img/detail pic/Untitled-1_0007_DSC01085_cab2c765-9203-4fd9-abb1-255ba05d9100_360x.webp';
import detail7 from '../../img/detail pic/Untitled-1_0010_DSC02329_360x.webp';
import detail8 from '../../img/detail pic/Untitled-1_0011_DSC05329_360x.webp';
import detail9 from '../../img/detail pic/Untitled-1_0012_DSC00734_360x.webp';
import detail10 from '../../img/detail pic/Untitled-1_0016_MTB09153_360x.webp';

const allDetailImages = [detail1, detail2, detail3, detail4, detail5, detail6, detail7, detail8, detail9, detail10];

const DetailPicsPage = () => {
  const [detailImages, setDetailImages] = useState(allDetailImages);

  return (
    <div className="detail-pics-page">
      <div className="detail-pics-container">
        <div className="detail-pics-header">
          <h1>DETAIL PICTURES</h1>
          <p>Explore our complete collection of detail photography</p>
        </div>

        <div className="detail-pics-grid">
          {detailImages.map((img, idx) => (
            <div key={idx} className="detail-pic-item">
              <div className="detail-pic-image-wrapper">
                <img 
                  src={img} 
                  alt={`Detail Picture ${idx + 1}`}
                  className="detail-pic-image"
                />
              </div>
              <p className="detail-pic-label">Picture {idx + 1}</p>
            </div>
          ))}
        </div>

        {detailImages.length === 0 && (
          <div className="no-images">
            <p>No detail images found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPicsPage;

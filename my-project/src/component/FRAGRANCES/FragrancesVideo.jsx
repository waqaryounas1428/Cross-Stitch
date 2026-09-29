import React from 'react';
import './FragrancesVideo.css';
import perfumeVideo from '../../img/FRAGRANCES/Perfumes Video for Web.webm';

const FragrancesVideo = () => {
  return (
    <div className="fragrances-video-section">
      <video
        className="fragrances-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={perfumeVideo} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default FragrancesVideo;

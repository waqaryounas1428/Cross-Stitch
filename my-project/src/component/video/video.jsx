import React, { useRef, useEffect, useState } from "react";
import "./video.css";
import video from "../../assets/video.mp4";

const Video = () => {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleLoadedData = () => {
        console.log("Video loaded successfully");
        setVideoLoaded(true);
        setVideoError(false);
      };

      const handleError = (e) => {
        console.error("Video error:", e);
        setVideoError(true);
      };

      const handleCanPlay = async () => {
        try {
          await videoElement.play();
          console.log("Video playing");
        } catch (error) {
          console.log("Autoplay prevented:", error);
          // Add a click handler as fallback
          const handleClick = () => {
            videoElement.play();
            document.removeEventListener('click', handleClick);
          };
          document.addEventListener('click', handleClick);
        }
      };

      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('error', handleError);
      videoElement.addEventListener('canplay', handleCanPlay);

      // Force load
      videoElement.load();

      return () => {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('error', handleError);
        videoElement.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  if (videoError) {
    return (
      <section className="video-section">
        <div className="video-container">
          <div style={{
            width: '100%',
            height: '100%',
            background: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px'
          }}>
            Video could not be loaded
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="video-section">
      <div className="video-container">
        <video
          ref={videoRef}
          className="main-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          style={{ opacity: videoLoaded ? 1 : 0 }}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {!videoLoaded && !videoError && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '16px'
          }}>
            Loading video...
          </div>
        )}
      </div>
    </section>
  );
};

export default Video;
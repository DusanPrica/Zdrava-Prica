"use client";

import { useEffect, useRef } from "react";
import FooterDefault from "./components/FooterDefault";

export default function HomePage() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    };

    const handleError = () => {
      console.error("Video failed to load");
      // You could add a fallback image or message here if needed
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    // Try to play the video
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Autoplay prevented, waiting for user interaction");
        
        // Add a fallback play button
        const playButton = document.createElement('button');
        playButton.textContent = 'Play Video';
        playButton.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 12px 24px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          z-index: 3;
          font-size: 16px;
        `;
        playButton.addEventListener('click', () => {
          video.play();
          playButton.remove();
        });
        
        const container = document.querySelector('.hero-video-container');
        if (container) {
          container.appendChild(playButton);
        }
      }
    };

    playVideo();

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <>
      <div className="hero-video-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="hero-video"
          preload="auto"
          src="/videos/GreenScreen.mp4"
        >
          Your browser does not support the video tag.
          <a href="/videos/GreenScreen.mp4" target="_blank" rel="noopener noreferrer">
            Click here to view the video.
          </a>
        </video>

        <div className="hero-overlay">
          <h1>VFX | CGI</h1>
          <p>Solutions for powerful visual narratives.</p>
        </div>
      </div>

      <div className="home-text-section">
        <h1 className="home-text-main">Zdrava Priča Creative Studio | Showreel</h1>
      </div>

      <div className="home-videos">
        <div className="video-wrapper-homepage">
          <iframe 
            src="https://player.vimeo.com/video/1116684528" 
            title="Zdrava Priča Creative Studio Showreel" 
            frameBorder="0"  
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <FooterDefault />
    </>
  );
}

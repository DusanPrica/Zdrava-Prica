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
      video.play();
    };

    video.addEventListener('ended', handleEnded);

    video.play().catch(error => {
      console.log("Autoplay prevented:", error);
    });

    return () => {
      video.removeEventListener('ended', handleEnded);
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
          src="/videos/green-screen-video.mp4"
        >
          Your browser does not support the video tag.
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
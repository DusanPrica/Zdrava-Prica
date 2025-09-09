"use client";

import { useEffect, useRef, useState } from "react";
import FooterDefault from "./components/FooterDefault";
import FooterDefaultResponsive from "./components/FooterDefaultResponsive";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(false);
  const heroVideoRef = useRef(null);

  useEffect(() => {
    const splashShown = sessionStorage.getItem("splashShown");
    if (!splashShown) {
      setShowSplash(true);
      sessionStorage.setItem("splashShown", "true");
    }
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("ended", handleEnded);

    video.play().catch((error) => {
      console.log("Autoplay prevented:", error);
    });

    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  const handleSplashEnd = () => setShowSplash(false);

  return (
    <>
      {showSplash && (
        <div className="splash-overlay">
          <video
            autoPlay
            muted
            playsInline
            onEnded={handleSplashEnd}
            className="splash-video"
          >
            <source src="/videos/logo-animation-video.mp4" type="video/mp4" />
            <source src="/videos/logo-animation.webm" type="video/webm" />
          </video>
        </div>
      )}

      {!showSplash && (
        <>
          <div className="hero-video-container">
            <video
              ref={heroVideoRef}
              autoPlay
              muted
              playsInline
              loop
              className="hero-video"
              preload="auto"
            >
              <source src="/videos/green-screen-video.mp4" type="video/mp4" />
              <source src="/videos/green-screen.webm" type="video/webm" />
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
          <FooterDefaultResponsive />
        </>
      )}
    </>
  );
}


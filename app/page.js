"use client";

import FooterDefault from "./components/FooterDefault";

export default function HomePage() {
  return (
    <>
      <div className="hero-video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
          src="/videos/green-screen.mp4"
        ></video>

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
            title="Video 1" 
            frameBorder="0"  
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <FooterDefault />
    </>
  );
}



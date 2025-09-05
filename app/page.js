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
        <h1 className="home-text-main">We got you covered.</h1>
        <p className="home-text-description">
          We help our clients harness the power of CGI to build unforgettable viewing experiences. 
          Our team will always be able to deliver advanced solutions, tailored for all types of commercials.
        </p>
      </div>

      <div className="home-videos">
        <div className="video-wrapper-homepage">
          <iframe 
            src="https://www.youtube.com/embed/7PZWkDr2YDk" 
            title="Video 1" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-wrapper-homepage">
          <iframe 
            src="https://www.youtube.com/embed/JuYbSgpzU3Y" 
            title="Video 2" 
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



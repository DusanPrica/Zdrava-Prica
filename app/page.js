"use client";

import { useEffect, useRef, useState } from "react";
import FooterDefault from "./components/FooterDefault";

export default function HomePage() {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [videoStatus, setVideoStatus] = useState("loading");
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoad = () => {
      setVideoStatus("loaded");
      console.log("Video loaded successfully");
    };

    const handleError = (e) => {
      console.error("Video error:", e);
      setVideoError(true);
      setVideoStatus("error");
    };

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(error => {
        console.log("Autoplay prevented:", error);
        setShowPlayButton(true);
      });
    };

    video.addEventListener('loadeddata', handleLoad);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    // Try to play the video
    const playVideo = async () => {
      try {
        await video.play();
        setShowPlayButton(false);
      } catch (error) {
        console.log("Autoplay prevented:", error);
        setShowPlayButton(true);
      }
    };

    playVideo();

    // Check if video source is accessible
    fetch(video.src)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Video source is accessible");
      })
      .catch(error => {
        console.error("Video source error:", error);
        setVideoError(true);
        setVideoStatus("error");
      });

    return () => {
      video.removeEventListener('loadeddata', handleLoad);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (video) {
      video.play()
        .then(() => setShowPlayButton(false))
        .catch(error => console.error("Play failed:", error));
    }
  };

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
          onError={() => setVideoError(true)}
        >
          Your browser does not support the video tag.
        </video>

        {showPlayButton && (
          <button 
            onClick={handlePlayClick}
            className="play-button-bottom-right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5V19L19 12L8 5Z" fill="white"/>
            </svg>
            Play Video
          </button>
        )}

        {videoError && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            zIndex: 2
          }}>
            <div>
              <p>Video failed to load</p>
              <button 
                onClick={() => window.location.reload()}
                style={{padding: "10px 20px", marginTop: "10px"}}
              >
                Retry
              </button>
            </div>
          </div>
        )}

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
"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./AdvertisementSlider.module.css";

const videos = [
  "/videos/advertisement/video1.mp4",
  "/videos/advertisement/video2.mp4",
  "/videos/advertisement/video3.mp4",
  "/videos/advertisement/video4.mp4",
  "/videos/advertisement/video5.mp4",
  "/videos/advertisement/video6.mp4",
  "/videos/advertisement/video7.mp4",
  "/videos/advertisement/video8.mp4",
  "/videos/advertisement/video9.mp4",
];

export default function AdvertisementSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVideo, setModalVideo] = useState(null);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const videosPerView = 4;

  useEffect(() => {
    if (!sliderRef.current) return;
    const videoWidth = sliderRef.current.offsetWidth / videosPerView;
    sliderRef.current.scrollTo({
      left: videoWidth * currentIndex,
      behavior: "smooth",
    });
  }, [currentIndex]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.cursor = "grabbing";
    sliderRef.current.style.scrollBehavior = "auto";
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
   
    const walk = (x - startX.current) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };
  
  const handleMouseUp = () => {
    isDragging.current = false;
    sliderRef.current.style.cursor = "grab";
    sliderRef.current.style.scrollBehavior = "smooth";
    
    const videoWidth = sliderRef.current.offsetWidth / videosPerView;
    const newIndex = Math.round(sliderRef.current.scrollLeft / videoWidth);
    
    if (newIndex < 0) {
      setCurrentIndex(videos.length - 1);
    } else if (newIndex >= videos.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(newIndex);
    }
  };
  
  const handleMouseLeave = () => {
    if (isDragging.current) {
      handleMouseUp();
    }
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.scrollBehavior = "auto";
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
   
    const walk = (x - startX.current) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };
  
  const handleTouchEnd = () => {
    isDragging.current = false;
    sliderRef.current.style.scrollBehavior = "smooth";
    
    const videoWidth = sliderRef.current.offsetWidth / videosPerView;
    const newIndex = Math.round(sliderRef.current.scrollLeft / videoWidth);
    
    if (newIndex < 0) {
      setCurrentIndex(videos.length - 1);
    } else if (newIndex >= videos.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(newIndex);
    }
  };

  const moveNext = () => {
    setCurrentIndex(prev => (prev + 1) % videos.length);
  };
  
  const movePrev = () => {
    setCurrentIndex(prev => (prev - 1 + videos.length) % videos.length);
  };

  const openModal = (src) => setModalVideo(src);
  const closeModal = () => setModalVideo(null);

  return (
    <>
      <div className={styles.sliderWrapper}>
        <button 
          className={styles.arrowButton} 
          onClick={movePrev}
        >
          &lt;
        </button>

        <div
          className={styles.sliderContainer}
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {videos.map((src, index) => (
            <div
              key={index}
              className={styles.videoWrapper}
              onClick={() => openModal(src)}
            >
              <video src={src} autoPlay loop muted className={styles.videoItem} />
            </div>
          ))}
        </div>

        <button 
          className={styles.arrowButton} 
          onClick={moveNext}
        >
          &gt;
        </button>

        {modalVideo && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeModal} onClick={closeModal}>×</button>
              <video src={modalVideo} autoPlay loop muted controls className={styles.modalVideo} />
            </div>
          </div>
        )}
      </div>

      <div className="home-text-section">
        <h2 className="home-text-title">
          Capture attention, spark conversations and go viral with our advanced Fake Out Of Home (FOOH) marketing campaigns.
        </h2>
        <h1 className="home-text-main">We got you covered.</h1>
        <p className="home-text-description">
          We help our clients harness the power of CGI to build unforgettable
          viewing experiences. Our team will always be able to deliver advanced
          solutions, tailored for all types of commercials.
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
    </>
  );
}
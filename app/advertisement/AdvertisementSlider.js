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
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false);
  const videosPerView = 4;

  // Uvek centriraj na currentIndex
  useEffect(() => {
    if (!sliderRef.current) return;
    const videoWidth = sliderRef.current.offsetWidth / videosPerView;
    sliderRef.current.scrollTo({
      left: videoWidth * currentIndex,
      behavior: "smooth",
    });
  }, [currentIndex]);

  // --- Mouse drag (desktop) ---
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX;
    const walk = (x - startX.current) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    sliderRef.current.style.cursor = "grab";
  };

  const handleMouseLeave = () => {
    if (isDragging.current) handleMouseUp();
  };

  // --- Touch swipe (mobile) ---
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchEnd = (e) => {
    if (!isDragging.current) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;
    if (diff > 50) moveNext();
    if (diff < -50) movePrev();
    isDragging.current = false;
  };

  // --- Strelice ---
  const moveNext = () => {
    setCurrentIndex((prev) => (prev + 1 >= videos.length ? 0 : prev + 1));
  };

  const movePrev = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? videos.length - 1 : prev - 1));
  };

  const openModal = (src) => setModalVideo(src);
  const closeModal = () => setModalVideo(null);

  return (
    <>
      <div className={styles.sliderWrapper}>
        <button className={styles.arrowButton} onClick={movePrev}>
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
          onTouchEnd={handleTouchEnd}
        >
          {videos.map((src, index) => (
            <div
              key={index}
              className={styles.videoWrapper}
              onClick={() => openModal(src)}
            >
              <video
                src={src}
                autoPlay
                loop
                muted
                className={styles.videoItem}
              />
            </div>
          ))}
        </div>

        <button className={styles.arrowButton} onClick={moveNext}>
          &gt;
        </button>

        {modalVideo && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeModal} onClick={closeModal}>
                ×
              </button>
              <video
                src={modalVideo}
                autoPlay
                loop
                muted
                controls
                className={styles.modalVideo}
              />
            </div>
          </div>
        )}
      </div>

      <div className="home-text-section">
        <h2 className="home-text-title">
          Capture attention, spark conversations and go viral with our advanced
          Fake Out Of Home (FOOH) marketing campaigns.
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

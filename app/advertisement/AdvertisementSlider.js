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

  const extendedVideos = [...videos, ...videos.slice(0, videosPerView)];

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseUp = () => (isDragging.current = false);
  const handleMouseLeave = () => (isDragging.current = false);

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scrollToIndex = (index) => {
    const videoWidth = sliderRef.current.offsetWidth / videosPerView;
    sliderRef.current.scrollTo({
      left: videoWidth * index,
      behavior: "smooth",
    });
  };

  const moveNext = () => {
    let nextIndex = (currentIndex + 1) % videos.length;
    setCurrentIndex(nextIndex);
  };

  const movePrev = () => {
    let prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    setCurrentIndex(prevIndex);
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
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {extendedVideos.map((src, index) => (
          <div
            key={index}
            className={styles.videoWrapper}
            onClick={() => openModal(src)}
          >
            <video src={src} autoPlay loop muted className={styles.videoItem} />
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
            ></video>
          </div>
        </div>
      )}
    </div>

    <div className="home-text-section">
      
      <h2 className="home-text-title">Capture attention, spark conversations and go viral with our advanced Fake Out Of Home (FOOH) marketing campaigns.  </h2>
      
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

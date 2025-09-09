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

function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max));
}

export default function AdvertisementSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVideo, setModalVideo] = useState(null);
  const [videosPerView, setVideosPerView] = useState(4);

  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Responsivni broj videa u view-u
  useEffect(() => {
    const updateVideosPerView = () => {
      if (window.innerWidth < 600) setVideosPerView(1);
      else if (window.innerWidth < 1024) setVideosPerView(2);
      else setVideosPerView(4);
    };
    updateVideosPerView();
    window.addEventListener("resize", updateVideosPerView);
    return () => window.removeEventListener("resize", updateVideosPerView);
  }, []);

  // Kada se promeni videosPerView, osiguraj validan currentIndex
  useEffect(() => {
    const maxIndex = Math.max(0, videos.length - videosPerView);
    setCurrentIndex((idx) => clamp(idx, 0, maxIndex));
  }, [videosPerView]);

  // Uvek skroluj na currentIndex
  useEffect(() => {
    if (!sliderRef.current) return;
    const videoWidth = sliderRef.current.offsetWidth / videosPerView;
    // koristimo smooth scroll za navigaciju dugmadi / indeksa
    sliderRef.current.style.scrollBehavior = "smooth";
    sliderRef.current.scrollTo({
      left: videoWidth * currentIndex,
      behavior: "smooth",
    });
  }, [currentIndex, videosPerView]);

  // --- Mouse (desktop) handlers ---
  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.cursor = "grabbing";
    sliderRef.current.style.scrollBehavior = "auto";
    // global listener za slučaj da pustiš miš van elementa
    window.addEventListener("mouseup", handleMouseUpWindow);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !sliderRef.current) return;
    const x = e.pageX;
    const walk = (x - startX.current) * 1; // faktor osetljivosti
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    if (!sliderRef.current) return;
    isDragging.current = false;
    sliderRef.current.style.cursor = "grab";
    // izračunamo novi indeks na osnovu pozicije skrola
    const videoWidth = sliderRef.current.offsetWidth / videosPerView;
    const rawIndex = Math.round(sliderRef.current.scrollLeft / videoWidth);
    const maxIndex = Math.max(0, videos.length - videosPerView);
    const bounded = clamp(rawIndex, 0, maxIndex);
    setCurrentIndex(bounded);
    // ukloni global listener
    window.removeEventListener("mouseup", handleMouseUpWindow);
  };

  // global handler (izazvan ako korisnik otpusti miš van elementa)
  const handleMouseUpWindow = () => {
    if (isDragging.current) handleMouseUp();
  };

  const handleMouseLeave = () => {
    if (isDragging.current) handleMouseUp();
  };

  // --- Touch (mobile) handlers ---
  const handleTouchStart = (e) => {
    if (!sliderRef.current) return;
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    scrollLeft.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.scrollBehavior = "auto";
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || !sliderRef.current) return;
    const x = e.touches[0].clientX;
    const walk = (x - startX.current) * 1;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => {
    if (!sliderRef.current) return;
    isDragging.current = false;
    // zaokruži indeks
    const videoWidth = sliderRef.current.offsetWidth / videosPerView;
    const rawIndex = Math.round(sliderRef.current.scrollLeft / videoWidth);
    const maxIndex = Math.max(0, videos.length - videosPerView);
    const bounded = clamp(rawIndex, 0, maxIndex);
    setCurrentIndex(bounded);
    sliderRef.current.style.scrollBehavior = "smooth";
  };

  // --- Arrow navigation (uvek pomera po 1 video) ---
  const moveNext = () => {
    const maxIndex = Math.max(0, videos.length - videosPerView);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const movePrev = () => {
    const maxIndex = Math.max(0, videos.length - videosPerView);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Modal
  const openModal = (src) => setModalVideo(src);
  const closeModal = () => setModalVideo(null);

  return (
    <>
      <div className={styles.sliderWrapper}>
        <button className={styles.arrowButton} onClick={movePrev} aria-label="Previous">
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
          style={{ cursor: "grab" }}
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

        <button className={styles.arrowButton} onClick={moveNext} aria-label="Next">
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

      {/* --- DEO ISPOD SLAJDERA (EVO GA, NIKAD NEĆU ZABORAVITI) --- */}
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

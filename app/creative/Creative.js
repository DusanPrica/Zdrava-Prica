"use client";

import { useState } from "react";
import styles from "./Creative.module.css";
import Image from "next/image";

const slides = [
  {
    type: "youtube",
    videoUrl: "https://www.youtube.com/embed/pq0r6WPGY8I",
    images: [
      { src: "/images/slider-images/slider1/1.1.png" },
      { src: "/images/slider-images/slider1/1.2.png" },
      { src: "/images/slider-images/slider1/1.3.png" },
      { src: "/images/slider-images/slider1/1.4.png" },
      { src: "/images/slider-images/slider1/1.5.png" },
      { src: "/images/slider-images/slider1/1.6.png" },
    ],
  },

  {
    type: "youtube",
    videoUrl: "https://www.youtube.com/embed/h7I-OE42q6Y",
    images: [
      { src: "/images/slider-images/slider2/2.1.png" },
      { src: "/images/slider-images/slider2/2.2.png" },
      { src: "/images/slider-images/slider2/2.3.png" },
      { src: "/images/slider-images/slider2/2.4.png" },
      { src: "/images/slider-images/slider2/2.5.png" },
      { src: "/images/slider-images/slider2/2.6.png" },
    ],
  },

  {
    type: "youtube",
    videoUrl: "https://www.youtube.com/embed/bZqMo0_wUFY",
    images: [
      { src: "/images/slider-images/slider3/3.1.png" },
      { src: "/images/slider-images/slider3/3.2.png" },
      { src: "/images/slider-images/slider3/3.3.png" },
      { src: "/images/slider-images/slider3/3.4.png" },
      { src: "/images/slider-images/slider3/3.5.png" },
      { src: "/images/slider-images/slider3/3.6.png" },
    ],
  },

  {
    type: "youtube",
    videoUrl: "https://www.youtube.com/embed/lCF0a8qWO6c",
    images: [
      { src: "/images/slider-images/slider4/4.1.png" },
      { src: "/images/slider-images/slider4/4.2.png" },
      { src: "/images/slider-images/slider4/4.3.png" },
      { src: "/images/slider-images/slider4/4.4.png" },
      { src: "/images/slider-images/slider4/4.5.png" },
      { src: "/images/slider-images/slider4/4.6.png" },
    ],
  },

  {
    type: "youtube",
    videoUrl: "https://www.youtube.com/embed/ONx6-Fwp4Qc",
    images: [
      { src: "/images/slider-images/slider5/5.1.png" },
      { src: "/images/slider-images/slider5/5.2.png" },
      { src: "/images/slider-images/slider5/5.3.png" },
      { src: "/images/slider-images/slider5/5.4.png" },
      { src: "/images/slider-images/slider5/5.5.png" },
      { src: "/images/slider-images/slider5/5.6.png" },
    ],
  },

  {
    type: "youtube",
    videoUrl: "https://www.youtube.com/embed/yZ5xOoR0xKs",
    images: [
      { src: "/images/slider-images/slider6/6.1.png" },
      { src: "/images/slider-images/slider6/6.2.png" },
      { src: "/images/slider-images/slider6/6.3.png" },
      { src: "/images/slider-images/slider6/6.4.png" },
      { src: "/images/slider-images/slider6/6.5.png" },
      { src: "/images/slider-images/slider6/6.6.png" },
    ],
  },
];

export default function Creative() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  const currentSlide = slides[currentIndex];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const openLightbox = (src) => setLightboxImage(src);
  const closeLightbox = () => setLightboxImage(null);

  return (
    <div className={styles.sliderWrapper}>

      
      <h2 className={styles.sliderSubTitle}> Projects</h2>


      <div className={styles.videoWrapper}>
        <button className={styles.sideButton} onClick={prevSlide}>&lt;</button>

        <div className={styles.videoContainer}>
          {currentSlide.type === "youtube" ? (
            <iframe
              src={currentSlide.videoUrl}
              title={`Video ${currentIndex + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={currentSlide.videoUrl}
              controls
              autoPlay
              loop
              muted
              className={styles.videoPlayer}
            />
          )}
        </div>

        <button className={styles.sideButton} onClick={nextSlide}>&gt;</button>
      </div>

      <div className={styles.imagesGrid}>
        {currentSlide.images.map((img, idx) => (
          <div key={idx} className={styles.imageWrapper} onClick={() => openLightbox(img.src)}>
            <Image
              src={img.src}
              alt={`Slide ${currentIndex + 1} Image ${idx + 1}`}
              fill
              className={styles.image}
            />
          </div>
        ))}
      </div>

      <p className={styles.sliderParagraph}>From concept to  render</p>

      <h1 className={styles.sliderTitle}>We design CGI music videos and visual projects that push boundaries. With advanced tools and fresh ideas, our team turns your creative concepts into striking, high-quality visuals that resonate with every viewer. </h1>


      {lightboxImage && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <button className={styles.closeLightbox} onClick={closeLightbox}>×</button>
          <Image
            src={lightboxImage}
            alt="Enlarged"
            fill
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}


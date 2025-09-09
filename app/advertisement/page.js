"use client";
import FooterDefault from "../components/FooterDefault";
import FooterDefaultResponsive from "../components/FooterDefaultResponsive";
import AdvertisementSlider from "./AdvertisementSlider";
import styles from "./AdvertisementSlider.module.css";

export default function AdvertisementPage() {
  return (
    <div>
      <p className={styles.advertisementParagraph}>Disrupt the scroll.</p>

      <h2 className="home-text-title">
          Capture attention, spark conversations and go viral with our advanced Fake Out Of Home (FOOH) marketing campaigns.
        </h2>

      <AdvertisementSlider />

      <FooterDefault />

      <FooterDefaultResponsive />
    </div>
  );
}

"use client";
import FooterDefault from "../components/FooterDefault";
import AdvertisementSlider from "./AdvertisementSlider";
import styles from "./AdvertisementSlider.module.css";

export default function AdvertisementPage() {
  return (
    <div>
      <p className={styles.advertisementParagraph}>Disrupt the scroll.</p>

      <AdvertisementSlider />

      <FooterDefault />
    </div>
  );
}

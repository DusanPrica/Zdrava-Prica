"use client";
import Image from "next/image";

export default function Footer() {
  const partners = [
    "/images/partners/partner1.png",
    "/images/partners/partner2.png",
    "/images/partners/partner3.png",
    "/images/partners/partner4.png",
    "/images/partners/partner5.png",
    "/images/partners/partner6.png",
    "/images/partners/partner7.png",
    "/images/partners/partner8.png",
  ];

  return (
    <footer className="footer">
      <div className="partnersGrid">
        {partners.map((src, index) => (
          <div key={index} className="partnerLogo" style={{ position: "relative" }}>
            <Image
              src={src}
              alt={`Partner ${index + 1}`}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </footer>
  );
}

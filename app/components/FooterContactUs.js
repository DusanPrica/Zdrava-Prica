"use client";
import Image from "next/image";

export default function FooterSocial() {
  const socialIcons = [
    { src: "/images/social-media/instagram.png", alt: "Instagram", link: "https://instagram.com/zdravaprica.studio" },
    { src: "/images/social-media/venmo.png", alt: "Vimeo", link: "https://vimeo.com/zdravapricastudio" },
    { src: "/images/social-media/linkedin.png", alt: "LinkedIn", link: "https://www.linkedin.com/company/108838306/admin/dashboard/" },
  ];

  return (
    <footer className="footerSocial">
  <div className="footerSocialInner">
    <div className="footerLeft">zdravapricastudio@gmail.com</div>
    <div className="footerCenter">©ZdravaPriča2025</div>
    <div className="footerRight">
      {socialIcons.map((icon, index) => (
        <a key={index} href={icon.link} target="_blank" rel="noopener noreferrer">
          <Image
            src={icon.src}
            alt={icon.alt}
            width={20}
            height={20}
            style={{ objectFit: "contain", marginLeft: index === 0 ? 0 : 10 }}
          />
        </a>
      ))}
    </div>
  </div>
</footer>

  );
}



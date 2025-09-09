"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="header">
      <div className="headerContent">
     
        <div className="site_logo">
          <Link href="/">
            <Image src="/images/logo.png" alt="Company Logo" width={80} height={80} />
          </Link>
        </div>

        <nav className="desktopNavigation">
          <ul className="navigation_links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/advertisement">Advertisement</Link></li>
            <li><Link href="/creative">Creative</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact-us">Contact Us</Link></li>
          </ul>
        </nav>

        <div className="mobileMenuWrapper" ref={menuContainerRef}>
          <div className="hamburger" onClick={() => setMenuOpen((prev) => !prev)}>
            &#9776;
          </div>
          <div className={`mobileMenu ${menuOpen ? "open" : ""}`}>
            <ul>
              <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link href="/advertisement" onClick={() => setMenuOpen(false)}>Advertisement</Link></li>
              <li><Link href="/creative" onClick={() => setMenuOpen(false)}>Creative</Link></li>
              <li><Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link></li>
              <li><Link href="/contact-us" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

export default function CopyrightFooter() {
  return (
    <footer className="footerCopyright">
      <p>© Zdrava Priča 2025</p>
      <style jsx>{`
        .footerCopyright {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 15px 0;
          background-color: black;
          color: #fff;
          font-size: 14px;
        }
      `}</style>
    </footer>
  );
}

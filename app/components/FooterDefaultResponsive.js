"use client";

export default function FooterDefaultResponsive() {
  return (
    <footer className="footerResponsive">
      <p>© ZdravaPriča 2025</p>
      <style jsx>{`
        .footerResponsive {
          display: none;
        }

        @media (max-width: 768px) {
          .footerResponsive {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 15px 0;
            background-color: #111;
            color: #fff;
            font-size: 14px;
          }
        }
      `}</style>
    </footer>
  );
}

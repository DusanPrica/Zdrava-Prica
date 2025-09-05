import "./globals.css";
import Header from "./components/Header";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
});

export const metadata = {
  title: "Zdrava Prica Website",
  description: "Company portfolio site",
  icons: {
    icon: "/images/logo_tab.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className} >
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

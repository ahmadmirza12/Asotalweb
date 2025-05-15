"use client";
import localFont from "next/font/local";
import { Poppins, Parisienne } from "next/font/google"; // Import Google fonts
import "./globals.css";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";
import PATHS from "@/utils/paths";

// Local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Google font: Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Google font: Parisienne
const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-parisienne",
});

const noNavbarPaths = [
  PATHS.OTP,
  PATHS.LOGIN,
  PATHS.SIGNUP,
  PATHS.PROFILE,
  PATHS.CLIENTPROFILE,
  PATHS.HOME,
  PATHS.FORGOTPASSWORD,
  PATHS.CONFIRMPASSWORD
];
export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showNavbar = !noNavbarPaths.includes(pathname);

  return (
    <html lang="en" className={`${poppins.variable} ${parisienne.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {showNavbar && <Navbar />}

        <div className={showNavbar ? "pt-16" : ""}>{children}</div>
      </body>
    </html>
  );
}

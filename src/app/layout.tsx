import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swasau Technologies - Custom Embedded Solutions & IoT Development",
  description:
    "Leading provider of custom embedded solutions, IoT development, VLSI design, and product engineering. Specializing in microcontroller firmware, PCB design, and industrial automation.",
  keywords: [
    "embedded systems",
    "IoT development",
    "VLSI design",
    "product engineering",
    "microcontroller firmware",
    "PCB design",
    "industrial automation",
    "custom solutions",
    "technology innovation",
    "make in india",
  ],
  authors: [{ name: "Swasau Technologies Team" }],
  creator: "Swasau Technologies",
  publisher: "Swasau Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://swasau.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Swasau Technologies - Custom Embedded Solutions & IoT Development",
    description:
      "Leading provider of custom embedded solutions, IoT development, VLSI design, and product engineering. Specializing in microcontroller firmware, PCB design, and industrial automation.",
    url: "https://swasau.com",
    siteName: "Swasau Technologies",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Swasau Technologies - Custom Embedded Solutions & IoT Development",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swasau Technologies - Custom Embedded Solutions & IoT Development",
    description:
      "Leading provider of custom embedded solutions, IoT development, VLSI design, and product engineering. Specializing in microcontroller firmware, PCB design, and industrial automation.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

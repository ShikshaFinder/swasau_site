import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

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
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                style: {
                  background: "#4ade80",
                },
              },
              error: {
                duration: 5000,
                style: {
                  background: "#ef4444",
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}

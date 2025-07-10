import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "aicybershield.tech - AI-Powered Cybersecurity Automation Platform",
  description:
    "Streamline bug bounty and pentesting workflows with AI-powered browser extension and scalable Kubernetes backend. Lightning-fast reconnaissance and vulnerability assessment from browser to pod in seconds.",
  keywords: [
    "cybersecurity",
    "AI automation",
    "bug bounty",
    "pentesting",
    "vulnerability assessment",
    "browser extension",
    "kubernetes",
    "security automation",
    "ethical hacking",
    "red team",
    "DevSecOps",
    "threat response",
  ],
  authors: [{ name: "aicybershield.tech Team" }],
  creator: "aicybershield.tech",
  publisher: "aicybershield.tech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aicybershield.tech"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "aicybershield.tech - AI-Powered Cybersecurity Automation Platform",
    description:
      "Streamline bug bounty and pentesting workflows with AI-powered browser extension and scalable Kubernetes backend. Lightning-fast reconnaissance and vulnerability assessment from browser to pod in seconds.",
    url: "https://aicybershield.tech",
    siteName: "aicybershield.tech",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "aicybershield.tech - AI-Powered Cybersecurity Automation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "aicybershield.tech - AI-Powered Cybersecurity Automation Platform",
    description:
      "Streamline bug bounty and pentesting workflows with AI-powered browser extension and scalable Kubernetes backend. Lightning-fast reconnaissance and vulnerability assessment from browser to pod in seconds.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0b4f82" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

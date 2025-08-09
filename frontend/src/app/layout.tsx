import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppWalletProvider from "@/components/AppWalletProvider";
import { Toaster } from "@/components/ui/sonner";

// import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });
// const bryndanWrite = localFont({
//   src: "../fonts/bryndan_write.woff2",
//   variable: "--font-bryndan-write",
// });

export const metadata: Metadata = {
  title: "Journl - Your Moods, Secured on Solana",
  description:
    "A revolutionary web3 journal app built on Solana blockchain. From awesome to terrible, your moods now have a ledger. Secure, immutable, and decentralized journaling.",
  icons: {
    icon: [
      { url: "/journllogo.png", type: "image/png" },
      { url: "/journllogo.png", sizes: "32x32", type: "image/png" },
      { url: "/journllogo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/journllogo.png" },
  },
  keywords: [
    "Solana journal app",
    "web3 diary",
    "blockchain journaling",
    "decentralized journal",
    "Solana dApp",
    "crypto journal",
  ],
  authors: [{ name: "Journl Team" }],
  openGraph: {
    title: "Journl - Your Moods, Secured on Solana",
    description: "Revolutionary web3 journal app on Solana blockchain",
    url: "https://Journl.app",
    siteName: "Journl",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Journl - Your Moods, Secured on Solana",
    description: "Revolutionary web3 journal app on Solana blockchain",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <AppWalletProvider>{children}</AppWalletProvider>
        <Toaster position="top-center" expand={true} richColors />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InboxBuster: Clean Your Inbox in Minutes",
  description:
    "Mass delete emails, bulk unsubscribe, and sort your inbox chaos. InboxBuster for Android. Start free. Clear 1000 emails with no card required.",
  openGraph: {
    title: "InboxBuster: Clean Your Inbox in Minutes",
    description:
      "Mass delete emails, bulk unsubscribe, and sort your inbox chaos. Start free. 1000 emails, no card required.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

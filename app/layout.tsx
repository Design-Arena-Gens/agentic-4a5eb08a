import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ritam Reviews Dashboard",
  description: "Unified hotel reviews management platform for Indian hotels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

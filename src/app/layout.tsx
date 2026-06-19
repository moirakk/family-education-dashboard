import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Family Education Dashboard",
  description: "A family education management platform for multi-child households."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mueez Khurshid - Toronto Based Creative",
  description: "Creative engineering for thoughtful brands rooted in product and culture. Visual identity, editorial, and 3D-driven campaigns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Decorator Profile Manager",
  description: "DPM local user-management foundation",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alongside — the cycle-support app for partners",
  description:
    "Show up at the right time, every time. Alongside helps partners support someone through their menstrual cycle with consent-first sharing and practical, phase-aware guidance.",
  keywords: [
    "menstrual cycle support",
    "period tracker for partners",
    "how to support partner on period",
    "PMS support",
    "cycle awareness",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

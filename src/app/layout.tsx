import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

// The app is set in SF Pro Rounded. Apple devices get it through `ui-rounded`; everyone else gets
// Nunito, the closest rounded face on the web.
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://thezenlean.com"),
  title: "Zen Lean: your whole day, in one calm picture",
  description:
    "Food, fasting, sleep and movement in one place, and Kai, a coach who reads it all. A calm calorie tracker for iPhone and Apple Watch.",
  openGraph: {
    title: "Zen Lean",
    description: "Your whole day, in one calm picture. Food, fasting, sleep and movement, and Kai, a coach who reads it all.",
    url: "https://thezenlean.com",
    siteName: "Zen Lean",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  other: { "apple-itunes-app": "app-id=6763917700" },
};

export const viewport: Viewport = { themeColor: "#0b1533", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>{children}</body>
    </html>
  );
}

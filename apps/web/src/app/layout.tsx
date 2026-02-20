import type { Metadata } from "next";
import { Cormorant, Inter } from "next/font/google";
import { AuthProvider } from "@/components/providers/auth-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { HubNavbar } from "@/components/hub/hub-navbar";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Education Hub - Il Futuro dell'Apprendimento",
  description: "Piattaforma educativa innovativa con AI e blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${inter.variable} font-body antialiased`}
      >
        <AuthProvider>
          <MotionProvider>
            <HubNavbar />
            {children}
          </MotionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

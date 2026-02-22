import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Toutenmel - L'univers artistique de Mel",
  description:
    "Mel, artiste peintre autodidacte. Toiles, fluide art, aérographe, customisations. Découvrez et achetez ses œuvres originales.",
  keywords: [
    "art",
    "peinture",
    "fluide art",
    "aérographe",
    "customisation",
    "artiste peintre",
    "toutenmel",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${caveat.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

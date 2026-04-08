import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";

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
  metadataBase: new URL("https://toutenmel.fr"),
  title: "Toutenmel — Tableaux Originaux & Fluide Art | Artiste Peintre Aubagne",
  description:
    "Toiles originales, fluide art et customisations uniques par Mel, artiste peintre à Aubagne. Pièces uniques à partir de 35€.",
  keywords: [
    "art",
    "peinture",
    "fluide art",
    "aérographe",
    "customisation",
    "artiste peintre",
    "toutenmel",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Toutenmel",
    title: "Toutenmel — Tableaux Originaux & Fluide Art | Artiste Peintre Aubagne",
    description: "Toiles originales, fluide art et customisations uniques par Mel, artiste peintre à Aubagne. Pièces uniques à partir de 35€.",
    images: [{ url: "/logotoutenmel.png", width: 600, height: 300, alt: "Toutenmel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toutenmel — Tableaux Originaux & Fluide Art | Artiste Peintre Aubagne",
    description: "Toiles originales, fluide art et customisations uniques par Mel, artiste peintre à Aubagne. Pièces uniques à partir de 35€.",
    images: ["/logotoutenmel.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mel",
  jobTitle: "Artiste peintre autodidacte",
  url: "https://toutenmel.fr",
  image: "https://toutenmel.fr/logotoutenmel.png",
  description: "Mel, artiste peintre autodidacte. Toiles, fluide art, aérographe, customisations uniques.",
  knowsAbout: ["Peinture", "Fluide Art", "Aérographe", "Customisation", "Art contemporain"],
  makesOffer: {
    "@type": "Offer",
    itemOffered: { "@type": "CreativeWork", name: "Oeuvres d'art originales" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${caveat.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <AnalyticsTracker />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { Oeuvre } from "@/lib/types";
import GalerieClient from "@/components/GalerieClient";

export const metadata: Metadata = {
  title: "Galerie - Toutenmel",
  description:
    "Découvrez les créations de Mel : toiles, fluide art, aérographe et customisations uniques.",
  alternates: { canonical: "/galerie" },
  openGraph: { title: "Galerie - Toutenmel", description: "Découvrez les créations de Mel : toiles, fluide art, aérographe et customisations uniques.", url: "/galerie" },
};

export const revalidate = 60; // revalidate every 60 seconds

export default async function Galerie() {
  const { data: oeuvres } = await supabase
    .from("oeuvres")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-20 right-0 w-80 h-80 bg-magenta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-0 w-72 h-72 bg-amber/10 rounded-full blur-3xl" />

      <div className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-7xl font-bold text-center mb-4">
            <span className="gradient-text">Mes créations</span>
          </h1>
          <p className="text-center text-warm-gray mb-12 max-w-xl mx-auto text-lg">
            Chaque œuvre est unique, réalisée avec passion. Cliquez sur une création pour en savoir plus.
          </p>

          <GalerieClient oeuvres={(oeuvres as Oeuvre[]) || []} />
        </div>
      </div>
    </div>
  );
}

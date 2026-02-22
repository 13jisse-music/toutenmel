import FactureFormClient from "@/components/FactureFormClient";

export default function NouvelleFacture() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-warm-brown mb-8">Nouvelle facture</h1>
      <div className="bg-white rounded-2xl p-6 sm:p-8">
        <FactureFormClient />
      </div>
    </div>
  );
}

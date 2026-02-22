"use client";

interface Facture {
  id: string;
  numero: string;
  client_name: string;
  client_email: string;
  items: { description: string; quantity: number; price: number }[];
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  notes: string | null;
  created_at: string;
}

export default function FactureViewClient({ facture }: { facture: Facture }) {
  return (
    <div>
      {/* Print button - hidden on print */}
      <div className="print:hidden mb-6 flex gap-3">
        <button
          onClick={() => window.print()}
          className="bg-gradient-to-r from-coral to-magenta text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-coral/20 transition-all"
        >
          Imprimer / PDF
        </button>
        <a
          href="/admin/factures"
          className="px-6 py-3 rounded-full font-medium border border-cream-dark text-warm-gray hover:bg-cream transition-colors"
        >
          Retour
        </a>
      </div>

      {/* Invoice - printable */}
      <div className="bg-white rounded-2xl p-8 sm:p-12 print:shadow-none print:rounded-none print:p-0 max-w-3xl" id="facture-print">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-heading font-bold text-warm-brown">Toutenmel</h1>
            <p className="text-sm text-warm-gray mt-1">Mel — Artiste peintre</p>
            <p className="text-sm text-warm-gray">toutenmel@gmail.com</p>
            <p className="text-sm text-warm-gray">toutenmel.fr</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold font-mono text-warm-brown">{facture.numero}</p>
            <p className="text-sm text-warm-gray mt-1">
              {new Date(facture.created_at).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className={`text-xs mt-2 px-3 py-1 rounded-full inline-block font-medium ${
              facture.status === "payee"
                ? "bg-turquoise/15 text-turquoise"
                : facture.status === "envoyee"
                ? "bg-amber/15 text-amber"
                : "bg-warm-gray/10 text-warm-gray"
            }`}>
              {facture.status === "payee" ? "Payée" : facture.status === "envoyee" ? "Envoyée" : "Brouillon"}
            </p>
          </div>
        </div>

        {/* Client */}
        <div className="mb-8 bg-cream/30 rounded-xl p-5 print:bg-gray-50">
          <p className="text-xs text-warm-gray uppercase tracking-wider mb-1">Facturé à</p>
          <p className="font-semibold text-warm-brown text-lg">{facture.client_name}</p>
          <p className="text-sm text-warm-gray">{facture.client_email}</p>
        </div>

        {/* Items table */}
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b-2 border-cream-dark">
              <th className="text-left text-xs font-semibold text-warm-gray uppercase tracking-wider pb-3">
                Description
              </th>
              <th className="text-center text-xs font-semibold text-warm-gray uppercase tracking-wider pb-3 w-20">
                Qté
              </th>
              <th className="text-right text-xs font-semibold text-warm-gray uppercase tracking-wider pb-3 w-28">
                Prix unit.
              </th>
              <th className="text-right text-xs font-semibold text-warm-gray uppercase tracking-wider pb-3 w-28">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {facture.items.map((item, index) => (
              <tr key={index} className="border-b border-cream-dark">
                <td className="py-3 text-warm-brown">{item.description}</td>
                <td className="py-3 text-center text-warm-gray">{item.quantity}</td>
                <td className="py-3 text-right text-warm-gray">{item.price} €</td>
                <td className="py-3 text-right font-medium text-warm-brown">
                  {item.quantity * item.price} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-2 border-t-2 border-warm-brown">
              <span className="text-lg font-bold text-warm-brown">Total</span>
              <span className="text-lg font-bold text-warm-brown">{facture.total} €</span>
            </div>
            <p className="text-xs text-warm-gray mt-1">
              TVA non applicable — article 293 B du CGI
            </p>
          </div>
        </div>

        {/* Notes */}
        {facture.notes && (
          <div className="border-t border-cream-dark pt-4 mt-4">
            <p className="text-xs text-warm-gray uppercase tracking-wider mb-1">Notes</p>
            <p className="text-sm text-warm-brown whitespace-pre-wrap">{facture.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-cream-dark pt-6 mt-8 text-center">
          <p className="text-xs text-warm-gray">
            Toutenmel — Mel, artiste peintre autodidacte — toutenmel.fr
          </p>
        </div>
      </div>
    </div>
  );
}

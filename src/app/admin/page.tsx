import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const revalidate = 0; // always fresh data for admin

export default async function AdminDashboard() {
  const [
    { count: totalOeuvres },
    { count: disponibles },
    { count: totalCommandes },
    { count: unreadMessages },
    { data: recentOrders },
    { data: recentMsgs },
  ] = await Promise.all([
    supabaseAdmin.from("oeuvres").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("oeuvres").select("*", { count: "exact", head: true }).eq("status", "disponible"),
    supabaseAdmin.from("commandes").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("messages").select("*", { count: "exact", head: true }).eq("read", false),
    supabaseAdmin.from("commandes").select("*").order("created_at", { ascending: false }).limit(3),
    supabaseAdmin.from("messages").select("*").order("created_at", { ascending: false }).limit(3),
  ]);

  const stats = [
    { label: "Oeuvres en ligne", value: String(totalOeuvres || 0), change: "au total", color: "from-coral to-magenta" },
    { label: "Disponibles", value: String(disponibles || 0), change: "en vente", color: "from-turquoise to-electric-blue" },
    { label: "Commandes", value: String(totalCommandes || 0), change: "au total", color: "from-amber to-orange" },
    { label: "Messages non lus", value: String(unreadMessages || 0), change: "en attente", color: "from-violet to-magenta" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-warm-brown mb-8">
        Bonjour Mel !
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white`}>
            <p className="text-white/80 text-sm font-medium">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
            <p className="text-white/60 text-xs mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-warm-brown">Dernières commandes</h2>
            <Link href="/admin/commandes" className="text-coral text-sm font-medium hover:text-coral-dark">
              Tout voir &rarr;
            </Link>
          </div>
          <div className="space-y-3">
            {(!recentOrders || recentOrders.length === 0) ? (
              <p className="text-warm-gray text-sm py-4">Aucune commande pour le moment.</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-cream-dark last:border-0">
                  <div>
                    <p className="font-medium text-warm-brown">{order.client_name}</p>
                    <p className="text-sm text-warm-gray">{order.type === "achat" ? "Achat boutique" : "Commande personnalisée"}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                      order.status === "Payé" ? "bg-turquoise/15 text-turquoise" :
                      order.status === "En cours" ? "bg-amber/15 text-amber" :
                      "bg-coral/15 text-coral"
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-xs text-warm-gray mt-1">
                      {new Date(order.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent messages */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-warm-brown">Derniers messages</h2>
            <Link href="/admin/messages" className="text-coral text-sm font-medium hover:text-coral-dark">
              Tout voir &rarr;
            </Link>
          </div>
          <div className="space-y-3">
            {(!recentMsgs || recentMsgs.length === 0) ? (
              <p className="text-warm-gray text-sm py-4">Aucun message pour le moment.</p>
            ) : (
              recentMsgs.map((msg) => (
                <div key={msg.id} className={`flex items-center justify-between py-3 border-b border-cream-dark last:border-0 ${!msg.read ? "bg-coral/5 -mx-3 px-3 rounded-lg" : ""}`}>
                  <div className="flex items-center gap-3">
                    {!msg.read && <div className="w-2 h-2 bg-coral rounded-full flex-shrink-0" />}
                    <div>
                      <p className="font-medium text-warm-brown">{msg.from_name}</p>
                      <p className="text-sm text-warm-gray">{msg.subject}</p>
                    </div>
                  </div>
                  <p className="text-xs text-warm-gray">
                    {new Date(msg.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/oeuvres/nouvelle"
          className="bg-gradient-to-r from-coral to-magenta text-white rounded-2xl p-5 text-center hover:shadow-lg hover:shadow-coral/20 transition-all hover:scale-[1.02]"
        >
          <span className="text-2xl block mb-2">+</span>
          <span className="font-medium">Ajouter une oeuvre</span>
        </Link>
        <Link
          href="/admin/commandes"
          className="bg-gradient-to-r from-amber to-orange text-white rounded-2xl p-5 text-center hover:shadow-lg hover:shadow-amber/20 transition-all hover:scale-[1.02]"
        >
          <span className="text-2xl block mb-2">📦</span>
          <span className="font-medium">Gérer les commandes</span>
        </Link>
        <Link
          href="/"
          className="bg-gradient-to-r from-electric-blue to-turquoise text-white rounded-2xl p-5 text-center hover:shadow-lg hover:shadow-turquoise/20 transition-all hover:scale-[1.02]"
        >
          <span className="text-2xl block mb-2">👁</span>
          <span className="font-medium">Voir le site</span>
        </Link>
      </div>
    </div>
  );
}

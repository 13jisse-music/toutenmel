import Link from "next/link";
import Image from "next/image";

const adminNav = [
  { name: "Tableau de bord", href: "/admin", icon: "📊" },
  { name: "Mes oeuvres", href: "/admin/oeuvres", icon: "🎨" },
  { name: "Commandes", href: "/admin/commandes", icon: "📦" },
  { name: "Messages", href: "/admin/messages", icon: "💬" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-warm-brown text-cream flex-shrink-0 hidden md:block">
        <div className="p-6 border-b border-cream/10">
          <Link href="/admin">
            <Image
              src="/logotoutenmel.png"
              alt="Toutenmel"
              width={200}
              height={100}
              className="w-[160px] h-auto mx-auto"
            />
          </Link>
          <p className="text-cream/50 text-xs text-center mt-2">Espace administration</p>
        </div>
        <nav className="p-4 space-y-1">
          {adminNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-cream/70 hover:text-cream hover:bg-cream/10 transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t border-cream/10">
          <div className="flex flex-col gap-2">
            <Link
              href="/admin/logout"
              className="text-cream/50 hover:text-cream transition-colors text-sm"
            >
              Déconnexion
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-cream/50 hover:text-cream transition-colors text-sm"
            >
              &larr; Retour au site
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-warm-brown text-cream px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="font-heading text-xl font-bold text-amber-light">
          Admin Toutenmel
        </Link>
        <Link href="/" className="text-cream/50 text-sm">&larr; Site</Link>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-warm-brown border-t border-cream/10">
        <div className="flex justify-around py-2">
          {adminNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center gap-1 text-cream/60 hover:text-cream transition-colors py-1 px-2"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[10px]">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 md:p-8 p-4 pt-16 md:pt-8 pb-20 md:pb-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}

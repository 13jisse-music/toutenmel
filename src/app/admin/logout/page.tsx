"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth", { method: "DELETE" }).then(() => {
      router.push("/admin/login");
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-cream-dark flex items-center justify-center">
      <p className="text-warm-gray">Déconnexion...</p>
    </div>
  );
}

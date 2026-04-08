"use client";

import { useRouter, usePathname } from "next/navigation";

const PERIODS = [
  { value: "7d", label: "7 jours" },
  { value: "30d", label: "30 jours" },
  { value: "all", label: "Tout" },
] as const;

export function PeriodSelector({ current }: { current: string }) {
  const router = useRouter();
  const pathname = usePathname();

  function handleSelect(value: string) {
    const params = new URLSearchParams();
    params.set("period", value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-1 bg-cream-dark rounded-xl p-1">
      {PERIODS.map((p) => (
        <button
          key={p.value}
          onClick={() => handleSelect(p.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            current === p.value
              ? "bg-warm-brown text-cream"
              : "text-warm-gray hover:text-warm-brown"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

const gradientsByCategory: Record<string, string[]> = {
  Toiles: [
    "from-amber via-orange to-coral",
    "from-magenta via-violet to-electric-blue",
    "from-coral via-magenta to-violet",
  ],
  "Fluide Art": [
    "from-coral via-amber to-lemon",
    "from-magenta via-fuchsia to-coral",
    "from-turquoise via-amber to-coral",
  ],
  Aérographe: [
    "from-orange via-coral to-magenta",
    "from-violet via-magenta to-fuchsia",
    "from-electric-blue via-turquoise to-amber",
  ],
  Customisations: [
    "from-violet via-electric-blue to-turquoise",
    "from-turquoise via-electric-blue to-violet",
    "from-amber via-lemon to-turquoise",
  ],
};

const fallbackGradients = [
  "from-coral via-amber to-lemon",
  "from-magenta via-violet to-electric-blue",
  "from-turquoise via-amber to-coral",
];

export function getGradient(category: string, index: number): string {
  const gradients = gradientsByCategory[category] || fallbackGradients;
  return gradients[index % gradients.length];
}

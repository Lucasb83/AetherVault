// Galería curada de imágenes de fondo. Agregá las tuyas en /public/images/covers/
// y sumalas aquí con un id descriptivo. El frontmatter de cada post referencia
// el `coverImage` por su ruta (ver content/posts/*.mdx).
//
// Sugerencia de fuentes gratuitas de alta calidad mientras armás tu propio banco:
// Unsplash (unsplash.com), Pexels (pexels.com), o generadas con IA.

export interface CoverImage {
  id: string;
  src: string;
  label: string;
  mood: "dark" | "warm" | "cold" | "vivid";
}

export const COVER_GALLERY: CoverImage[] = [
  {
    id: "default",
    src: "/images/covers/default.svg",
    label: "Default — niebla topográfica",
    mood: "dark",
  },
  {
    id: "circuit",
    src: "/images/covers/circuit.svg",
    label: "Circuitos / tech abstracto",
    mood: "cold",
  },
  {
    id: "ember",
    src: "/images/covers/ember.svg",
    label: "Brasas / cálido",
    mood: "warm",
  },
  {
    id: "aurora",
    src: "/images/covers/aurora.svg",
    label: "Aurora / vívido",
    mood: "vivid",
  },
];

export function getCoverById(id: string): CoverImage {
  return COVER_GALLERY.find((c) => c.id === id) || COVER_GALLERY[0];
}

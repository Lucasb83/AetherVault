"use client";

import { useState } from "react";
import Image from "next/image";
import { AlertCircle, Lightbulb, AlertTriangle } from "lucide-react";

export function VideoEmbed({ url, caption }: { url: string; caption?: string }) {
  // Soporta YouTube y Vimeo automáticamente
  const isYoutube = url.includes("youtube.com") || url.includes("youtu.be");
  const embedUrl = isYoutube
    ? url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")
    : url;

  return (
    <figure className="my-8 not-prose">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-line">
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-ink-faint mt-2 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "idea";
  children: React.ReactNode;
}) {
  const config = {
    info: { icon: AlertCircle, color: "border-blue-400/40 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300" },
    warning: { icon: AlertTriangle, color: "border-amber-400/40 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300" },
    idea: { icon: Lightbulb, color: "border-accent/40 bg-accent-soft text-accent" },
  }[type];

  const Icon = config.icon;

  return (
    <div className={`my-6 not-prose rounded-xl border px-5 py-4 flex gap-3 ${config.color}`}>
      <Icon size={20} className="flex-shrink-0 mt-0.5" />
      <div className="text-sm leading-relaxed [&>p]:mb-0">{children}</div>
    </div>
  );
}

export function ImageGallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="my-8 not-prose grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative aspect-square rounded-lg overflow-hidden border border-line hover:border-accent/50 transition-colors"
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8 cursor-zoom-out"
          onClick={() => setActive(null)}
        >
          <Image
            src={images[active].src}
            alt={images[active].alt}
            width={1200}
            height={800}
            className="max-h-[85vh] w-auto rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}

export const mdxComponents = {
  VideoEmbed,
  Callout,
  ImageGallery,
};

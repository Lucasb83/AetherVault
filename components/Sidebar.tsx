"use client";

import React from "react";

interface SidebarProps {
  hoveredImage: string | null;
}

export default function Sidebar({ hoveredImage }: SidebarProps) {
  return (
    <aside className="hidden lg:block w-80 flex-shrink-0 border-l border-line py-12 pl-8 sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto">
      <div className="space-y-8">
        {/* Vista previa de la imagen flotante */}
        <div className="border border-line rounded-lg overflow-hidden bg-bg-card aspect-video flex items-center justify-center relative min-h-[180px]">
          {hoveredImage ? (
            <img
              src={hoveredImage}
              alt="Preview"
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          ) : (
            <div className="text-xs text-ink-faint font-mono p-4 text-center">
              Posa el cursor sobre un artículo para inspeccionar su arte de portada.
            </div>
          )}
        </div>

        {/* Información adicional del archivo */}
        <div className="border border-line rounded-lg p-4 bg-bg-card">
          <h3 className="font-serif text-sm font-medium text-ink mb-2">Sobre el Archivo</h3>
          <p className="text-xs text-ink-dim leading-relaxed">
            AetherVault es un repositorio dinámico de investigaciones autónomas que cubre sistemas complejos, optimizaciones de comportamiento y análisis de percepción sensorial.
          </p>
        </div>
      </div>
    </aside>
  );
}
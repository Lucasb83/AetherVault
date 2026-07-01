"use client";

import React from "react";
import Link from "next/link";
import { Menu, Search, Bell } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#FDFCF8] border-b border-[#E0E0E0] px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
          <Menu className="w-6 h-6 text-[#737373]" />
        </button>
        <Link href="/" className="font-serif text-xl tracking-wide uppercase font-medium text-[#222222]">
          AETHERVAULT
        </Link>
      </div>

      {/* Barra de Búsqueda Integrada */}
      <div className="flex-1 max-w-md mx-8 relative hidden sm:block">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-[#737373]" />
        </div>
        <input
          type="text"
          placeholder="Buscar artículos o etiquetas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-[#E0E0E0] rounded-md text-sm text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#639A67] focus:bg-white transition-colors"
        />
      </div>

      <div className="flex items-center gap-4">
        <Link href="/posts/new" className="px-3 py-1.5 bg-[#639A67] text-white rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors">
          Nuevo Post
        </Link>
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors relative">
          <Bell className="w-5 h-5 text-[#737373]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#639A67] rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
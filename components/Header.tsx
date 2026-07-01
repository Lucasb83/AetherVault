"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "@/lib/useDarkMode";

export default function Header({
  onToggleSidebar,
  onSearch,
}: {
  onToggleSidebar: () => void;
  onSearch: (q: string) => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { dark, toggle, mounted } = useDarkMode();

  return (
    <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur-md border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 rounded-lg hover:bg-bg-soft transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="text-ink-dim" />
        </button>

        <Link
          href="/"
          className="font-serif font-semibold text-xl tracking-tight text-ink hover:text-accent transition-colors"
        >
          AetherVault
        </Link>

        <div className="flex-1" />

        <div className="relative flex items-center gap-1">
          <AnimatePresence>
            {searchOpen && (
              <motion.input
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 240, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  onSearch(e.target.value);
                }}
                placeholder="Buscar posts, tags..."
                className="bg-bg-card border border-line rounded-full px-4 py-2 text-sm mr-1 outline-none focus:border-accent/50 transition-colors text-ink"
              />
            )}
          </AnimatePresence>

          <button
            onClick={() => {
              setSearchOpen((s) => !s);
              if (searchOpen) {
                setQuery("");
                onSearch("");
              }
            }}
            className="p-2 rounded-lg hover:bg-bg-soft transition-colors"
            aria-label="Buscar"
          >
            {searchOpen ? (
              <X size={18} className="text-ink-dim" />
            ) : (
              <Search size={18} className="text-ink-dim" />
            )}
          </button>

          {mounted && (
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-bg-soft transition-colors"
              aria-label="Cambiar tema"
            >
              {dark ? (
                <Sun size={18} className="text-ink-dim" />
              ) : (
                <Moon size={18} className="text-ink-dim" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

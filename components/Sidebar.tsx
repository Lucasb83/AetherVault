"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Home, FileText, Hash, Clock, Shuffle, TrendingUp } from "lucide-react";

interface SidebarProps {
  open: boolean;
  tags: { tag: string; count: number }[];
  activeTag: string | null;
  onSelectTag: (tag: string | null) => void;
  sortBy: "recent" | "oldest" | "random";
  onSortChange: (sort: "recent" | "oldest" | "random") => void;
}

export default function Sidebar({
  open,
  tags,
  activeTag,
  onSelectTag,
  sortBy,
  onSortChange,
}: SidebarProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: -280, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -280, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-0 top-16 bottom-0 w-64 z-30 bg-bg border-r border-line overflow-y-auto"
        >
          <div className="py-6">
            <nav className="px-3 space-y-0.5 mb-6">
              <SidebarLink icon={<Home size={17} />} label="Inicio" active />
              <SidebarLink icon={<FileText size={17} />} label="Todos los posts" />
            </nav>

            <div className="px-6 mb-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint mb-2 flex items-center gap-1.5">
                <TrendingUp size={12} /> Ordenar
              </h3>
              <div className="space-y-0.5 -mx-3">
                <SortButton
                  active={sortBy === "recent"}
                  onClick={() => onSortChange("recent")}
                  icon={<Clock size={14} />}
                  label="Más recientes"
                />
                <SortButton
                  active={sortBy === "oldest"}
                  onClick={() => onSortChange("oldest")}
                  icon={<Clock size={14} />}
                  label="Más antiguos"
                />
                <SortButton
                  active={sortBy === "random"}
                  onClick={() => onSortChange("random")}
                  icon={<Shuffle size={14} />}
                  label="Sorpréndeme"
                />
              </div>
            </div>

            <div className="px-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint mb-3 flex items-center gap-1.5">
                <Hash size={12} /> Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                <TagPill
                  label="Todos"
                  active={activeTag === null}
                  onClick={() => onSelectTag(null)}
                />
                {tags.map(({ tag, count }) => (
                  <TagPill
                    key={tag}
                    label={tag}
                    count={count}
                    active={activeTag === tag}
                    onClick={() => onSelectTag(tag)}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function SidebarLink({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 text-sm px-3 py-2 rounded-lg transition-colors font-medium ${
        active
          ? "bg-accent-soft text-accent"
          : "text-ink-dim hover:bg-bg-soft hover:text-ink"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function SortButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 text-sm px-6 py-1.5 transition-colors ${
        active ? "text-accent font-medium" : "text-ink-dim hover:text-ink"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function TagPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
        active
          ? "bg-accent text-white border-accent font-medium"
          : "border-line text-ink-dim hover:border-accent/50 hover:text-ink"
      }`}
    >
      {label} {count !== undefined && <span className="opacity-60">{count}</span>}
    </button>
  );
}

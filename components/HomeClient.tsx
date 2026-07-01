"use client";

import { useState, useMemo } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import PostCard from "./PostCard";
import DynamicBackground from "./DynamicBackground";
import { searchPosts } from "@/lib/search";

export interface PostMeta {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  coverImage?: string;
  [key: string]: any; // Para que no moleste si hay otras propiedades
}

export default function HomeClient({
  posts,
  tags,
}: {
  posts: PostMeta[];
  tags: { tag: string; count: number }[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "oldest" | "random">("recent");
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = query ? searchPosts(posts, query) : posts;
    if (activeTag) result = result.filter((p) => p.tags.includes(activeTag));

    if (sortBy === "oldest") result = [...result].reverse();
    if (sortBy === "random") result = [...result].sort(() => Math.random() - 0.5);

    return result;
  }, [posts, query, activeTag, sortBy]);

  const defaultBg = posts[0]?.coverImage || "/images/covers/default.svg";

  return (
    <>
      <DynamicBackground imageSrc={hoveredImage || defaultBg} />

      <Header onToggleSidebar={() => setSidebarOpen((s) => !s)} onSearch={setQuery} />

      <Sidebar
        open={sidebarOpen}
        tags={tags}
        activeTag={activeTag}
        onSelectTag={setActiveTag}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <main
        className={`max-w-3xl mx-auto px-4 sm:px-6 py-10 transition-all duration-300 ${
          sidebarOpen ? "sm:ml-64" : ""
        }`}
      >
        <div className="mb-8 animate-fade-in">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-ink mb-1">
            AetherVault
          </h1>
          <p className="text-ink-dim text-sm">
            Notas, ideas y exploraciones. Pasá el cursor sobre un post para ver su mundo.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <SortTab active={sortBy === "recent"} onClick={() => setSortBy("recent")} label="Recientes" />
          <SortTab active={sortBy === "oldest"} onClick={() => setSortBy("oldest")} label="Antiguos" />
          <SortTab active={sortBy === "random"} onClick={() => setSortBy("random")} label="Sorpréndeme" />
        </div>

        {filtered.length === 0 ? (
          <p className="text-ink-faint italic py-8">No encontré nada con esos filtros.</p>
        ) : (
          <div className="mt-2">
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} onHover={setHoveredImage} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

function SortTab({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-sm px-4 py-1.5 rounded-full transition-colors font-medium ${
        active
          ? "bg-accent text-white"
          : "bg-bg-card border border-line text-ink-dim hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

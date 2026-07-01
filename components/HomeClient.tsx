"use client";

import React, { useState, useEffect } from "react";
import PostCard, { PostMeta } from "./PostCard";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { searchPosts } from "@/lib/search";
import { createClient } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function HomeClient() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const formattedPosts: PostMeta[] = (data || []).map((p: any) => ({
          slug: p.slug,
          title: p.title,
          date: p.created_at,
          excerpt: p.excerpt,
          coverImage: p.cover_image,
          readingTime: p.reading_time,
          tags: p.tags,
        }));

        setPosts(formattedPosts);
      } catch (err) {
        console.error("Error cargando artículos:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const filteredPosts = searchPosts(posts, searchQuery);

  return (
    <div className="min-h-screen bg-bg text-ink font-sans flex flex-col antialiased selection:bg-accent selection:text-white">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="flex-1 max-w-7xl w-full mx-auto flex relative px-4 sm:px-6 lg:px-8 gap-8">
        
        <main className="flex-1 py-12 max-w-3xl min-w-0">
          <div className="mb-8 border-b border-line pb-2 flex items-center justify-between">
            <h1 className="font-serif text-2xl font-medium tracking-tight">Investigaciones Recientes</h1>
            <span className="text-xs text-ink-faint font-mono uppercase tracking-wider">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'artículo' : 'artículos'}
            </span>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-ink-faint gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
              <span className="text-sm font-mono">Sincronizando con el archivo...</span>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="flex flex-col">
              {filteredPosts.map((post: PostMeta, index: number) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  index={index}
                  onHover={setHoveredImage}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-line rounded-lg bg-bg-card">
              <p className="text-sm text-ink-dim font-medium">No se encontraron artículos coincidentes.</p>
              <p className="text-xs text-ink-faint mt-1">Intenta con otra palabra clave o etiqueta.</p>
            </div>
          )}
        </main>

        <Sidebar hoveredImage={hoveredImage} />
      </div>
    </div>
  );
}
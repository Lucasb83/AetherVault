"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { PostMeta } from "@/lib/posts";

// "Karma" acá es puramente decorativo (no hay sistema de votos real, según lo
// definido). Se deriva de forma estable a partir del slug para que cada post
// muestre siempre el mismo número, simulando el aspecto visual de LessWrong.
function fakeKarma(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) % 999;
  return 10 + (hash % 200);
}

export default function PostCard({
  post,
  index,
  onHover,
}: {
  post: PostMeta;
  index: number;
  onHover: (img: string | null) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      onMouseEnter={() => onHover(post.coverImage)}
      onMouseLeave={() => onHover(null)}
    >
      <Link href={`/posts/${post.slug}`} className="group block">
        <div className="flex items-start gap-4 py-4 px-2 -mx-2 rounded-lg hover:bg-bg-card transition-colors duration-200 border-b border-line last:border-b-0">
          <div className="flex-shrink-0 w-11 h-9 rounded-md bg-karma-bg text-karma-text flex items-center justify-center text-sm font-semibold mt-0.5">
            {fakeKarma(post.slug)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-serif text-lg sm:text-xl font-medium text-ink group-hover:text-accent transition-colors leading-snug">
                {post.title}
              </h2>
              <span className="flex-shrink-0 text-xs text-ink-faint whitespace-nowrap">
                {format(new Date(post.date), "d MMM", { locale: es })}
              </span>
            </div>

            <p className="text-sm text-ink-dim mt-1 line-clamp-1">{post.excerpt}</p>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-ink-faint">{post.readingTime} min</span>
              {post.tags.length > 0 && (
                <div className="flex gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-bg-soft text-ink-faint group-hover:text-accent group-hover:bg-accent-soft transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

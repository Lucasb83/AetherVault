import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { mdxComponents } from "@/components/MDXComponents";
import PostBackground from "@/components/PostBackground";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <PostBackground imageSrc={post.coverImage} />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink-dim hover:text-accent transition-colors mb-10"
        >
          <ArrowLeft size={16} /> Volver
        </Link>

        <header className="mb-10 animate-slide-up">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full bg-accent-soft text-accent"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-medium leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-ink-faint">
            <time>{format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: es })}</time>
            <span>·</span>
            <span>{post.readingTime} min de lectura</span>
          </div>
        </header>

        <article className="prose-custom animate-fade-in">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
              },
            }}
          />
        </article>
      </div>
    </>
  );
}

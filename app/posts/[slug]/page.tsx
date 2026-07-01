import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface PostData {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  author: string;
  reading_time: number;
  tags: string[];
  created_at: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = createClient();

  // Consultar el artículo específico en Supabase
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  // Si no existe o hay error, lanzar 404
  if (error || !post) {
    notFound();
  }

  const typedPost = post as PostData;

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#222222] font-sans selection:bg-[#639A67] selection:text-white">
      {/* Barra superior de navegación */}
      <header className="border-b border-[#E0E0E0] px-4 py-4 max-w-4xl mx-auto flex items-center justify-between">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-[#737373] hover:text-[#222222] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Volver al inicio
        </Link>
        <span className="font-serif text-sm tracking-wide uppercase font-medium text-[#737373]">
          AETHERVAULT
        </span>
      </header>

      {/* Contenido del Artículo */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <article>
          {/* Metadata superior */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#737373] mb-6">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {typedPost.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {format(new Date(typedPost.created_at), "d 'de' MMMM, yyyy", { locale: es })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {typedPost.reading_time} min de lectura
            </span>
          </div>

          {/* Título Principal */}
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#222222] leading-tight mb-8">
            {typedPost.title}
          </h1>

          {/* Imagen de portada si existe */}
          {typedPost.cover_image && (
            <div className="mb-10 rounded-lg overflow-hidden border border-[#E0E0E0]">
              <img 
                src={typedPost.cover_image} 
                alt={typedPost.title} 
                className="w-full h-auto object-cover max-h-[400px]"
              />
            </div>
          )}

          {/* Renderizado del contenido HTML inyectado de Tiptap */}
          <div 
            className="prose prose-serif max-w-none text-lg leading-relaxed text-[#222222] 
              prose-p:mb-6 prose-p:font-serif
              prose-headings:font-serif prose-headings:font-medium prose-headings:text-[#222222]
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
              prose-blockquote:border-l-4 prose-blockquote:border-[#639A67] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-[#737373] prose-blockquote:mb-6
              outline-none focus:outline-none"
            dangerouslySetInnerHTML={{ __html: typedPost.content }}
          />

          {/* Etiquetas inferiores */}
          {typedPost.tags && typedPost.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-6 border-t border-[#E0E0E0]">
              {typedPost.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 border border-[#E0E0E0] rounded-full text-xs text-[#737373] bg-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "@/app/globals.css";
import { 
  Menu, 
  Search, 
  Compass, 
  List, 
  Tag, 
  BookOpen, 
  Globe 
} from "lucide-react";

// Fuente Sans-Serif para la interfaz de usuario
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Fuente Serif para títulos y contenido de lectura
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
  title: "Aethervault",
  description: "An online forum and community dedicated to improving human reasoning and decision-making.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} font-sans min-h-screen flex flex-col selection:bg-[#639A67] selection:text-white`}>
        
        {/* CABECERA SUPERIOR (NAVBAR) */}
        <header className="sticky top-0 z-50 bg-[#FDFCF8] border-b border-[#E0E0E0] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
              <Menu className="w-6 h-6 text-[#737373]" />
            </button>
            <span className="font-serif text-xl tracking-wide uppercase font-medium">
              AETHERVAULT
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
              <Search className="w-5 h-5 text-[#737373]" />
            </button>
            <button className="px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors text-sm font-medium">
              LOGIN
            </button>
          </div>
        </header>

        {/* CONTENEDOR PRINCIPAL: SIDEBAR + CONTENIDO */}
        <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
          
          {/* BARRA LATERAL IZQUIERDA (SIDEBAR) */}
          <aside className="w-64 hidden md:block flex-shrink-0 py-6 px-2 border-r border-[#E0E0E0] min-h-[calc(100vh-65px)] sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto">
            <nav className="flex flex-col gap-1 text-sm text-[#737373]">
              
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 hover:text-[#222222] transition-colors">
                <Compass className="w-4 h-4" />
                <span className="font-medium text-[#222222]">Home</span>
              </a>
              
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 hover:text-[#222222] transition-colors">
                <List className="w-4 h-4" />
                <span>All Posts</span>
              </a>

              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 hover:text-[#222222] transition-colors">
                <Tag className="w-4 h-4" />
                <span>Concepts</span>
              </a>

              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 hover:text-[#222222] transition-colors">
                <BookOpen className="w-4 h-4" />
                <span className="font-medium text-[#222222]">Library</span>
              </a>

              {/* Sub-items de Library */}
              <div className="flex flex-col pl-10 gap-1 mt-1 mb-2">
                <a href="#" className="py-1 hover:text-[#222222] transition-colors">Best of Aethervault</a>
                <a href="#" className="py-1 hover:text-[#222222] transition-colors">Sequence Highlights</a>
                <a href="#" className="py-1 hover:text-[#222222] transition-colors">Rationality: A-Z</a>
                <a href="#" className="py-1 hover:text-[#222222] transition-colors">The Codex</a>
                <a href="#" className="py-1 hover:text-[#222222] transition-colors">HPMOR</a>
              </div>

              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 hover:text-[#222222] transition-colors mt-2">
                <Globe className="w-4 h-4" />
                <span className="font-medium text-[#222222]">Community Events</span>
              </a>

              {/* Eventos estáticos de ejemplo */}
              <div className="flex flex-col pl-10 gap-3 mt-2 text-xs mb-6">
                <a href="#" className="hover:text-[#222222] transition-colors block">
                  <div className="text-[#222222]">Weekly VRChat Meetup</div>
                  <div className="text-gray-500">Sun Jul 5 • Online</div>
                </a>
                <a href="#" className="hover:text-[#222222] transition-colors block">
                  <div className="text-[#222222]">Gothenburg Aethervault...</div>
                  <div className="text-gray-500">Thu Jul 23 • Göteborg</div>
                </a>
                <a href="#" className="hover:text-[#222222] transition-colors block">
                  <div className="text-[#222222]">[Today] Monday Social...</div>
                  <div className="text-gray-500">Tue Jun 30 • Houston</div>
                </a>
              </div>

              {/* Enlaces inferiores */}
              <div className="flex flex-col px-3 mt-4 gap-2 text-xs">
                <a href="#" className="hover:text-[#222222] transition-colors">Subscribe (RSS/Email)</a>
                <a href="#" className="hover:text-[#222222] transition-colors">Aethervault the Album</a>
                <a href="#" className="hover:text-[#222222] transition-colors">Leaderboard</a>
                <a href="#" className="hover:text-[#222222] transition-colors">About</a>
                <a href="#" className="hover:text-[#222222] transition-colors">FAQ</a>
              </div>
            </nav>
          </aside>

          {/* AREA PRINCIPAL DE CONTENIDO */}
          <main className="flex-1 w-full min-w-0">
            {children}
          </main>
          
        </div>
      </body>
    </html>
  );
}
import { Settings, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 md:px-8">
      
      {/* 1. TARJETA DE POST DESTACADO */}
      <section className="relative w-full h-[320px] rounded-lg overflow-hidden mb-12 shadow-sm border border-[#E0E0E0] bg-white">
        {/* Fondo abstracto de acuarela */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-orange-100 to-red-200 opacity-60"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center p-10 max-w-2xl">
          <div className="text-sm text-gray-600 mb-2 font-serif italic">Best of Aethervault 2020</div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-[#222222] mb-4 leading-tight uppercase">
            The Date of AI Takeover is Not the Day the AI Takes Over
          </h1>
          <p className="text-[#222222] font-sans text-sm md:text-base mb-6 leading-relaxed">
            Instead, it's the point of no return—the day we AI risk reducers lose the ability to significantly reduce AI risk. This might happen years before classic milestones like "World GWP doubles in four years" and "Superhuman AGI is deployed."
          </p>
          <div className="text-sm font-sans text-gray-600 mb-4">
            by <span className="text-[#639A67] font-medium">Daniel Kokotajlo</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded border border-[#E0E0E0] text-sm text-[#222222]">
            <span className="font-medium mr-2">Zack_M_Davis</span>
            <span className="text-gray-600">This post is making a valid point (the time to intervene to prevent an outcome that would otherw...</span>
          </div>
        </div>
      </section>

      {/* 2. CONTROLES DEL FEED */}
      <div className="flex items-center justify-between mb-6 border-b border-[#E0E0E0] pb-2">
        <div className="flex gap-2">
          <button className="px-4 py-1.5 bg-[#639A67] text-white rounded text-sm font-medium shadow-sm">
            Recent
          </button>
          <button className="px-4 py-1.5 text-[#737373] hover:bg-gray-100 rounded text-sm font-medium transition-colors">
            Enriched ✨
          </button>
          <button className="px-4 py-1.5 text-[#737373] hover:bg-gray-100 rounded text-sm font-medium transition-colors">
            Recommended ✨
          </button>
        </div>
        <button className="p-1.5 text-[#737373] hover:bg-gray-100 rounded transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* 3. LISTA DE POSTS (FEED) */}
      <div className="flex flex-col">
        
        {/* Post Item 1 */}
        <article className="flex items-center py-4 border-b border-[#E0E0E0] hover:bg-gray-50 transition-colors group px-2 rounded-md">
          <div className="w-12 text-right text-gray-400 font-sans text-sm font-medium pr-4">
            533
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <h2 className="text-lg font-serif text-[#222222] truncate cursor-pointer group-hover:underline decoration-gray-300">
              Welcome to Aethervault!
            </h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500 font-sans flex-shrink-0">
            <span>Ruby, Raemon, RobertM, habryka</span>
            <span>7y</span>
            <div className="flex items-center justify-center w-8 h-6 bg-gray-200 text-gray-600 rounded text-xs font-medium">
              85
            </div>
          </div>
        </article>

        {/* Post Item 2 */}
        <article className="flex items-center py-4 border-b border-[#E0E0E0] hover:bg-gray-50 transition-colors group px-2 rounded-md">
          <div className="w-12 text-right flex justify-end items-center gap-1 text-gray-400 font-sans text-sm font-medium pr-4">
            269 <Star className="w-3 h-3 fill-gray-300" />
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <h2 className="text-lg font-serif text-[#222222] truncate cursor-pointer group-hover:underline decoration-gray-300">
              Trees are mostly made of air and a generalizable lesson for AI safety
            </h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500 font-sans flex-shrink-0">
            <span>Zephaniah Roe</span>
            <span>4d</span>
            <div className="flex items-center justify-center w-8 h-6 bg-gray-200 text-gray-600 rounded text-xs font-medium">
              56
            </div>
          </div>
        </article>

        {/* Post Item 3 */}
        <article className="flex items-center py-4 border-b border-[#E0E0E0] hover:bg-gray-50 transition-colors group px-2 rounded-md">
          <div className="w-12 text-right flex justify-end items-center gap-1 text-gray-400 font-sans text-sm font-medium pr-4">
            157 <Star className="w-3 h-3 fill-gray-300" />
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <h2 className="text-lg font-serif text-[#222222] truncate cursor-pointer group-hover:underline decoration-gray-300 flex items-center gap-2">
              Guardian Angels: LLM Personalization for Productivity and Security
              <span className="text-gray-400">🔗</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500 font-sans flex-shrink-0">
            <span>gwern</span>
            <span>8d</span>
            <div className="flex items-center justify-center w-8 h-6 bg-gray-200 text-gray-600 rounded text-xs font-medium">
              34
            </div>
          </div>
        </article>

        {/* Post Item 4 */}
        <article className="flex items-center py-4 border-b border-[#E0E0E0] hover:bg-gray-50 transition-colors group px-2 rounded-md">
          <div className="w-12 text-right text-gray-400 font-sans text-sm font-medium pr-4">
            325
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <h2 className="text-lg font-serif text-[#222222] truncate cursor-pointer group-hover:underline decoration-gray-300">
              Surprising facts about the slave trade
            </h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500 font-sans flex-shrink-0">
            <span>Joseph Miller</span>
            <span>4d</span>
            <div className="flex items-center justify-center w-8 h-6 bg-gray-200 text-gray-600 rounded text-xs font-medium">
              25
            </div>
          </div>
        </article>

        {/* Post Item 5 */}
        <article className="flex items-center py-4 border-b border-[#E0E0E0] hover:bg-gray-50 transition-colors group px-2 rounded-md">
          <div className="w-12 text-right text-gray-400 font-sans text-sm font-medium pr-4">
            333
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <h2 className="text-lg font-serif text-[#222222] truncate cursor-pointer group-hover:underline decoration-gray-300">
              AI pause: the case for ASAP
            </h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500 font-sans flex-shrink-0">
            <span>KatjaGrace</span>
            <span>5d</span>
            <div className="flex items-center justify-center w-8 h-6 bg-gray-200 text-gray-600 rounded text-xs font-medium">
              35
            </div>
          </div>
        </article>
        
      </div>
    </div>
  );
}
'use client'

import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { createClient } from '@/lib/supabase';
import { 
  Menu, Search, Star, Bell, Settings, Edit3, Send, Users, 
  ChevronRight, ChevronDown, HelpCircle, Loader2
} from 'lucide-react';

export default function CreatePostPage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isWikitagsOpen, setIsWikitagsOpen] = useState(true);
  
  // Estado del formulario
  const [title, setTitle] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Inicializar Tiptap
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Type here! Use '/' for editor commands.",
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'w-full min-h-[500px] bg-transparent font-serif text-lg leading-relaxed text-[#222222] border-none outline-none focus:ring-0',
      },
    },
  });

  // Función para guardar en Supabase
  const handlePublish = async () => {
    if (!editor) return;
    const content = editor.getHTML();
    
    // Evitar envíos vacíos
    if (!title.trim() && (editor.isEmpty || content === '<p></p>')) return;
    
    setIsPublishing(true);
    setPublishStatus('idle');

    try {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('posts')
        .insert([
          { 
            title: title || 'Untitled Draft', 
            content: content,
            status: 'DRAFT',
            author: 'Lucas Bianchi' 
          }
        ]);

      if (error) throw error;

      setPublishStatus('success');
      
      // Limpiar el formulario después del éxito
      setTimeout(() => {
        setPublishStatus('idle');
        setTitle('');
        editor.commands.setContent('');
      }, 3000);

    } catch (error) {
      console.error("Error al guardar el post:", error);
      setPublishStatus('error');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#222222] font-sans flex flex-col selection:bg-[#639A67] selection:text-white">
      
      {/* 1. Cabecera Superior */}
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
            Lucas Bianchi
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors relative">
            <Bell className="w-5 h-5 text-[#737373]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#639A67] rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Contenedor Principal */}
      <main className="flex-1 flex w-full max-w-7xl mx-auto relative">
        
        {/* 2. Área de Trabajo Central (Editor) */}
        <div className="flex-1 px-8 py-16 max-w-3xl mx-auto w-full relative">
          
          {/* Alertas de estado */}
          {publishStatus === 'success' && (
            <div className="absolute top-4 left-8 right-8 bg-[#639A67] text-white px-4 py-2 rounded shadow-sm text-sm font-medium text-center transition-all">
              Draft saved successfully to Supabase!
            </div>
          )}
          {publishStatus === 'error' && (
            <div className="absolute top-4 left-8 right-8 bg-red-500 text-white px-4 py-2 rounded shadow-sm text-sm font-medium text-center transition-all">
              Error saving post. Check console.
            </div>
          )}

          <input 
            type="text" 
            placeholder="Untitled Draft" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent font-serif text-5xl font-medium text-[#222222] placeholder-gray-300 border-none outline-none mb-4 focus:ring-0"
          />
          
          <div className="flex items-center gap-2 text-sm text-[#737373] font-sans mb-12">
            <span>by <strong className="text-[#222222] font-medium">Lucas Bianchi</strong></span>
            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">Draft</span>
            <button className="hover:text-[#222222] transition-colors">+ Linkpost</button>
          </div>

          {/* Instancia del Editor Tiptap */}
          <style dangerouslySetInnerHTML={{__html: `
            .is-editor-empty:first-child::before {
              content: attr(data-placeholder);
              float: left;
              color: #9ca3af;
              pointer-events: none;
              height: 0;
            }
          `}} />
          <EditorContent editor={editor} />

        </div>

        {/* 3. Barra de Herramientas Flotante */}
        <div className="fixed right-8 top-32 flex flex-col gap-3 z-40">
          <button 
            onClick={handlePublish}
            disabled={isPublishing}
            className="w-10 h-10 rounded-full bg-[#639A67] text-white flex items-center justify-center hover:bg-opacity-90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            title="Save Draft"
          >
            {isPublishing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4 ml-1" />
            )}
          </button>
          <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`w-10 h-10 rounded-full border border-[#E0E0E0] flex items-center justify-center transition-all shadow-sm ${isSettingsOpen ? 'bg-[#222222] text-white' : 'bg-white text-[#737373] hover:bg-gray-50'}`}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* 4. Panel Lateral de Configuración (Settings) */}
        {isSettingsOpen && (
          <aside className="w-80 bg-white border-l border-[#E0E0E0] min-h-full flex flex-col shadow-sm fixed right-0 top-[65px] h-[calc(100vh-65px)] overflow-y-auto z-30 pt-4">
            <div className="border-b border-[#E0E0E0]">
              <button 
                onClick={() => setIsWikitagsOpen(!isWikitagsOpen)}
                className="w-full px-6 py-4 flex items-center justify-between text-[#737373] hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium">Wikitags</span>
                {isWikitagsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              
              {isWikitagsOpen && (
                <div className="px-6 pb-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 border border-[#E0E0E0] rounded-full text-xs text-[#737373]">Rationality</span>
                  <span className="px-3 py-1 border border-[#E0E0E0] rounded-full text-xs text-[#737373]">AI</span>
                </div>
              )}
            </div>
          </aside>
        )}

      </main>
    </div>
  );
}
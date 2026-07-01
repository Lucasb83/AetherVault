"use client";

// Preview liviano client-side. No es el mismo pipeline que el render final
// (que usa next-mdx-remote/rsc en el server), pero da una vista fiel del
// Markdown mientras escribís. Los componentes custom (<Callout>, <VideoEmbed>,
// <ImageGallery>) se muestran como placeholders aquí; se ven completos al
// publicar y abrir el post real.

import { useMemo } from "react";

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  let html = "";
  let inCodeBlock = false;
  let inList = false;
  let inCustomComponent = false;

  for (const rawLine of lines) {
    const line = rawLine;

    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      html += inCodeBlock ? "<pre><code>" : "</code></pre>";
      continue;
    }
    if (inCodeBlock) {
      html += escapeHtml(line) + "\n";
      continue;
    }

    // Componentes custom: mostramos como bloque destacado placeholder
    if (/^<(Callout|VideoEmbed|ImageGallery)/.test(line.trim())) {
      inCustomComponent = true;
      html += `<div style="border:1px dashed #0d7a7a; border-radius:8px; padding:12px; margin:16px 0; color:#0d7a7a; font-size:0.85em;">▸ Componente: ${escapeHtml(
        line.trim()
      )}`;
      if (line.includes("/>") || line.trim().endsWith(">")) {
        if (!line.includes("</")) continue;
      }
      continue;
    }
    if (inCustomComponent) {
      if (line.trim().startsWith("</")) {
        html += `</div>`;
        inCustomComponent = false;
      } else {
        html += `<div style="padding-left:12px;">${escapeHtml(line)}</div>`;
      }
      continue;
    }

    if (line.startsWith("### ")) {
      html += `<h3>${renderInline(line.slice(4))}</h3>`;
      continue;
    }
    if (line.startsWith("## ")) {
      html += `<h2>${renderInline(line.slice(3))}</h2>`;
      continue;
    }
    if (line.startsWith("# ")) {
      html += `<h1>${renderInline(line.slice(2))}</h1>`;
      continue;
    }
    if (line.startsWith("> ")) {
      html += `<blockquote>${renderInline(line.slice(2))}</blockquote>`;
      continue;
    }
    if (/^[-*]\s/.test(line)) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${renderInline(line.replace(/^[-*]\s/, ""))}</li>`;
      continue;
    } else if (inList) {
      html += "</ul>";
      inList = false;
    }

    if (line.trim() === "") {
      html += "";
      continue;
    }

    html += `<p>${renderInline(line)}</p>`;
  }

  if (inList) html += "</ul>";
  return html;
}

export default function SimpleMDXPreview({ content }: { content: string }) {
  const html = useMemo(() => markdownToHtml(content), [content]);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

"use client";

import React from "react";

interface Props {
  content: string;
}

export default function MarkdownContent({ content }: Props) {
  if (!content) return null;

  // Separa el texto por bloques de líneas
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = (keyPrefix: string) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`${keyPrefix}-list`} className="space-y-1.5 my-2 pl-1">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed">
              <span className="text-[#00B2E3] font-bold select-none">•</span>
              <span className="flex-1">{formatInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Detección de elemento de lista con guión o asterisco
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      currentList.push(trimmed.slice(2));
    } else {
      flushList(`pre-${index}`);
      if (trimmed.length > 0) {
        // Encabezados estilo markdown (#, ##, ###)
        if (trimmed.startsWith("### ")) {
          elements.push(
            <h4 key={index} className="text-sm font-bold text-[#010d3d] mt-2 mb-1">
              {formatInline(trimmed.slice(4))}
            </h4>
          );
        } else if (trimmed.startsWith("## ") || trimmed.startsWith("# ")) {
          elements.push(
            <h3 key={index} className="text-base font-bold text-[#010d3d] mt-2 mb-1">
              {formatInline(trimmed.replace(/^#+\s*/, ""))}
            </h3>
          );
        } else {
          elements.push(
            <p key={index} className="text-sm leading-relaxed text-gray-800 my-1">
              {formatInline(line)}
            </p>
          );
        }
      }
    }
  });

  flushList("final");

  return <div className="space-y-1">{elements}</div>;
}

/**
 * Formatea estilos en línea: negrita (**texto**), enlaces ([texto](url)) e inline code (`code`)
 */
function formatInline(text: string): React.ReactNode[] {
  // Regex para emparejar enlaces [label](url), negrita **bold** o código `code`
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={i} className="font-bold text-[#010d3d]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code key={i} className="bg-gray-100 text-[#00B2E3] font-mono text-xs px-1.5 py-0.5 rounded">
          {part.slice(1, -1)}
        </code>
      );
    }

    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      return (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00B2E3] hover:underline font-medium inline-flex items-center gap-0.5"
        >
          {label}
        </a>
      );
    }

    return <span key={i}>{part}</span>;
  });
}

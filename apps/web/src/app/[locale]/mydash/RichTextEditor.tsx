'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { Extension } from '@tiptap/core';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback, useState, useEffect, useRef } from 'react';

// ─── Color Palette ───────────────────────────────────────────
const COLOR_PALETTE = [
  '#000000','#434343','#666666','#999999','#B7B7B7','#CCCCCC','#D9D9D9','#FFFFFF',
  '#FF0000','#FF4500','#FF7F00','#FFD700','#ADFF2F','#00FF00','#00FF7F','#00BFFF',
  '#1E90FF','#0000FF','#8A2BE2','#FF00FF','#FF69B4','#FF1493','#DC143C','#B22222',
  '#8B4513','#D2691E','#DAA520','#808000','#006400','#008080','#00008B','#4B0082',
  '#800080','#C71585','#A52A2A','#FFA500','#FFFF00','#32CD32','#20B2AA','#4169E1',
];

// ─── Font Configuration ──────────────────────────────────────
const FONT_SIZES = ['10px', '11px', '12px', '13px', '14px', '15px', '16px', '17px', '18px', '19px', '20px'];
const FONT_FAMILIES = [
  { label: 'System UI', value: '' },
  { label: 'Inter', value: 'Inter, sans-serif' },
  { label: 'Poppins', value: 'Poppins, sans-serif' },
  { label: 'Roboto', value: 'Roboto, sans-serif' },
  { label: 'Montserrat', value: 'Montserrat, sans-serif' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Helvetica', value: 'Helvetica, sans-serif' },
  { label: 'Helvetica Neue', value: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
  { label: 'Segoe UI', value: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif' },
  { label: 'Open Sans', value: '"Open Sans", sans-serif' },
  { label: 'Lato', value: 'Lato, sans-serif' },
  { label: 'Nunito', value: 'Nunito, sans-serif' },
  { label: 'Nunito Sans', value: '"Nunito Sans", sans-serif' },
  { label: 'Raleway', value: 'Raleway, sans-serif' },
  { label: 'Ubuntu', value: 'Ubuntu, sans-serif' },
  { label: 'Roboto Slab', value: '"Roboto Slab", serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { label: 'Garamond', value: 'Garamond, serif' },
  { label: 'Merriweather', value: 'Merriweather, serif' },
  { label: 'Playfair Display', value: '"Playfair Display", serif' },
  { label: 'Courier New', value: '"Courier New", Courier, monospace' },
  { label: 'Consolas', value: 'Consolas, monospace' },
  { label: 'Monaco', value: 'Monaco, monospace' },
  { label: 'Fira Code', value: '"Fira Code", monospace' },
  { label: 'JetBrains Mono', value: '"JetBrains Mono", monospace' },
];

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() { return { types: ['textStyle'] }; },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize: fontSize => ({ chain }) => chain().setMark('textStyle', { fontSize }).run(),
      unsetFontSize: () => ({ chain }) => chain().setMark('textStyle', { fontSize: null }).run(),
    };
  },
});

function sanitizePasted(html: string): string {
  if (typeof window === 'undefined') return html;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const ALLOWED = new Set(['P','BR','STRONG','B','U','SPAN','UL','OL','LI','DIV']);
  function clean(el: Element) {
    Array.from(el.children).forEach((child) => {
      if (!ALLOWED.has(child.tagName)) {
        child.replaceWith(document.createTextNode(child.textContent || ''));
      } else {
        Array.from(child.attributes).forEach((a) => {
          if (a.name === 'style') {
            const kept = a.value.split(';').filter(s => {
              const t = s.trim();
              return t.startsWith('color') || t.startsWith('font-size') || t.startsWith('font-family');
            }).join(';');
            kept ? child.setAttribute('style', kept) : child.removeAttribute('style');
          } else {
            child.removeAttribute(a.name);
          }
        });
        clean(child);
      }
    });
  }
  clean(doc.body);
  return doc.body.innerHTML;
}

// ─── Mixed-state detection ───────────────────────────────────
function getMarkState(editor: Editor, mark: string): 'active' | 'mixed' | 'inactive' {
  const { from, to, empty } = editor.state.selection;
  if (empty) return editor.isActive(mark) ? 'active' : 'inactive';
  let has = false, hasNot = false;
  editor.state.doc.nodesBetween(from, to, (node) => {
    if (node.isText) {
      node.marks.some(m => m.type.name === mark) ? (has = true) : (hasNot = true);
    }
  });
  if (has && hasNot) return 'mixed';
  return has ? 'active' : 'inactive';
}

function getTextStyleState(editor: Editor, property: 'color' | 'fontFamily' | 'fontSize'): string | 'mixed' | null {
  const { from, to, empty } = editor.state.selection;
  if (empty) return editor.getAttributes('textStyle')[property] ?? null;
  const values = new Set<string | null>();
  editor.state.doc.nodesBetween(from, to, (node) => {
    if (node.isText) {
      const mark = node.marks.find(m => m.type.name === 'textStyle');
      values.add(mark ? (mark.attrs[property] ?? null) : null);
    }
  });
  if (values.size > 1) return 'mixed';
  return values.values().next().value ?? null;
}

// ─── Toolbar Button ──────────────────────────────────────────
function Btn({ onClick, active, mixed, title, children }: {
  onClick: () => void; active?: boolean; mixed?: boolean; title: string; children: React.ReactNode;
}) {
  return (
    <button
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      title={title} aria-label={title} aria-pressed={active}
      className={`flex items-center justify-center w-7 h-7 rounded transition-all select-none text-[13px]
        ${active ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 shadow-inner'
        : mixed ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
        : 'text-gray-600 dark:text-[#B0B3B8] hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'}`}
    >{children}</button>
  );
}

// ─── Props ───────────────────────────────────────────────────
interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

// ─── Main Component ──────────────────────────────────────────
export default function RichTextEditor({ value, onChange, placeholder = 'Write product description here...', minHeight = 120 }: RichTextEditorProps) {
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState<string | null>(null);
  
  const [isFontFamilyOpen, setIsFontFamilyOpen] = useState(false);
  const [currentFontFamily, setCurrentFontFamily] = useState<string | 'mixed' | null>(null);
  const fontFamilyRef = useRef<HTMLDivElement>(null);

  const [isFontSizeOpen, setIsFontSizeOpen] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState<string | 'mixed' | null>(null);
  const [customFontSize, setCustomFontSize] = useState('');
  const fontSizeRef = useRef<HTMLDivElement>(null);

  const [isAlignOpen, setIsAlignOpen] = useState(false);
  const alignRef = useRef<HTMLDivElement>(null);

  const [boldState, setBoldState] = useState<'active'|'mixed'|'inactive'>('inactive');
  const [underlineState, setUnderlineState] = useState<'active'|'mixed'|'inactive'>('inactive');
  const [isBullet, setIsBullet] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [currentAlign, setCurrentAlign] = useState<'left'|'center'|'right'|'justify'>('left');
  const [editorHeight, setEditorHeight] = useState(minHeight);
  
  const colorRef = useRef<HTMLDivElement>(null);
  const isExternal = useRef(false);

  const syncToolbar = useCallback((ed: Editor) => {
    setBoldState(getMarkState(ed, 'bold'));
    setUnderlineState(getMarkState(ed, 'underline'));
    setCurrentColor(getTextStyleState(ed, 'color') === 'mixed' ? null : (getTextStyleState(ed, 'color') as string | null));
    setCurrentFontFamily(getTextStyleState(ed, 'fontFamily'));
    setCurrentFontSize(getTextStyleState(ed, 'fontSize'));
    setIsBullet(ed.isActive('bulletList'));
    setIsOrdered(ed.isActive('orderedList'));
    const a = ed.isActive({ textAlign: 'center' }) ? 'center'
      : ed.isActive({ textAlign: 'right' }) ? 'right'
      : ed.isActive({ textAlign: 'justify' }) ? 'justify' : 'left';
    setCurrentAlign(a);
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ italic: false, strike: false, code: false, codeBlock: false, blockquote: false, horizontalRule: false, heading: false }),
      Underline,
      TextStyle,
      FontFamily,
      FontSize,
      Color,
      TextAlign.configure({ types: ['paragraph', 'listItem'], defaultAlignment: 'left' }),
      Placeholder.configure({ placeholder, emptyEditorClass: 'is-editor-empty' }),
    ],
    content: value || '',
    editorProps: {
      attributes: { class: 'outline-none', role: 'textbox', 'aria-multiline': 'true', 'aria-label': 'Product description' },
      transformPastedHTML: sanitizePasted,
    },
    onUpdate({ editor }) { if (!isExternal.current) onChange(editor.getHTML()); },
    onSelectionUpdate({ editor }) { syncToolbar(editor); },
    onTransaction({ editor }) { syncToolbar(editor); },
  });

  // Sync external value (e.g. product switch)
  useEffect(() => {
    if (!editor || editor.getHTML() === value) return;
    isExternal.current = true;
    editor.commands.setContent(value || '', { emitUpdate: false });
    isExternal.current = false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      const target = e.target as Node;
      if (colorRef.current && !colorRef.current.contains(target)) setIsColorOpen(false);
      if (fontFamilyRef.current && !fontFamilyRef.current.contains(target)) setIsFontFamilyOpen(false);
      if (fontSizeRef.current && !fontSizeRef.current.contains(target)) setIsFontSizeOpen(false);
      if (alignRef.current && !alignRef.current.contains(target)) setIsAlignOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  // Resize
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    const sy = e.clientY, sh = editorHeight;
    const move = (ev: MouseEvent) => setEditorHeight(Math.max(80, sh + ev.clientY - sy));
    const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!editor) return null;

  return (
    <div className="border border-gray-200 dark:border-[#4E4F50] rounded-lg overflow-visible">
      {/* TOOLBAR */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-gray-200 dark:border-[#4E4F50] bg-gray-50 dark:bg-[#242526] rounded-t-lg flex-wrap">

        <Btn title="Bold (Ctrl+B)" active={boldState === 'active'} mixed={boldState === 'mixed'} onClick={() => editor.chain().focus().toggleBold().run()}>
          <strong className="font-extrabold">B</strong>
        </Btn>

        <Btn title="Underline (Ctrl+U)" active={underlineState === 'active'} mixed={underlineState === 'mixed'} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <span className="underline font-semibold">U</span>
        </Btn>

        {/* Font Family */}
        <div className="relative" ref={fontFamilyRef}>
          <button
            onMouseDown={(e) => { e.preventDefault(); setIsFontFamilyOpen(o => !o); setIsFontSizeOpen(false); setIsColorOpen(false); setIsAlignOpen(false); }}
            title="Font Family" aria-label="Font Family"
            className={`flex items-center gap-1 px-2 h-7 rounded cursor-pointer select-none transition-all max-w-[120px]
              ${isFontFamilyOpen ? 'bg-gray-200 dark:bg-[#3A3B3C] shadow-inner' : 'hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'}`}
          >
            <span className="font-medium text-[13px] truncate text-gray-700 dark:text-[#E4E6EB]">
              {currentFontFamily === 'mixed' ? 'Mixed' : (FONT_FAMILIES.find(f => f.value === currentFontFamily)?.label || 'System UI')}
            </span>
            <svg className="w-3 h-3 text-gray-500 dark:text-[#B0B3B8] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isFontFamilyOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-[#2A2B2C] border border-gray-200 dark:border-[#4E4F50] rounded-lg shadow-xl py-1 z-[9999] w-[180px] max-h-[300px] overflow-y-auto">
              {FONT_FAMILIES.map((font) => {
                const isActive = currentFontFamily === font.value || (!currentFontFamily && font.value === '');
                return (
                  <button key={font.label} 
                    onMouseDown={(e) => { 
                      e.preventDefault(); 
                      if (font.value) editor.chain().focus().setFontFamily(font.value).run();
                      else editor.chain().focus().unsetFontFamily().run();
                      setIsFontFamilyOpen(false); 
                    }}
                    className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] ${isActive ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-medium' : 'text-gray-700 dark:text-[#E4E6EB]'}`}
                    style={{ fontFamily: font.value || 'inherit' }}
                  >
                    {font.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Font Size */}
        <div className="relative" ref={fontSizeRef}>
          <button
            onMouseDown={(e) => { e.preventDefault(); setIsFontSizeOpen(o => !o); setIsFontFamilyOpen(false); setIsColorOpen(false); setIsAlignOpen(false); setCustomFontSize(''); }}
            title="Font Size" aria-label="Font Size"
            className={`flex items-center gap-1 px-2 h-7 rounded cursor-pointer select-none transition-all
              ${isFontSizeOpen ? 'bg-gray-200 dark:bg-[#3A3B3C] shadow-inner' : 'hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'}`}
          >
            <span className="font-medium text-[13px] text-gray-700 dark:text-[#E4E6EB] w-9 text-center">
              {currentFontSize === 'mixed' ? 'Mixed' : (currentFontSize || '16px').replace('px', '')}
            </span>
            <svg className="w-3 h-3 text-gray-500 dark:text-[#B0B3B8] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isFontSizeOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-[#2A2B2C] border border-gray-200 dark:border-[#4E4F50] rounded-lg shadow-xl py-1 z-[9999] w-[140px] max-h-[300px] overflow-y-auto">
              <div className="px-2 py-1 mb-1 border-b border-gray-200 dark:border-[#4E4F50] flex gap-1 items-center">
                <input 
                  type="number" min={8} max={72}
                  className="w-full text-[13px] border border-gray-300 dark:border-[#4E4F50] rounded px-1.5 py-0.5 bg-white dark:bg-[#18191A] text-gray-700 dark:text-[#E4E6EB] outline-none focus:border-emerald-500" 
                  placeholder="Size (8-72)"
                  value={customFontSize}
                  onChange={e => setCustomFontSize(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      let val = parseInt(customFontSize);
                      if (val) {
                        val = Math.max(8, Math.min(72, val));
                        editor.chain().focus().setFontSize(`${val}px`).run();
                        setIsFontSizeOpen(false);
                      }
                    }
                  }}
                />
                <button 
                  onMouseDown={e => {
                    e.preventDefault();
                    let val = parseInt(customFontSize);
                    if (val) {
                      val = Math.max(8, Math.min(72, val));
                      editor.chain().focus().setFontSize(`${val}px`).run();
                      setIsFontSizeOpen(false);
                    }
                  }}
                  className="bg-emerald-600 text-white p-1 rounded hover:bg-emerald-700"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </button>
              </div>
              {FONT_SIZES.map((size) => {
                const isActive = currentFontSize === size || (!currentFontSize && size === '16px');
                return (
                  <button key={size} 
                    onMouseDown={(e) => { 
                      e.preventDefault(); 
                      if (size === '16px') editor.chain().focus().unsetFontSize().run();
                      else editor.chain().focus().setFontSize(size).run();
                      setIsFontSizeOpen(false); 
                    }}
                    className={`w-full text-center px-3 py-1.5 text-[13px] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] ${isActive ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-medium' : 'text-gray-700 dark:text-[#E4E6EB]'}`}
                  >
                    {size.replace('px', '')}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="w-px h-4 bg-gray-200 dark:bg-[#4E4F50] mx-1" />

        <Btn title="Clear formatting" onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/>
            <path d="M22 21H7"/><path d="m5 11 9 9"/>
          </svg>
        </Btn>

        <div className="w-px h-4 bg-gray-200 dark:bg-[#4E4F50] mx-1" />

        {/* Text Color */}
        <div className="relative" ref={colorRef}>
          <button
            onMouseDown={(e) => { e.preventDefault(); setIsColorOpen(o => !o); setIsFontFamilyOpen(false); setIsFontSizeOpen(false); setIsAlignOpen(false); }}
            title="Text color" aria-label="Text color"
            className={`flex items-center gap-1 px-1.5 h-7 rounded cursor-pointer select-none transition-all
              ${isColorOpen ? 'bg-gray-200 dark:bg-[#3A3B3C] shadow-inner' : 'hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'}`}
          >
            <span className="font-bold text-[14px]" style={{ color: currentColor ?? undefined }}>A</span>
            {currentColor && <span className="w-3 h-1 rounded-sm block" style={{ backgroundColor: currentColor }} />}
            <svg className="w-3 h-3 text-gray-500 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isColorOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-[#2A2B2C] border border-gray-200 dark:border-[#4E4F50] rounded-lg shadow-xl p-3 z-[9999] w-[210px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-gray-600 dark:text-[#B0B3B8]">Text Color</span>
                <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().unsetColor().run(); setIsColorOpen(false); }} className="text-[11px] text-emerald-600 hover:underline">Reset</button>
              </div>
              <div className="grid grid-cols-10 gap-0 border border-gray-200 dark:border-[#4E4F50] rounded overflow-hidden">
                {COLOR_PALETTE.map((c, i) => (
                  <button key={i} onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); editor.chain().focus().setColor(c).run(); setIsColorOpen(false); }}
                    title={c} className="w-full aspect-square hover:scale-125 hover:z-10 transition-transform relative" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-4 bg-gray-200 dark:bg-[#4E4F50] mx-1" />

        <Btn title="Bulleted list" active={isBullet} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 6h.01M5 12h.01M5 18h.01" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6h11M9 12h11M9 18h11" />
          </svg>
        </Btn>

        <Btn title="Numbered list" active={isOrdered} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6h11M10 12h11M10 18h11M4 6h.01M4 12h.01M4 18h.01" />
          </svg>
        </Btn>

        <div className="w-px h-4 bg-gray-200 dark:bg-[#4E4F50] mx-1" />

        {/* Alignment */}
        <div className="relative" ref={alignRef}>
          <button
            onMouseDown={(e) => { e.preventDefault(); setIsAlignOpen(o => !o); setIsFontFamilyOpen(false); setIsFontSizeOpen(false); setIsColorOpen(false); }}
            title="Text Alignment" aria-label="Text Alignment"
            className={`flex items-center gap-0.5 px-1.5 h-7 rounded cursor-pointer select-none transition-all
              ${isAlignOpen ? 'bg-gray-200 dark:bg-[#3A3B3C] shadow-inner' : 'hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'}`}
          >
            <span className="text-gray-600 dark:text-[#B0B3B8]">
              {currentAlign === 'left' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h12M4 18h16" /></svg>}
              {currentAlign === 'center' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" /></svg>}
              {currentAlign === 'right' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M4 18h16" /></svg>}
              {currentAlign === 'justify' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
            </span>
            <svg className="w-3 h-3 text-gray-500 dark:text-[#B0B3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isAlignOpen && (
            <div className="absolute top-full right-0 mt-1 bg-white dark:bg-[#2A2B2C] border border-gray-200 dark:border-[#4E4F50] rounded-lg shadow-xl py-1 z-[9999] flex flex-col w-[120px]">
              <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('left').run(); setIsAlignOpen(false); }} className={`flex items-center gap-2 px-3 py-1.5 text-[13px] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] ${currentAlign === 'left' ? 'text-emerald-600 font-medium' : 'text-gray-700 dark:text-[#E4E6EB]'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h12M4 18h16" /></svg> Left
              </button>
              <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('center').run(); setIsAlignOpen(false); }} className={`flex items-center gap-2 px-3 py-1.5 text-[13px] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] ${currentAlign === 'center' ? 'text-emerald-600 font-medium' : 'text-gray-700 dark:text-[#E4E6EB]'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" /></svg> Center
              </button>
              <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('right').run(); setIsAlignOpen(false); }} className={`flex items-center gap-2 px-3 py-1.5 text-[13px] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] ${currentAlign === 'right' ? 'text-emerald-600 font-medium' : 'text-gray-700 dark:text-[#E4E6EB]'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M4 18h16" /></svg> Right
              </button>
              <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('justify').run(); setIsAlignOpen(false); }} className={`flex items-center gap-2 px-3 py-1.5 text-[13px] hover:bg-gray-100 dark:hover:bg-[#3A3B3C] ${currentAlign === 'justify' ? 'text-emerald-600 font-medium' : 'text-gray-700 dark:text-[#E4E6EB]'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg> Justify
              </button>
            </div>
          )}
        </div>
      </div>

      {/* EDITOR */}
      <div className="bg-white dark:bg-[#18191A] overflow-y-auto" style={{ height: `${editorHeight}px` }}
        onClick={() => editor.commands.focus()}>
        <EditorContent editor={editor} className="rich-editor h-full px-3 py-2 text-[13px] text-gray-700 dark:text-[#E4E6EB]" />
      </div>

      {/* RESIZE HANDLE */}
      <div onMouseDown={handleResizeStart} className="flex justify-center bg-gray-50 dark:bg-[#242526] py-0.5 border-t border-gray-200 dark:border-[#4E4F50] cursor-row-resize rounded-b-lg hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors">
        <div className="w-6 h-1 bg-gray-300 dark:bg-[#4E4F50] rounded-full pointer-events-none" />
      </div>
    </div>
  );
}

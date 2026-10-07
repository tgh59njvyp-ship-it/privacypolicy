import React, { useEffect, useState } from 'react';
import { List, CheckCircle, ChevronRight } from 'lucide-react';
import { TocItem } from '../types';

interface TableOfContentsProps {
  items: TocItem[];
  title?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  title = "目次 (セクション移動)",
}) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      
      for (let i = items.length - 1; i >= 0; i--) {
        const element = document.getElementById(items[i].id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(items[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveId(id);
    }
  };

  return (
    <nav className="sticky top-20 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
        <List className="w-4 h-4 text-rose-500" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h3>
        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
          {items.length} 項目
        </span>
      </div>

      <ul className="space-y-1 text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-start gap-2.5 px-3 py-2 rounded-xl text-left transition-all ${
                  isActive
                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 rounded-md text-[10px] font-mono ${
                  isActive 
                    ? 'bg-rose-600 text-white dark:bg-rose-500' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                  {item.number}
                </span>
                <span className="line-clamp-2 leading-relaxed flex-1">
                  {item.title}
                </span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-rose-500 shrink-0 self-center" />}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

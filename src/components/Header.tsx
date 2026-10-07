import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Home, 
  Settings, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Code, 
  ExternalLink,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SiteConfig } from '../config/site';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  config: SiteConfig;
  onOpenConfig: () => void;
  onOpenExportModal: () => void;
  onOpenPinterestGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  config,
  onOpenConfig,
  onOpenExportModal,
  onOpenPinterestGuide,
}) => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'トップ', icon: Home },
    { path: '/privacy', label: 'プライバシーポリシー', icon: ShieldCheck },
    { path: '/terms', label: '利用規約', icon: FileText },
    { path: '/deploy-guide', label: 'デプロイ＆Pinterest審査ガイド', icon: BookOpen },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('/')} 
              className="flex items-center gap-2.5 text-left group focus:outline-none focus:ring-2 focus:ring-rose-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform duration-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-base tracking-tight group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {config.APP_NAME || "Pinterest App Policy"}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                    Pinterest App Review Ready
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                  プライバシーポリシー & 利用規約 ポータル
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons & Theme Switcher */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Quick Config Drawer Trigger */}
            <button
              onClick={onOpenConfig}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
              title="運営者情報・アプリ名のリアルタイム編集"
            >
              <Settings className="w-3.5 h-3.5 text-rose-500" />
              <span>変数を編集</span>
            </button>

            {/* Pinterest Helper Modal */}
            <button
              onClick={onOpenPinterestGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors border border-rose-200 dark:border-rose-900/60"
              title="Pinterest 審査用URLチェック"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>審査用URL</span>
            </button>

            {/* Next.js Export Code */}
            <button
              onClick={onOpenExportModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 dark:bg-rose-600 dark:hover:bg-rose-500 shadow-sm transition-colors"
              title="Next.js 静的エクスポート用コード出力"
            >
              <Code className="w-3.5 h-3.5" />
              <span>コード出力</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
              title={theme === 'dark' ? 'ライトモードに切替' : 'ダークモードに切替'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5 text-rose-500" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenConfig();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800"
            >
              <Settings className="w-4 h-4 text-rose-500" />
              <span>変数をリアルタイム編集</span>
            </button>

            <button
              onClick={() => {
                onOpenPinterestGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900"
            >
              <CheckCircle2 className="w-4 h-4 text-rose-500" />
              <span>Pinterest審査用URL確認</span>
            </button>

            <button
              onClick={() => {
                onOpenExportModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-slate-900 dark:bg-rose-600"
            >
              <Code className="w-4 h-4" />
              <span>Next.jsコード・デプロイ構成</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

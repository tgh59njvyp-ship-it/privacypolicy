import React, { useState, useEffect } from 'react';
import { siteConfig as initialConfig, SiteConfig } from './config/site';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ConfigDrawer } from './components/ConfigDrawer';
import { PinterestReviewHelper } from './components/PinterestReviewHelper';
import { ExportCodeModal } from './components/ExportCodeModal';

import { HomePage } from './pages/HomePage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { DeployGuidePage } from './pages/DeployGuidePage';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pinterest_app_config');
      if (saved) {
        try {
          return { ...initialConfig, ...JSON.parse(saved) };
        } catch {
          // fallback to initial
        }
      }
    }
    return initialConfig;
  });

  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (['/', '/privacy', '/terms', '/deploy-guide'].includes(path)) {
        return path;
      }
      if (window.location.hash) {
        const hashPath = window.location.hash.replace('#', '');
        if (['/', '/privacy', '/terms', '/deploy-guide'].includes(hashPath)) {
          return hashPath;
        }
      }
    }
    return '/';
  });

  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isPinterestGuideOpen, setIsPinterestGuideOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Sync route navigation with browser history
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (['/', '/privacy', '/terms', '/deploy-guide'].includes(path)) {
        setCurrentPath(path);
      } else if (window.location.hash) {
        const hashPath = window.location.hash.replace('#', '');
        if (['/', '/privacy', '/terms', '/deploy-guide'].includes(hashPath)) {
          setCurrentPath(hashPath);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
  };

  const handleUpdateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pinterest_app_config', JSON.stringify(newConfig));
    }
  };

  const handleResetConfig = () => {
    setConfig(initialConfig);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pinterest_app_config');
    }
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/privacy':
        return (
          <PrivacyPage
            config={config}
            onOpenConfig={() => setIsConfigOpen(true)}
            onOpenPinterestGuide={() => setIsPinterestGuideOpen(true)}
          />
        );
      case '/terms':
        return (
          <TermsPage
            config={config}
            onOpenConfig={() => setIsConfigOpen(true)}
          />
        );
      case '/deploy-guide':
        return (
          <DeployGuidePage
            config={config}
            onOpenExportModal={() => setIsExportModalOpen(true)}
            onOpenPinterestGuide={() => setIsPinterestGuideOpen(true)}
          />
        );
      case '/':
      default:
        return (
          <HomePage
            config={config}
            onNavigate={handleNavigate}
            onOpenConfig={() => setIsConfigOpen(true)}
            onOpenPinterestGuide={() => setIsPinterestGuideOpen(true)}
            onOpenExportModal={() => setIsExportModalOpen(true)}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        
        {/* Navigation Bar */}
        <Header
          currentPath={currentPath}
          onNavigate={handleNavigate}
          config={config}
          onOpenConfig={() => setIsConfigOpen(true)}
          onOpenExportModal={() => setIsExportModalOpen(true)}
          onOpenPinterestGuide={() => setIsPinterestGuideOpen(true)}
        />

        {/* Main View Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          {renderPage()}
        </main>

        {/* Footer */}
        <Footer config={config} onNavigate={handleNavigate} />

        {/* Live Variable Customizer Drawer */}
        <ConfigDrawer
          isOpen={isConfigOpen}
          onClose={() => setIsConfigOpen(false)}
          config={config}
          onUpdateConfig={handleUpdateConfig}
          onResetConfig={handleResetConfig}
        />

        {/* Pinterest Developer Portal Review Helper Modal */}
        <PinterestReviewHelper
          isOpen={isPinterestGuideOpen}
          onClose={() => setIsPinterestGuideOpen(false)}
          config={config}
        />

        {/* Next.js Code Exporter Modal */}
        <ExportCodeModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          config={config}
        />

      </div>
    </ThemeProvider>
  );
}

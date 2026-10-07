import React, { useState } from 'react';
import { 
  X, 
  Code, 
  Copy, 
  Check, 
  FolderTree, 
  Download, 
  Terminal, 
  ExternalLink,
  Zap,
  FileCode,
  Sparkles
} from 'lucide-react';
import { SiteConfig, getFullPrivacyUrl, getFullTermsUrl } from '../config/site';

interface ExportCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
}

export const ExportCodeModal: React.FC<ExportCodeModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [activeTab, setActiveTab] = useState<'files' | 'deploy'>('files');
  const [selectedFile, setSelectedFile] = useState<string>('src/config/site.ts');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const nextConfigCode = `/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的エクスポート(output: 'export')を設定し、Vercel / GitHub Pages 等に即時配信可能にします
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
`;

  const packageJsonCode = `{
  "name": "${config.APP_NAME.toLowerCase().replace(/[^a-z0-9]/g, '-')}-policy",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "lucide-react": "^0.368.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0"
  }
}`;

  const siteConfigTsCode = `export interface SiteConfig {
  APP_NAME: string;
  APP_DESCRIPTION: string;
  OPERATOR_NAME: string;
  CONTACT_EMAIL: string;
  LAST_UPDATED: string;
  TERMS_LAST_UPDATED: string;
  SITE_URL: string;
}

export const siteConfig: SiteConfig = {
  APP_NAME: "${config.APP_NAME}",
  APP_DESCRIPTION: "${config.APP_DESCRIPTION}",
  OPERATOR_NAME: "${config.OPERATOR_NAME}",
  CONTACT_EMAIL: "${config.CONTACT_EMAIL}",
  LAST_UPDATED: "${config.LAST_UPDATED}",
  TERMS_LAST_UPDATED: "${config.TERMS_LAST_UPDATED}",
  SITE_URL: "${config.SITE_URL}",
};
`;

  const appLayoutTsxCode = `import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/src/config/site';

export const metadata: Metadata = {
  title: siteConfig.APP_NAME + ' - プライバシーポリシー & 利用規約',
  description: siteConfig.APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
`;

  const appPageTsxCode = `import Link from 'next/link';
import { siteConfig } from '@/src/config/site';

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">{siteConfig.APP_NAME}</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-8">{siteConfig.APP_DESCRIPTION}</p>
      <div className="flex gap-4">
        <Link href="/privacy" className="px-5 py-2.5 bg-rose-600 text-white rounded-xl font-semibold">
          プライバシーポリシーを読む
        </Link>
        <Link href="/terms" className="px-5 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-semibold">
          利用規約を読む
        </Link>
      </div>
    </main>
  );
}
`;

  const filesMap: Record<string, { code: string; lang: string }> = {
    'next.config.js': { code: nextConfigCode, lang: 'javascript' },
    'package.json': { code: packageJsonCode, lang: 'json' },
    'src/config/site.ts': { code: siteConfigTsCode, lang: 'typescript' },
    'app/layout.tsx': { code: appLayoutTsxCode, lang: 'tsx' },
    'app/page.tsx': { code: appPageTsxCode, lang: 'tsx' },
  };

  const handleCopy = (fileName: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-900 dark:bg-rose-600 text-white rounded-2xl">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Next.js (App Router) 静的エクスポート構成
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <code className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono text-[10px]">output: 'export'</code> 対応のプロジェクト構成・ソースコード
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-white dark:bg-slate-900">
          <button
            onClick={() => setActiveTab('files')}
            className={`py-3 px-4 font-semibold text-xs border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'files'
                ? 'border-rose-600 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>ファイル一覧・コード参照</span>
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`py-3 px-4 font-semibold text-xs border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'deploy'
                ? 'border-rose-600 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Vercel デプロイ手順 (環境変数不要)</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'files' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* File List Tree */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  プロジェクト構成ファイル
                </h3>
                {Object.keys(filesMap).map((fileName) => (
                  <button
                    key={fileName}
                    onClick={() => setSelectedFile(fileName)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-left font-mono transition-colors ${
                      selectedFile === fileName
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-900'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-rose-500" />
                      {fileName}
                    </span>
                  </button>
                ))}
              </div>

              {/* Code Viewer */}
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                    {selectedFile}
                  </span>
                  <button
                    onClick={() => handleCopy(selectedFile, filesMap[selectedFile].code)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 text-white hover:bg-rose-500 transition-colors shadow-xs"
                  >
                    {copiedFile === selectedFile ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>コピーしました</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>コードをコピー</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 bg-slate-950 text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed max-h-96">
                  {filesMap[selectedFile].code}
                </pre>
              </div>

            </div>
          ) : (
            <div className="space-y-6 max-w-2xl mx-auto">
              
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed space-y-1">
                  <p className="font-bold">環境変数 (API Key) 不要の完全静的設計</p>
                  <p>
                    このプライバシーポリシーサイトは純粋な静的HTML/JSとしてエクスポートされるため、VercelやGitHub Pages上に無料で10秒でデプロイ可能です。
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] flex items-center justify-center font-bold">1</span>
                    GitHub リポジトリ作成 & プッシュ
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                    上記のコードをローカルまたはGitHub上にプッシュします。
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] flex items-center justify-center font-bold">2</span>
                    Vercel で Import Project を実行
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                    Vercelダッシュボード (<a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-rose-600 underline font-semibold">vercel.com/new</a>) で対象リポジトリを選択します。Framework Preset に 「Next.js」 が自動判別されます。
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] flex items-center justify-center font-bold">3</span>
                    Deploy ボタンをクリック (環境変数の入力不要)
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                    Environment Variables（環境変数）の設定は一切不要です。そのまま「Deploy」をクリックすれば、1分以内に本番URLが発行されます。
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 rounded-xl transition-colors"
          >
            閉じる
          </button>
        </div>

      </div>
    </div>
  );
};

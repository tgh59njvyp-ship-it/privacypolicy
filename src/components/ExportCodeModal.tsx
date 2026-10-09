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
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Globe,
  Layers,
  ArrowDownToLine,
  Loader2
} from 'lucide-react';
import { SiteConfig, getFullPrivacyUrl, getFullTermsUrl } from '../config/site';
import { generateNextJsProjectFiles, downloadProjectZip, ProjectFileInfo } from '../utils/exportProject';

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
  const [activeTab, setActiveTab] = useState<'files' | 'deploy' | 'cli'>('files');
  const [selectedFileKey, setSelectedFileKey] = useState<string>('vercel.json');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(false);

  if (!isOpen) return null;

  const filesMap = generateNextJsProjectFiles(config);
  const selectedFile: ProjectFileInfo = filesMap[selectedFileKey] || filesMap['vercel.json'];

  const handleCopy = (fileName: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      await downloadProjectZip(config);
      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to generate ZIP:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const vercelOptimizations = [
    {
      title: '完全静的エクスポート (output: export)',
      desc: 'Next.jsの静的HTML出力により、サーバーレス実行コスト0円・ミリ秒単位の超高速TTFBを実現',
      badge: 'Edge CDN'
    },
    {
      title: 'クリーンURL & 末尾スラッシュ正規化',
      desc: 'vercel.jsonで cleanUrls: true / trailingSlash: false を指定し、Pinterest審査ボットのURLアクセスエラーを完全防止',
      badge: 'URL Routing'
    },
    {
      title: '厳格セキュリティヘッダー (HSTS / CSP / X-Frame)',
      desc: 'Pinterest Developerの信頼性評価を高めるHTTPS強制・X-Content-Type-Options等のセキュリティヘッダーを自動付与',
      badge: 'Security'
    },
    {
      title: '自動 sitemap.xml & robots.txt 生成',
      desc: 'Pinterestbot 専用のクローラー許可ルールおよびサイトマップを自動配信',
      badge: 'SEO'
    },
    {
      title: '環境変数 (API Key) 完全不要',
      desc: '公開ポリシーサイトのため機密キーの登録は不要。Vercel上で「Deploy」を押すだけで完了',
      badge: 'Zero Config'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-black text-white dark:bg-rose-600 rounded-2xl shadow-md">
              <Zap className="w-6 h-6 text-amber-400 dark:text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Vercel デプロイ最適化 ＆ Next.js コード出力
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Vercel Ready
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Next.js (App Router) + Tailwind CSS + vercel.json 構成コード一式
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Download ZIP Button */}
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 transition-all shadow-md hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isZipping ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>ZIP生成中...</span>
                </>
              ) : zipSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>DL完了!</span>
                </>
              ) : (
                <>
                  <ArrowDownToLine className="w-4 h-4" />
                  <span>ZIP一括ダウンロード</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-white dark:bg-slate-900">
          <button
            onClick={() => setActiveTab('files')}
            className={`py-3.5 px-4 font-bold text-xs border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'files'
                ? 'border-rose-600 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>ファイル別コード閲覧 ({Object.keys(filesMap).length}ファイル)</span>
          </button>
          
          <button
            onClick={() => setActiveTab('deploy')}
            className={`py-3.5 px-4 font-bold text-xs border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'deploy'
                ? 'border-rose-600 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Vercel 最適化診断 & 登録手順</span>
          </button>

          <button
            onClick={() => setActiveTab('cli')}
            className={`py-3.5 px-4 font-bold text-xs border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'cli'
                ? 'border-rose-600 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4 text-slate-500" />
            <span>Vercel CLI デプロイコマンド</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'files' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* File List Tree */}
              <div className="md:col-span-4 space-y-2">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    構成ファイル
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Next.js App Router
                  </span>
                </div>

                <div className="space-y-1 max-h-[55vh] overflow-y-auto pr-1">
                  {Object.entries(filesMap).map(([key, item]) => {
                    const isSelected = selectedFileKey === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedFileKey(key)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-left font-mono transition-colors ${
                          isSelected
                            ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-900 shadow-xs'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400'}`} />
                          <span className="truncate">{key}</span>
                        </span>
                        {key === 'vercel.json' && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 shrink-0 font-sans">
                            必須
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Code Viewer Panel */}
              <div className="md:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                      {selectedFile.path}
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {selectedFile.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(selectedFile.path, selectedFile.code)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-rose-600 text-white hover:bg-rose-500 transition-colors shadow-xs"
                  >
                    {copiedFile === selectedFile.path ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>コピー完了</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>このファイルをコピー</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 bg-slate-950 text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed max-h-[50vh]">
                  {selectedFile.code}
                </pre>
              </div>

            </div>
          )}

          {activeTab === 'deploy' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              
              {/* Optimization Highlights */}
              <div className="grid grid-cols-1 gap-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Vercel 向けに適用された最適化一覧
                </h3>
                
                {vercelOptimizations.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 shrink-0 font-mono">
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>

              {/* 3 Steps deployment */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-950 text-white space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Vercel 無料デプロイの最短3ステップ
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                    <p className="text-slate-300">
                      上部の「<strong>ZIP一括ダウンロード</strong>」をクリックしてZIPを取得し、GitHub に新しいリポジトリとしてプッシュします。
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                    <p className="text-slate-300">
                      <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="underline text-rose-400 font-bold hover:text-rose-300">vercel.com/new</a> にアクセスしてリポジトリを選択します（Framework Preset: Next.js）。
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                    <p className="text-slate-300">
                      <strong>環境変数 (Environment Variables) は入力不要</strong>です。そのまま「Deploy」を押せば、自動でビルド＆即座にURLが発行されます。
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'cli' && (
            <div className="space-y-6 max-w-3xl mx-auto text-xs">
              
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-bold flex items-center gap-2 text-rose-400">
                    <Terminal className="w-4 h-4" />
                    Vercel CLI 1行デプロイコマンド
                  </span>
                  <button
                    onClick={() => handleCopy('cli-cmd', 'npm i -g vercel\nvercel --prod')}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white"
                  >
                    {copiedFile === 'cli-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedFile === 'cli-cmd' ? 'コピー完了' : 'コマンドコピー'}</span>
                  </button>
                </div>

                <pre className="p-3 bg-black/60 rounded-xl font-mono text-emerald-400 overflow-x-auto">
{`# 1. プロジェクトフォルダに移動
cd your-policy-app

# 2. Vercel CLI で本番デプロイ
npx vercel --prod`}
                </pre>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white">
                  独自ドメインの割り当て (例: privacy.yourdomain.com)
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Vercel Project Settings ➔ <strong>Domains</strong> に進み、お持ちのドメインやサブドメイン（例: <code className="font-mono text-rose-600">privacy.yourdomain.com</code>）を追加すると、Let's Encrypt SSL証明書が自動発行され、Pinterest審査に最適な信頼性の高いURLが完成します。
                </p>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
          <a
            href="https://vercel.com/docs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <span>Vercel 公式ドキュメント</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

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

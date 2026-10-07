import React, { useState } from 'react';
import { X, Settings, RotateCcw, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';
import { SiteConfig } from '../config/site';

interface ConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onUpdateConfig: (newConfig: SiteConfig) => void;
  onResetConfig: () => void;
}

export const ConfigDrawer: React.FC<ConfigDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onResetConfig,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof SiteConfig, value: string) => {
    onUpdateConfig({
      ...config,
      [field]: value,
    });
  };

  const generatedTsCode = `export const siteConfig = {
  APP_NAME: "${config.APP_NAME}",
  OPERATOR_NAME: "${config.OPERATOR_NAME}",
  CONTACT_EMAIL: "${config.CONTACT_EMAIL}",
  LAST_UPDATED: "${config.LAST_UPDATED}",
  TERMS_LAST_UPDATED: "${config.TERMS_LAST_UPDATED}",
  SITE_URL: "${config.SITE_URL}",
  APP_DESCRIPTION: "${config.APP_DESCRIPTION}",
};`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedTsCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 rounded-lg">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                変数カスタマイザー (`config/site.ts`)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                表示中の規約文書にリアルタイム反映されます
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body - Form Fields */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-sm">
          
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-xl text-amber-800 dark:text-amber-300 text-xs flex gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <span>
              Pinterest App Reviewの申請前に、必ずご自身のアプリ情報・メールアドレスに差し替えてください。
            </span>
          </div>

          {/* APP_NAME */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              アプリ名 (<code className="text-xs font-mono text-rose-600 dark:text-rose-400">APP_NAME</code>)
            </label>
            <input
              type="text"
              value={config.APP_NAME}
              onChange={(e) => handleChange('APP_NAME', e.target.value)}
              placeholder="例: PinVault Studio"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Pinterest Developer Portalの App Name と正確に一致させてください
            </p>
          </div>

          {/* OPERATOR_NAME */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              運営者名 / 個人名 (<code className="text-xs font-mono text-rose-600 dark:text-rose-400">OPERATOR_NAME</code>)
            </label>
            <input
              type="text"
              value={config.OPERATOR_NAME}
              onChange={(e) => handleChange('OPERATOR_NAME', e.target.value)}
              placeholder="例: 山田 太郎 または 株式会社PinVault"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          {/* CONTACT_EMAIL */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              連絡先メールアドレス (<code className="text-xs font-mono text-rose-600 dark:text-rose-400">CONTACT_EMAIL</code>)
            </label>
            <input
              type="email"
              value={config.CONTACT_EMAIL}
              onChange={(e) => handleChange('CONTACT_EMAIL', e.target.value)}
              placeholder="例: support@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none font-mono text-xs"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              開示請求・Pinterest審議連絡を受け取る実在のメールアドレス
            </p>
          </div>

          {/* LAST_UPDATED */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              プライバシーポリシー最終更新日 (<code className="text-xs font-mono text-rose-600 dark:text-rose-400">LAST_UPDATED</code>)
            </label>
            <input
              type="text"
              value={config.LAST_UPDATED}
              onChange={(e) => handleChange('LAST_UPDATED', e.target.value)}
              placeholder="例: 2026年10月4日"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          {/* SITE_URL */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              デプロイ後のURL (<code className="text-xs font-mono text-rose-600 dark:text-rose-400">SITE_URL</code>)
            </label>
            <input
              type="text"
              value={config.SITE_URL}
              onChange={(e) => handleChange('SITE_URL', e.target.value)}
              placeholder="例: https://my-pin-app.vercel.app"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none font-mono text-xs"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              VercelやGitHub Pagesで公開後の本番ドメイン
            </p>
          </div>

          {/* Generated Code Section */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                生成された `src/config/site.ts`
              </span>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:underline font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'コピー完了' : 'コードをコピー'}
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
              {generatedTsCode}
            </pre>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center gap-3">
          <button
            onClick={onResetConfig}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            リセット
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-xs text-center"
          >
            完了して確認
          </button>
        </div>

      </div>
    </div>
  );
};

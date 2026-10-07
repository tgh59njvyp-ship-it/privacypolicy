import React, { useState } from 'react';
import { 
  Zap, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  Globe, 
  Code, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SiteConfig, getFullPrivacyUrl, getFullTermsUrl } from '../config/site';

interface DeployGuidePageProps {
  config: SiteConfig;
  onOpenExportModal: () => void;
  onOpenPinterestGuide: () => void;
}

export const DeployGuidePage: React.FC<DeployGuidePageProps> = ({
  config,
  onOpenExportModal,
  onOpenPinterestGuide,
}) => {
  const [copiedNote, setCopiedNote] = useState(false);

  const reviewerNote = `【Pinterest App Review 審査用説明文章】

・アプリ名: ${config.APP_NAME}
・概要: ユーザーが指定したPinterest公開ボードのピン画像および情報を取得し、閲覧および一括保存をサポートするツールです。
・トークン管理: Pinterest APIアクセストークンはサーバー側環境変数で厳重管理し、クライアントへ露出しません。
・データ保存: APIで取得したピンデータおよび画像ファイルはサーバー上に保存せず、リアルタイム処理のみを行っています。
・プライバシーポリシーURL: ${getFullPrivacyUrl(config.SITE_URL)}
・利用規約URL: ${getFullTermsUrl(config.SITE_URL)}
・お問い合わせ先: ${config.CONTACT_EMAIL}`;

  const handleCopyNote = () => {
    navigator.clipboard.writeText(reviewerNote);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  return (
    <div className="py-8 space-y-12">
      
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Vercel 静的エクスポート & Pinterest App Review 設定手順</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          デプロイ手順 & Pinterest 審査登録ガイド
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          本サイトをVercelやGitHub Pagesに完全静的（API Keyや環境変数不要）で即時デプロイし、Pinterest Developer Portal に登録するまでの完全マニュアルです。
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={onOpenPinterestGuide}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>審査用入力URL一覧を表示</span>
          </button>

          <button
            onClick={onOpenExportModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
          >
            <Code className="w-4 h-4 text-rose-400" />
            <span>Next.js ソースコードを表示</span>
          </button>
        </div>
      </div>

      {/* Part 1: Vercel Deploy Steps */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold text-lg">
            ▲
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              STEP 1: Vercel へのデプロイ手順 (環境変数 不要)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              `next.config.js` の `output: 'export'` 設定により、Vercel 無料プランで高速公開できます
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              GitHub にリポジトリ作成
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              「コード出力」ボタンでコピーしたNext.jsコードをGitHubの新規リポジトリにコミット＆プッシュします。
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Vercel で Import Project
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Vercel (<a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="underline font-bold text-rose-600">vercel.com/new</a>) にログインし、対象リポジトリを選択します。
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Deploy ボタンを押すだけ
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              環境変数は不要です。そのまま Deploy を押せば、数秒で <code className="font-mono text-rose-600">https://xxx.vercel.app</code> が発行されます。
            </p>
          </div>

        </div>
      </section>

      {/* Part 2: Pinterest Developer Console Setup Guide */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold text-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              STEP 2: Pinterest Developer Portal へのURL入力案内
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pinterest 審査申請画面の各入力欄と対応URL
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Pinterest Developer Portal (<a href="https://developers.pinterest.com/" target="_blank" rel="noreferrer" className="underline font-bold text-rose-600">developers.pinterest.com</a>) の <strong>My Apps ➔ [対象アプリ] ➔ App Settings</strong> 画面を開き、以下の通り設定してください。
          </p>

          <div className="space-y-3 text-xs">
            
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">App Website URL</span>
                <p className="text-slate-500 text-[11px]">アプリの公式サイトURL</p>
              </div>
              <code className="font-mono font-bold text-rose-600 dark:text-rose-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                {config.SITE_URL || 'https://your-app.vercel.app'}
              </code>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Privacy Policy URL</span>
                <p className="text-slate-500 text-[11px]">プライバシーポリシーへの直接リンク</p>
              </div>
              <code className="font-mono font-bold text-rose-600 dark:text-rose-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                {getFullPrivacyUrl(config.SITE_URL)}
              </code>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Terms of Service URL</span>
                <p className="text-slate-500 text-[11px]">利用規約への直接リンク</p>
              </div>
              <code className="font-mono font-bold text-rose-600 dark:text-rose-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                {getFullTermsUrl(config.SITE_URL)}
              </code>
            </div>

          </div>
        </div>
      </section>

      {/* Part 3: Reviewer Note Template */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-500" />
            Pinterest 審議担当者への提出補足コメントテンプレート
          </h2>
          <button
            onClick={handleCopyNote}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-500 transition-colors"
          >
            {copiedNote ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedNote ? 'コピー完了' : '文章をコピー'}</span>
          </button>
        </div>

        <pre className="p-5 bg-slate-950 text-slate-200 rounded-3xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed whitespace-pre-wrap">
          {reviewerNote}
        </pre>
      </section>

    </div>
  );
};

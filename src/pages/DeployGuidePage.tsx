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
  ArrowRight,
  Download,
  Lock,
  Search,
  Server,
  Layers,
  ArrowDownToLine,
  Loader2
} from 'lucide-react';
import { SiteConfig, getFullPrivacyUrl, getFullTermsUrl } from '../config/site';
import { downloadProjectZip } from '../utils/exportProject';

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
  const [isZipping, setIsZipping] = useState(false);
  const [zipDone, setZipDone] = useState(false);

  const reviewerNote = `【Pinterest App Review 審査用説明文章】

・アプリ名: ${config.APP_NAME}
・概要: ユーザーが指定したPinterest公開ボードのピン画像および情報を取得し、閲覧および一括保存をサポートするツールです。
・トークン管理: Pinterest APIアクセストークンはサーバー側環境変数で厳重管理し、クライアントへ露出しません。
・データ保存: APIで取得したピンデータおよび画像ファイルはサーバー上に保存せず、リアルタイム処理のみを行っています。
・ホスティング & 配信: Vercel Edge CDN（完全静的・HTTPS常時暗号化・セキュリティヘッダー完備）
・プライバシーポリシーURL: ${getFullPrivacyUrl(config.SITE_URL)}
・利用規約URL: ${getFullTermsUrl(config.SITE_URL)}
・お問い合わせ先: ${config.CONTACT_EMAIL}`;

  const handleCopyNote = () => {
    navigator.clipboard.writeText(reviewerNote);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      await downloadProjectZip(config);
      setZipDone(true);
      setTimeout(() => setZipDone(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsZipping(false);
    }
  };

  const vercelFeatures = [
    {
      icon: Lock,
      title: 'HSTS & セキュリティヘッダー自動付与',
      desc: 'X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Strict-Transport-Security 等のヘッダーを vercel.json で自動構成。Pinterest の厳格なセキュリティ審査基準をクリアします。'
    },
    {
      icon: Globe,
      title: 'クリーンURL & SPA ルーティング',
      desc: 'cleanUrls: true と末尾スラッシュ正規化により、/privacy や /terms へのダイレクトアクセスや Pinterest 審議ボットのクローリング時にも 404 エラーを起こしません。'
    },
    {
      icon: Search,
      title: 'Pinterestbot 専用 robots.txt & sitemap.xml',
      desc: 'Pinterestbot および Googlebot 向けのクローラー許可ルールを自動配信し、審査員やボットが確実にポリシー文書を取得できます。'
    },
    {
      icon: Zap,
      title: 'Edge CDN 高速キャッシュ & 0円運用',
      desc: 'Next.js の output: export による完全静的ビルドのため、Vercel の無料 Hobby プランで高速配信。実行制限やサーバー維持費は一切かかりません。'
    },
  ];

  return (
    <div className="py-8 space-y-12">
      
      {/* Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold backdrop-blur-xs border border-rose-500/30">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Vercel 最適化デプロイ & Pinterest 審査完全対応</span>
          </div>

          {/* Quick ZIP Export */}
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-all shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isZipping ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>ZIP生成中...</span>
              </>
            ) : zipDone ? (
              <>
                <Check className="w-4 h-4" />
                <span>ダウンロード完了!</span>
              </>
            ) : (
              <>
                <ArrowDownToLine className="w-4 h-4" />
                <span>全コードをZIPダウンロード</span>
              </>
            )}
          </button>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Vercel デプロイ最適化ガイド
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Pinterest App Review の審査員やクローラーボットが確実にポリシーへアクセスできるよう、<strong className="text-white">vercel.json</strong>、<strong className="text-white">セキュリティヘッダー</strong>、<strong className="text-white">クリーンURLルーティング</strong>、<strong className="text-white">robots.txt</strong> を完全最適化しています。
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={onOpenExportModal}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
          >
            <Code className="w-4 h-4 text-rose-400" />
            <span>ソースコード一覧・vercel.json を確認</span>
          </button>

          <button
            onClick={onOpenPinterestGuide}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold text-rose-300 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/80 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-rose-400" />
            <span>審査申請用 URL 一覧</span>
          </button>
        </div>
      </div>

      {/* Vercel Optimization Highlights */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Vercel 向けに適用された 4 つの最適化
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pinterest API審査ガイドラインおよびWeb標準に準拠した設計
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {vercelFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Part 1: Vercel Deploy Steps */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold text-lg">
            ▲
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Vercel デプロイ手順 (環境変数 不要・所要時間 約1分)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              完全静的エクスポートのため、API Key や Secrets の設定は一切不要です
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              ZIP取得 & GitHub にプッシュ
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              ページ上部の「ZIP一括ダウンロード」で取得したファイルを解凍し、GitHub の新規リポジトリにプッシュします。
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Vercel でインポート
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Vercel (<a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="underline font-bold text-rose-600">vercel.com/new</a>) で対象リポジトリを選択。Framework Preset に「Next.js」が自動選択されます。
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              「Deploy」をクリック
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              環境変数は不要です。そのまま Deploy を押せば、自動でビルドが行われ、本番公開URL (<code className="font-mono text-rose-600">https://xxx.vercel.app</code>) が発行されます。
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
              Pinterest Developer Portal へのURL入力案内
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Vercel でデプロイ完了後、以下のURLを Pinterest Developer Console にコピー＆ペーストしてください
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Pinterest Developer Portal (<a href="https://developers.pinterest.com/" target="_blank" rel="noreferrer" className="underline font-bold text-rose-600">developers.pinterest.com</a>) ➔ <strong>My Apps ➔ [対象アプリ] ➔ App Settings</strong> 画面を開き、各項目を設定してください。
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

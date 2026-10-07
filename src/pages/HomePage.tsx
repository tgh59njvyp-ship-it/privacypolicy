import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Lock, 
  Image as ImageIcon, 
  Mail, 
  BookOpen, 
  Sparkles,
  Database,
  Globe,
  Settings
} from 'lucide-react';
import { SiteConfig, getFullPrivacyUrl, getFullTermsUrl } from '../config/site';

interface HomePageProps {
  config: SiteConfig;
  onNavigate: (path: string) => void;
  onOpenConfig: () => void;
  onOpenPinterestGuide: () => void;
  onOpenExportModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  config,
  onNavigate,
  onOpenConfig,
  onOpenPinterestGuide,
  onOpenExportModal,
}) => {
  const privacyUrl = getFullPrivacyUrl(config.SITE_URL);
  const termsUrl = getFullTermsUrl(config.SITE_URL);

  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            <span>Pinterest API 申請・審議提出 完全対応版</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-rose-200">
              {config.APP_NAME}
            </span>
            <br />
            <span className="text-2xl sm:text-3xl font-bold text-slate-300 font-sans">
              プライバシーポリシー & 利用規約
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {config.APP_DESCRIPTION}
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-400">運営者 / 組織名</p>
                <p className="font-bold text-white text-sm">{config.OPERATOR_NAME}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
                <Mail className="w-4 h-4" />
              </div>
              <div className="truncate">
                <p className="text-slate-400">公式問い合わせ窓口</p>
                <p className="font-bold text-white text-sm font-mono truncate">{config.CONTACT_EMAIL}</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => onNavigate('/privacy')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 transition-all shadow-lg shadow-rose-600/30 hover:scale-[1.02]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>プライバシーポリシーを見る</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('/terms')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-all border border-slate-700 hover:text-white"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>利用規約 (簡易版) を見る</span>
            </button>

            <button
              onClick={onOpenPinterestGuide}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold text-rose-300 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/80 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-rose-400" />
              <span>審査用入力URL確認</span>
            </button>
          </div>

        </div>
      </section>

      {/* App & Pinterest API Features Summary */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Pinterest API 利用ポリシーの概要
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pinterest API審査ガイドラインに準拠したデータ取り扱い基準を定めています
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              1. 公開ボード・ピン情報の取得
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              ユーザーが入力したPinterestボードURLの公開情報をPinterest API経由で取得し、ピン画像の一覧表示・確認機能を提供します。
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              2. トークン・データの非保存
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Pinterest APIアクセストークンはサーバー側の環境変数で厳重に保護されます。取得したピンデータや画像はサーバー上に永続保存されません。
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              3. 著作権及び個人利用範囲の明示
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              画像の著作権・知的財産権は各コンテンツ所有者に帰属します。ダウンロードされた画像は個人利用の範囲内でのみ利用することを義務付けています。
            </p>
          </div>

        </div>
      </section>

      {/* Direct Document Portal Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Privacy Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-white to-rose-50/50 dark:from-slate-900 dark:to-rose-950/20 border border-rose-100 dark:border-rose-900/40 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                全13項目 網羅済み
              </span>
              <span className="text-xs font-mono text-slate-500">
                更新: {config.LAST_UPDATED}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-rose-600" />
              プライバシーポリシー
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              事業者情報、対象サービス、取得情報、利用目的、第三者提供、Pinterestデータの取り扱い、非保存原則、画像の権利、Cookie非使用、安全管理措置、未成年者規定、開示請求手続き、変更手順の全13セクションを掲載しています。
            </p>
          </div>

          <button
            onClick={() => onNavigate('/privacy')}
            className="w-full py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors text-center flex items-center justify-center gap-2 shadow-xs"
          >
            <span>プライバシーポリシー全文を開く</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Terms Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-white to-slate-100/60 dark:from-slate-900 dark:to-slate-800/40 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                簡易版規約
              </span>
              <span className="text-xs font-mono text-slate-500">
                更新: {config.TERMS_LAST_UPDATED}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-slate-700 dark:text-slate-300" />
              利用規約 (簡易版)
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              アプリの利用条件、Pinterest APIの利用規約の遵守義務、禁止事項（二次配布、スクレイピング、商業的乱用など）、免責事項、サービスの変更・中断・終了方針をわかりやすく規定しています。
            </p>
          </div>

          <button
            onClick={() => onNavigate('/terms')}
            className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs transition-colors text-center flex items-center justify-center gap-2 shadow-xs"
          >
            <span>利用規約全文を開く</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </section>

      {/* Customizer & Code Output Quick Callout */}
      <section className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>変数のカスタマイズ & デプロイコード</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            アプリ名・運営者名・メールアドレスを差し替えてデプロイできます
          </h3>
          <p className="text-xs text-slate-300">
            トップバーの「変数を編集」ボタンからご自身のアプリ情報に切り替え、Next.jsコードとして出力できます。
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenConfig}
            className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors"
          >
            変数を編集する
          </button>
          <button
            onClick={onOpenExportModal}
            className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors border border-slate-700"
          >
            Next.js構成を出力
          </button>
        </div>
      </section>

    </div>
  );
};

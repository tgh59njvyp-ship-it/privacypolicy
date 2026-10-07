import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Copy, 
  Check, 
  AlertTriangle, 
  ShieldAlert, 
  Building2, 
  Mail, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { SiteConfig } from '../config/site';

interface TermsPageProps {
  config: SiteConfig;
  onOpenConfig: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ config, onOpenConfig }) => {
  const [copied, setCopied] = useState(false);

  const fullTermsText = `利用規約 (簡易版)

本利用規約（以下、「本規約」といいます。）は、${config.OPERATOR_NAME}（以下、「当運営者」といいます。）が提供するウェブアプリケーション「${config.APP_NAME}」（以下、「本アプリ」といいます。）の利用条件を定めるものです。ユーザーは、本アプリを利用することにより、本規約に同意したものとみなされます。

第1条（適用範囲）
本規約は、本アプリの閲覧、Pinterestボード情報の取得、画像のダウンロード機能を利用する全てのユーザーに適用されます。

第2条（Pinterest利用規約の遵守）
1. 本アプリはPinterest APIを利用して機能を提供しています。ユーザーは、本アプリの利用にあたり、Pinterest, Inc.が定める「Pinterest利用規約」および「Developer Terms of Service」を遵守するものとします。
2. ユーザーは、Pinterest上で非公開（シークレット）に設定されたボードや権限のない非公開コンテンツへの不正アクセスを行ってはなりません。

第3条（著作権および画像利用権）
1. 本アプリを通じて取得・表示・保存されるピン画像および商品説明等の著作権・知的財産権は、それぞれの権利所有者またはPinterest, Inc.に帰属します。
2. ユーザーは、本アプリを通じて取得した画像を個人利用の範囲内（私的使用のための複製等）でのみ利用することができます。無断での商業利用、転載、再配布を禁止します。

第4条（禁止事項）
ユーザーは、本アプリの利用にあたり、以下の行為を行ってはなりません。
1. 法令または公序良俗に反する行為
2. Pinterest APIまたは本アプリのサーバーに過剰な負荷をかける自動スクレイピング、攻撃行為
3. Pinterest APIのアクセストークンを不正に取得・解析・抽出を試みる行為
4. 第三者の著作権、商標権、プライバシー権その他の権利を侵害する行為
5. その他、当運営者が不適切と判断する行為

第5条（免責事項）
1. 本アプリは現状有姿で提供され、当運営者は、本アプリの完全性、正確性、継続性、安全性について保証するものではありません。
2. Pinterest APIの仕様変更、メンテナンス、障害等により、本アプリが一時的に利用不能となった場合でも、当運営者は一切の責任を負いません。
3. ユーザーが本アプリを利用したことにより生じた損害について、当運営者に故意または重大な過失がある場合を除き、一切の責任を負わないものとします。

第6条（規約の変更および連絡先）
当運営者は、必要に応じて本規約を変更することがあります。本規約に関するお問い合わせは、以下のメールアドレスまでご連絡ください。
・連絡先: ${config.CONTACT_EMAIL}
・最終更新日: ${config.TERMS_LAST_UPDATED}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullTermsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 text-rose-400 rounded-2xl border border-slate-700">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                Pinterest App Compliance
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                利用規約 (Terms of Service - 簡易版)
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'コピー完了' : '全文コピー'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>印刷 / PDF保存</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          本利用規約は、「<strong className="text-white">{config.APP_NAME}</strong>」の利用条件、Pinterest APIの利用ガイドラインの遵守、画像著作権の取り扱い方針を定めた規定です。
        </p>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-rose-400" />
              運営者: <strong className="text-white">{config.OPERATOR_NAME}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              連絡先: <code className="text-white font-mono">{config.CONTACT_EMAIL}</code>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              最終更新日: <strong className="text-white font-mono">{config.TERMS_LAST_UPDATED}</strong>
            </span>
          </div>

          <button
            onClick={onOpenConfig}
            className="text-[11px] font-bold text-rose-400 hover:text-rose-300 underline flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            変数を変更する
          </button>
        </div>
      </div>

      {/* Main Document Body */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs text-slate-800 dark:text-slate-200 leading-relaxed text-sm space-y-8">
        
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          本利用規約（以下、「本規約」といいます。）は、<strong>{config.OPERATOR_NAME}</strong>（以下、「当運営者」といいます。）が提供するウェブアプリケーション「<strong>{config.APP_NAME}</strong>」（以下、「本アプリ」といいます。）の利用条件を定めるものです。ユーザーは、本アプリを利用することにより、本規約に同意したものとみなされます。
        </p>

        {/* Section 1 */}
        <section className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">1</span>
            第1条（適用範囲）
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
            本規約は、本アプリの閲覧、Pinterestボード情報の取得、画像のダウンロード機能を利用する全てのユーザーに適用されます。
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">2</span>
            第2条（Pinterest利用規約の遵守）
          </h2>
          <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8 space-y-1">
            <p>1. 本アプリはPinterest Developer APIを利用して機能を提供しています。ユーザーは、本アプリの利用にあたり、Pinterest, Inc.が定める「Pinterest利用規約」および「Developer Terms of Service」を遵守するものとします。</p>
            <p>2. ユーザーは、Pinterest上で非公開（シークレット）に設定されたボードやアクセス権限のないコンテンツへの不正アクセスを行ってはなりません。</p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">3</span>
            第3条（著作権および画像利用条件）
          </h2>
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1.5 text-xs text-amber-900 dark:text-amber-200 ml-8">
            <p className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              個人利用の限定規定
            </p>
            <p>1. 本アプリを通じて取得・表示されるピン画像およびコンテンツの著作権・知的財産権は、各投稿者またはPinterest, Inc.に帰属します。</p>
            <p>2. ユーザーは、ダウンロードした画像を個人利用の範囲内でのみ利用するものとし、無断での再配布、商業利用、二次転載を行ってはなりません。</p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">4</span>
            第4条（禁止事項）
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 pl-8 mb-2">
            ユーザーは、本アプリの利用にあたり、以下の行為を行ってはなりません。
          </p>
          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 pl-12 list-disc">
            <li>法令または公序良俗に反する行為</li>
            <li>Pinterest APIまたは本アプリのサーバーに過剰な負荷をかける自動攻撃や過剰アクセス</li>
            <li>Pinterest APIのアクセストークンの不正取得、抽出、解析行為</li>
            <li>第三者の著作権、プライバシー権、肖像権その他の権利を侵害する行為</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">5</span>
            第5条（免責事項）
          </h2>
          <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8 space-y-1">
            <p>1. 本アプリは現状有姿で提供され、当運営者は、本アプリの完全性、継続性、安全性について保証するものではありません。</p>
            <p>2. Pinterest APIの仕様変更、アクセス制限、障害等により本アプリが利用不能となった場合でも、当運営者は一切の責任を負いません。</p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">6</span>
            第6条（規約の変更および連絡先）
          </h2>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs space-y-1.5 ml-8">
            <p>本規約に関するご質問・お問い合わせは、下記メールアドレスまでご連絡ください。</p>
            <p>・<strong>お問い合わせ窓口:</strong> <code className="font-mono text-rose-600 dark:text-rose-400 font-bold">{config.CONTACT_EMAIL}</code></p>
            <p>・<strong>最終更新日:</strong> <span className="font-mono text-slate-700 dark:text-slate-300 font-bold">{config.TERMS_LAST_UPDATED}</span></p>
          </div>
        </section>

      </div>

    </div>
  );
};

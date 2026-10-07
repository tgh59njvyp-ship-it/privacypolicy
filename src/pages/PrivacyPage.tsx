import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Printer, 
  Copy, 
  Check, 
  Mail, 
  Globe, 
  Lock, 
  Info, 
  CheckCircle2, 
  ExternalLink,
  Calendar,
  Building2,
  FileText,
  Sparkles
} from 'lucide-react';
import { SiteConfig } from '../config/site';
import { TableOfContents } from '../components/TableOfContents';
import { TocItem } from '../types';

interface PrivacyPageProps {
  config: SiteConfig;
  onOpenConfig: () => void;
  onOpenPinterestGuide: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({
  config,
  onOpenConfig,
  onOpenPinterestGuide,
}) => {
  const [copiedText, setCopiedText] = useState(false);

  const tocItems: TocItem[] = [
    { id: 'sec-1', number: '1', title: '事業者情報' },
    { id: 'sec-2', number: '2', title: '対象となるサービス' },
    { id: 'sec-3', number: '3', title: '取得する情報' },
    { id: 'sec-4', number: '4', title: '利用目的' },
    { id: 'sec-5', number: '5', title: '第三者提供' },
    { id: 'sec-6', number: '6', title: 'Pinterestデータの取り扱い' },
    { id: 'sec-7', number: '7', title: '画像の取り扱い及び著作権' },
    { id: 'sec-8', number: '8', title: 'Cookie・アナリティクスの使用について' },
    { id: 'sec-9', number: '9', title: '安全管理措置' },
    { id: 'sec-10', number: '10', title: '未成年者の利用' },
    { id: 'sec-11', number: '11', title: '開示・訂正・削除の請求' },
    { id: 'sec-12', number: '12', title: 'プライバシーポリシーの変更' },
    { id: 'sec-13', number: '13', title: '制定日・最終更新日' },
  ];

  const handlePrint = () => {
    window.print();
  };

  const fullPolicyText = `プライバシーポリシー

本ウェブサイトおよび本アプリケーション「${config.APP_NAME}」（以下、「本アプリ」といいます。）は、${config.OPERATOR_NAME}（以下、「当運営者」といいます。）が提供するサービスです。当運営者は、ユーザーの個人情報およびプライバシーの保護を極めて重要な責務と認識し、個人情報の保護に関する法律その他の関係法令、ならびにPinterest APIガイドラインを遵守し、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定め、適切な取り扱いに努めます。

第1条（事業者情報）
・運営者名（個人または法人）: ${config.OPERATOR_NAME}
・連絡先メールアドレス: ${config.CONTACT_EMAIL}
・ウェブサイトURL: ${config.SITE_URL}

第2条（対象となるサービス）
本アプリは、Pinterest Developer APIを利用し、ユーザーが指定したPinterestボードの公開ピン情報および画像を取得・一覧表示し、個人の利便性を向上させる機能を提供するウェブアプリケーションです。

第3条（取得する情報）
当運営者は、本アプリの提供にあたり、以下の情報を取得または取り扱います。
1. ユーザーが入力した情報: ユーザーが本アプリに入力したPinterestボードのURLまたはボードID
2. Pinterest APIを通じて取得する公開情報: 指定されたPinterestボードに含まれるピンの画像URL、説明文、タイトル、ピンID等の公開情報
3. Pinterest APIのアクセストークン: 運営者がサーバー側の環境変数において厳重に管理し、クライアント（ユーザー端末）からの取得・閲覧・保存は行いません。
4. 技術的アクセス情報: 本アプリのホスティング事業者（Vercel Inc. 等）のサーバーログを通じて自動的に収集される一般的なアクセスログ（IPアドレス、ブラウザ識別子、アクセス日時等）

第4条（利用目的）
取得した情報は、以下の目的の範囲内でのみ利用します。
1. 指定されたPinterestボード内の画像および公開情報の一覧表示機能の提供
2. ボード内のピン画像の一括閲覧およびサポート機能の提供
3. 障害発生時のサポート、ログ確認、システムエラーの調査対応
4. 本アプリの機能改善、セキュリティ向上および利便性向上

第5条（第三者提供）
当運営者は、法令に基づく場合を除き、あらかじめユーザーの同意を得ることなく、取得した情報を第三者に提供・開示することはありません。ただし、本アプリの正常な運営に必要な範囲で、以下の外部サービスを利用します。
・Pinterest API (Pinterest, Inc.): ボード情報および公開ピンデータの取得
・ホスティング・インフラ事業者 (Vercel Inc.): 本Webサイトの静的コンテンツ配信およびサーバー環境の提供

第6条（Pinterestデータの取り扱いおよび非保存原則）
1. 本アプリは、Pinterest APIを通じて取得したデータを、アプリの機能提供（一覧表示およびダウンロード処理）に必要な一時的な処理の範囲でのみ利用します。
2. 当運営者のサーバー上において、Pinterestから取得したピンデータ、ユーザー情報、画像ファイルを永続的に保存・蓄積することはありません。
3. ユーザーは、Pinterestのアカウント設定（「連携アプリ」項目）から、いつでも本アプリとの連携権限を取り消すことができます。

第7条（画像の取り扱いおよび著作権方針）
1. 本アプリを通じて取得・表示・ダウンロードされるピン画像および付随コンテンツの知的財産権・著作権は、画像を作成・投稿した権利者またはPinterest, Inc.に帰属します。
2. ユーザーは、本アプリを通じて取得した画像について、個人利用の範囲内でのみ使用するものとし、無断での再配布、転載、商業的利用を行ってはなりません。

第8条（Cookie・アナリティクスの使用について）
本アプリでは、ユーザー個人の追跡を目的としたCookie（クッキー）および第三者アクセス解析ツール（Google アナリティクス等）は使用しておりません。

第9条（安全管理措置）
当運営者は、情報の紛失、破壊、改ざんおよび漏洩などを防止するため、以下の安全管理措置を講じています。
1. APIアクセストークンおよび機密情報は、サーバー側の安全な環境変数（Environment Variables）で管理します。
2. 本アプリとユーザー間の全ての通信は、HTTPS（SSL/TLS暗号化通信）を用いて保護します。

第10条（未成年者の利用）
未成年者が本アプリを利用する場合は、保護者または親権者の同意を得た上でご利用ください。

第11条（開示・訂正・削除の請求手続き）
ユーザーは、当運営者に対し、自己のデータに関する開示、訂正、追加、削除、利用停止を請求することができます。ご請求につきましては、第1条に定める連絡先メールアドレス（${config.CONTACT_EMAIL}）宛てに電子メールにてご連絡ください。本人確認を実施の上、速やかに対応いたします。

第12条（プライバシーポリシーの変更）
当運営者は、法令の制定・改正、Pinterest API利用規約の変更、または本アプリの機能変更に伴い、本ポリシーを変更することがあります。変更後のポリシーは本サイト上に掲載した時点で効力を生じるものとし、トップページおよび本ページにて最終更新日（LAST_UPDATED）を更新します。

第13条（制定日・最終更新日）
制定日: 2026年10月4日
最終更新日: ${config.LAST_UPDATED}`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(fullPolicyText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-600 rounded-2xl text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-rose-300 tracking-wider uppercase">
                Pinterest API審査対応 ドキュメント
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                プライバシーポリシー (Privacy Policy)
              </h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
            >
              {copiedText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copiedText ? 'コピー完了' : '全文テキストコピー'}</span>
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
          本プライバシーポリシーは、アプリ「<strong className="text-white">{config.APP_NAME}</strong>」におけるPinterest API利用時の個人情報およびデータの取り扱い方針を明記した規定です。
        </p>

        {/* Live Config Variables Summary Bar */}
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
              最終更新日: <strong className="text-white font-mono">{config.LAST_UPDATED}</strong>
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

      {/* Main Content Layout with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Table of Contents Sidebar */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <TableOfContents items={tocItems} title="セクション目次" />
        </div>

        {/* Document Body */}
        <div className="lg:col-span-3 order-1 lg:order-2 space-y-8 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs text-slate-800 dark:text-slate-200 leading-relaxed text-sm">
          
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            本ウェブサイトおよび本アプリケーション「<strong>{config.APP_NAME}</strong>」（以下、「本アプリ」といいます。）は、<strong>{config.OPERATOR_NAME}</strong>（以下、「当運営者」といいます。）が提供するサービスです。当運営者は、ユーザーの個人情報およびプライバシーの保護を極めて重要な責務と認識し、個人情報の保護に関する法律その他の関係法令、ならびにPinterest APIガイドラインを遵守し、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定め、適切な取り扱いに努めます。
          </p>

          {/* Sec 1 */}
          <section id="sec-1" className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">1</span>
              事業者情報
            </h2>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs">
              <p>・<strong>運営者名称:</strong> {config.OPERATOR_NAME}</p>
              <p>・<strong>問い合わせ窓口 (メール):</strong> <code className="font-mono text-rose-600 dark:text-rose-400 font-bold">{config.CONTACT_EMAIL}</code></p>
              <p>・<strong>公式サイトURL:</strong> <span className="font-mono text-slate-600 dark:text-slate-400">{config.SITE_URL}</span></p>
            </div>
          </section>

          {/* Sec 2 */}
          <section id="sec-2" className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">2</span>
              対象となるサービス
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              本アプリは、Pinterest Developer APIを利用し、ユーザーが指定したPinterestボードの公開ピン情報および画像を取得・一覧表示し、お気に入りの画像の閲覧および一括ダウンロードをサポートする機能を提供するウェブアプリケーションです。
            </p>
          </section>

          {/* Sec 3 */}
          <section id="sec-3" className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">3</span>
              取得する情報
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              当運営者は、本アプリの提供にあたり、以下の情報を取得または取り扱います。
            </p>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pl-4 list-disc">
              <li><strong>ユーザーが入力した情報:</strong> ユーザーが本アプリに入力したPinterestボードのURLまたはボード識別子 (Board ID)</li>
              <li><strong>Pinterest APIを通じて取得する公開情報:</strong> 指定されたPinterestボードに含まれるピンの画像URL、説明文、タイトル、ピンID等の公開情報</li>
              <li><strong>Pinterest APIのアクセストークン:</strong> 運営者がサーバー側の環境変数 (Environment Variables) において厳重に管理し、ユーザーのブラウザ・端末から直接取得・閲覧・保存することは行いません。</li>
              <li><strong>一般的な技術アクセス情報:</strong> 本アプリのホスティング事業者（Vercel Inc. 等）の標準サーバーログを通じて自動的に記録されるIPアドレス、ブラウザ種類、アクセス日時等の技術情報</li>
            </ul>
          </section>

          {/* Sec 4 */}
          <section id="sec-4" className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">4</span>
              利用目的
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              取得した情報は、以下の目的の範囲内でのみ利用します。
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pl-4 list-disc">
              <li>ボード内の画像および公開情報の一覧表示および一括ダウンロード機能の提供</li>
              <li>障害発生時のシステムデバッグおよびお問い合わせへのサポート対応</li>
              <li>本アプリの機能改善、セキュリティ向上およびサービス最適化</li>
            </ul>
          </section>

          {/* Sec 5 */}
          <section id="sec-5" className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">5</span>
              第三者提供
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              当運営者は、法令に基づく場合を除き、あらかじめユーザーの同意を得ることなく、取得した情報を第三者に提供・開示することはありません。ただし、本アプリの正常な運営に必要な範囲で、以下の外部プラットフォームおよびインフラサービスにデータを送信します。
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs">
              <p>・<strong>Pinterest, Inc. (Pinterest API):</strong> 公開ボードおよびピン画像の取得目的</p>
              <p>・<strong>Vercel Inc. / ホスティング事業者:</strong> Webサイトの静的配信およびサーバー環境の提供目的</p>
            </div>
          </section>

          {/* Sec 6 */}
          <section id="sec-6" className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">6</span>
              Pinterestデータの取り扱い及び非保存原則
            </h2>
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 space-y-2 text-xs text-rose-900 dark:text-rose-200">
              <p className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-rose-600" />
                Pinterest API データ非保存に関する明示規定
              </p>
              <ol className="list-decimal pl-4 space-y-1 leading-relaxed">
                <li>本アプリは、Pinterest APIを通じて取得したデータを、アプリの機能提供（一覧表示および一時的なZIP作成処理）に必要な範囲でのみ利用します。</li>
                <li>当運営者のデータベースおよびサーバー上において、取得したピンデータ、ユーザー情報、画像ファイルを永続的に保存・蓄積することはありません。</li>
                <li>ユーザーは、Pinterestのアカウント設定（「連携アプリ」設定画面）から、いつでも本アプリとの連携権限を自ら解除することができます。</li>
              </ol>
            </div>
          </section>

          {/* Sec 7 */}
          <section id="sec-7" className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">7</span>
              画像の取り扱い及び著作権方針
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              本アプリを通じて表示・ダウンロードされるピン画像および付随コンテンツの知的財産権・著作権は、画像を作成・投稿した権利者またはPinterest, Inc.に帰属します。ユーザーに対し、本アプリで取得・保存した画像は<strong>個人利用の範囲内</strong>でのみ使用し、無断転載・再配布・商業的利用を行わないよう遵守を求めます。
            </p>
          </section>

          {/* Sec 8 */}
          <section id="sec-8" className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">8</span>
              Cookie・アナリティクスの使用について
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              本アプリでは、ユーザー行動追跡を目的としたCookie（クッキー）および第三者アクセス解析ツール（Google アナリティクス等）は使用しておりません。
            </p>
          </section>

          {/* Sec 9 */}
          <section id="sec-9" className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">9</span>
              安全管理措置
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              当運営者は、情報の不正アクセス、破壊、漏洩などを防止するため、以下の措置を実施しています。
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pl-4 list-disc">
              <li>APIアクセストークンおよび機密情報は、サーバー側の環境変数で厳重に保護管理します。</li>
              <li>全ての通信は、HTTPS（SSL/TLS暗号化通信）により常に暗号化されています。</li>
            </ul>
          </section>

          {/* Sec 10 */}
          <section id="sec-10" className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">10</span>
              未成年者の利用
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              未成年者のユーザーが本アプリを利用する場合は、必ず保護者または親権者の同意を得た上でご利用ください。
            </p>
          </section>

          {/* Sec 11 */}
          <section id="sec-11" className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">11</span>
              開示・訂正・削除の請求手続き
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              ユーザーは、当運営者に対し、自己のデータに関する開示、訂正、削除を請求することができます。ご請求につきましては、第1条の公式問い合わせ窓口（<code className="font-mono text-rose-600 dark:text-rose-400">{config.CONTACT_EMAIL}</code>）宛てに電子メールにてご連絡ください。本人確認を行った上で、合理的な期間内に遅滞なく対応いたします。
            </p>
          </section>

          {/* Sec 12 */}
          <section id="sec-12" className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">12</span>
              プライバシーポリシーの変更
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              当運営者は、法令の改正、Pinterest Developer利用規約の変更、または本アプリの機能アップデートに伴い、本ポリシーを変更することがあります。変更後のポリシーは本サイト上に掲載された時点で効力を生じるものとし、改定日はページトップおよび第13条に表示します。
            </p>
          </section>

          {/* Sec 13 */}
          <section id="sec-13" className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-mono font-bold">13</span>
              制定日・最終更新日
            </h2>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 text-xs font-mono">
              <p>・<strong>制定日:</strong> 2026年10月4日</p>
              <p>・<strong>最終更新日:</strong> <span className="text-rose-600 dark:text-rose-400 font-bold">{config.LAST_UPDATED}</span></p>
            </div>
          </section>

        </div>

      </div>

    </div>
  );
};

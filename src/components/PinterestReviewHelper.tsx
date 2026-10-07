import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SiteConfig, getFullPrivacyUrl, getFullTermsUrl } from '../config/site';

interface PinterestReviewHelperProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
}

export const PinterestReviewHelper: React.FC<PinterestReviewHelperProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const websiteUrl = config.SITE_URL || 'https://your-app.vercel.app';
  const privacyUrl = getFullPrivacyUrl(websiteUrl);
  const termsUrl = getFullTermsUrl(websiteUrl);

  const handleCopy = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const urlConfigs = [
    {
      id: 'website',
      label: 'App Website URL (アプリ公式サイト)',
      value: websiteUrl,
      pinterestField: 'App Website URL',
      description: 'アプリのトップページのURLです。'
    },
    {
      id: 'privacy',
      label: 'Privacy Policy URL (プライバシーポリシー)',
      value: privacyUrl,
      pinterestField: 'Privacy Policy URL',
      description: 'Pinterest Review 提出用。直接アクセス可能かつ公開状態が必要です。'
    },
    {
      id: 'terms',
      label: 'Terms of Service URL (利用規約)',
      value: termsUrl,
      pinterestField: 'Terms of Service URL',
      description: 'Pinterest Review 提出用。利用権限や画像の個人利用規定を明記。'
    }
  ];

  const checklistItems = [
    {
      title: '公開アクセスの確認',
      desc: 'プライバシーポリシーURLにログインなしで誰でもアクセスできる状態になっていますか？',
    },
    {
      title: 'アクセストークン保管規定の確認',
      desc: 'Pinterest APIのアクセストークンをブラウザ（クライアント側）ではなくサーバー環境変数で管理する旨が第3条および第9条に記載されていますか？',
    },
    {
      title: '非保存ポリシーの記載',
      desc: 'ボード画像および情報の非保存（または一括DL処理時の一時利用のみ）の規定が第6条に明確に記載されていますか？',
    },
    {
      title: '著作権帰属の指定',
      desc: '取得した画像の権利は元の権利者に帰属し、個人利用の範囲に限定される旨が第7条に記載されていますか？',
    },
    {
      title: '実在する連絡先メールアドレス',
      desc: `「${config.CONTACT_EMAIL}」は実際に問い合わせを受信できる有効なアドレスですか？`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-rose-600 to-red-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-sm">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">
                Pinterest Developer App 設定入力ガイド
              </h2>
              <p className="text-xs text-rose-100">
                Pinterest Developer Console の App Review 設定画面に入力するURL一覧
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Important Notice */}
          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-2xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-900 dark:text-rose-200 space-y-1">
              <p className="font-bold">
                Pinterest App Review の審査通過ポイント
              </p>
              <p className="leading-relaxed">
                Pinterest Developer Portal (<a href="https://developers.pinterest.com/" target="_blank" rel="noreferrer" className="underline font-semibold hover:text-rose-600">developers.pinterest.com</a>) の 「App Settings」 に以下のURLを正確に貼り付けてください。審査員は実際にURLへアクセスして内容をチェックします。
              </p>
            </div>
          </div>

          {/* URL Copy List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-rose-500" />
              Pinterest 審査入力用 URL (1クリックコピー)
            </h3>

            {urlConfigs.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2 hover:border-rose-300 dark:hover:border-rose-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    {item.label}
                  </span>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    Pinterest: {item.pinterestField}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={item.value}
                    className="flex-1 px-3 py-2 rounded-xl text-xs font-mono bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopy(item.id, item.value)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500 transition-colors shadow-xs shrink-0"
                  >
                    {copiedField === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>コピー完了</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>コピー</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Checklist */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              審査提出前 セルフチェックリスト
            </h3>

            <div className="space-y-2">
              {checklistItems.map((chk, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {chk.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {chk.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <a
            href="https://developers.pinterest.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 font-medium"
          >
            <span>Pinterest Developer Console を開く</span>
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

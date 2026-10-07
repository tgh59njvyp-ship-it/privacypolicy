import React from 'react';
import { ShieldCheck, Mail, ExternalLink, Heart, Clock } from 'lucide-react';
import { SiteConfig, getFullPrivacyUrl, getFullTermsUrl } from '../config/site';

interface FooterProps {
  config: SiteConfig;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                {config.APP_NAME}
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {config.APP_DESCRIPTION || "Pinterest APIを利用した公開ボード閲覧・ピン一括保存サポートツールの公式プライバシーポリシー及び利用規約ポータル"}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60">
                <Clock className="w-3.5 h-3.5 text-rose-400" />
                <span>最終更新日: <strong className="text-slate-200 font-mono">{config.LAST_UPDATED}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60">
                <span>運営者: <strong className="text-slate-200">{config.OPERATOR_NAME}</strong></span>
              </div>
            </div>
          </div>

          {/* Site Pages Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              ページリンク
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-rose-400 transition-colors"
                >
                  トップページ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy')}
                  className="hover:text-rose-400 transition-colors"
                >
                  プライバシーポリシー
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="hover:text-rose-400 transition-colors"
                >
                  利用規約
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/deploy-guide')}
                  className="hover:text-rose-400 transition-colors"
                >
                  デプロイ＆Pinterest審査ガイド
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Pinterest Developer Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              お問い合わせ・各種リンク
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={`mailto:${config.CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-rose-400 transition-colors font-mono"
                >
                  <Mail className="w-3.5 h-3.5 text-rose-500" />
                  <span>{config.CONTACT_EMAIL}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://developers.pinterest.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <span>Pinterest Developer Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://policy.pinterest.com/ja/developer-terms-of-service"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <span>Pinterest Developer 規約</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {config.OPERATOR_NAME}. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            <span>Pinterest App Review Compliance Optimized</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

/**
 * @file site.ts
 * @description アプリ全般および各種ポリシーで使用される設定値の集約ファイル
 * 開発者・運営者は環境やアプリ情報に合わせて下記の値を編集してください。
 */

export interface SiteConfig {
  /** アプリケーション名 */
  APP_NAME: string;
  /** アプリの簡単な説明（英語/日本語） */
  APP_DESCRIPTION: string;
  /** 運営者名 または 個人名 */
  OPERATOR_NAME: string;
  /** 連絡先メールアドレス（問い合わせ・開示請求受付用） */
  CONTACT_EMAIL: string;
  /** プライバシーポリシーの最終更新日 */
  LAST_UPDATED: string;
  /** 利用規約の最終更新日 */
  TERMS_LAST_UPDATED: string;
  /** サイトの公開URL（Vercel等のデプロイ後のURL） */
  SITE_URL: string;
  /** サービス提供・サポート受付時間 */
  SUPPORT_HOURS?: string;
  /** Pinterest API の主な使用用途 */
  PINTEREST_USAGE_SUMMARY?: string;
}

export const siteConfig: SiteConfig = {
  // アプリ名（Pinterest App Review のアプリ名と一致させてください）
  APP_NAME: "PinVault Studio",

  // アプリの概要説明
  APP_DESCRIPTION: "Pinterestの公開ボード情報を活用し、お気に入りのピン画像の一覧表示・一括ダウンロードをサポートする便利ツール",

  // 運営者名 または 個人名
  OPERATOR_NAME: "PinVault 運営事務局 (または 個人名)",

  // 連絡先メールアドレス（Pinterest審議担当者およびユーザーからの問い合わせ窓口）
  CONTACT_EMAIL: "support@example.com",

  // 最終更新日 (YYYY年MM月DD日)
  LAST_UPDATED: "2026年10月4日",

  // 利用規約の最終更新日
  TERMS_LAST_UPDATED: "2026年10月4日",

  // デプロイ後の本番WebサイトURL（末尾のスラッシュなし）
  SITE_URL: "https://your-pin-app.vercel.app",

  // 問い合わせサポート対応時間
  SUPPORT_HOURS: "平日 10:00 - 18:00 (土日祝日除く)",

  // Pinterest API利用目的
  PINTEREST_USAGE_SUMMARY: "Pinterest APIを利用し、ユーザーが指定した公開ボードのピン画像URL・説明文等の情報を取得・表示します。"
};

/**
 * サイト設定のヘルパー関数
 */
export const getFullPrivacyUrl = (baseUrl: string = siteConfig.SITE_URL) => {
  const cleanBase = baseUrl.replace(/\/+$/, "");
  return `${cleanBase}/privacy`;
};

export const getFullTermsUrl = (baseUrl: string = siteConfig.SITE_URL) => {
  const cleanBase = baseUrl.replace(/\/+$/, "");
  return `${cleanBase}/terms`;
};

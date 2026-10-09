import JSZip from 'jszip';
import { SiteConfig, getFullPrivacyUrl, getFullTermsUrl } from '../config/site';

export interface ProjectFileInfo {
  path: string;
  category: 'config' | 'app' | 'public' | 'styles';
  description: string;
  code: string;
}

export function generateNextJsProjectFiles(config: SiteConfig): Record<string, ProjectFileInfo> {
  const privacyUrl = getFullPrivacyUrl(config.SITE_URL);
  const termsUrl = getFullTermsUrl(config.SITE_URL);

  return {
    'next.config.mjs': {
      path: 'next.config.mjs',
      category: 'config',
      description: 'Next.js 静的エクスポート(output: export)設定',
      code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel / Cloudflare Pages / GitHub Pages 等に完全静的デプロイするための設定
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  // 静的エクスポート時の圧縮最適化
  compress: true,
  // 厳格モード
  reactStrictMode: true,
};

export default nextConfig;
`,
    },

    'vercel.json': {
      path: 'vercel.json',
      category: 'config',
      description: 'Vercel セキュリティヘッダー & キャッシュ最適化設定',
      code: `{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    },
    {
      "source": "/_next/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(privacy|terms)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, s-maxage=3600, stale-while-revalidate=86400"
        }
      ]
    }
  ]
}
`,
    },

    'package.json': {
      path: 'package.json',
      category: 'config',
      description: 'プロジェクト依存関係およびビルドスクリプト',
      code: `{
  "name": "${config.APP_NAME.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'pinterest-app'}-policy",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.15",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.453.0"
  },
  "devDependencies": {
    "@types/node": "^20.14.10",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.5.3"
  }
}
`,
    },

    'src/config/site.ts': {
      path: 'src/config/site.ts',
      category: 'config',
      description: 'アプリ名・運営者名・連絡先メール等の集約変数',
      code: `export interface SiteConfig {
  APP_NAME: string;
  APP_DESCRIPTION: string;
  OPERATOR_NAME: string;
  CONTACT_EMAIL: string;
  LAST_UPDATED: string;
  TERMS_LAST_UPDATED: string;
  SITE_URL: string;
}

export const siteConfig: SiteConfig = {
  APP_NAME: "${config.APP_NAME}",
  APP_DESCRIPTION: "${config.APP_DESCRIPTION}",
  OPERATOR_NAME: "${config.OPERATOR_NAME}",
  CONTACT_EMAIL: "${config.CONTACT_EMAIL}",
  LAST_UPDATED: "${config.LAST_UPDATED}",
  TERMS_LAST_UPDATED: "${config.TERMS_LAST_UPDATED}",
  SITE_URL: "${config.SITE_URL}",
};
`,
    },

    'app/layout.tsx': {
      path: 'app/layout.tsx',
      category: 'app',
      description: 'Next.js App Router ルートレイアウト & メタデータ',
      code: `import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/src/config/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: \`\${siteConfig.APP_NAME} - プライバシーポリシー & 利用規約\`,
  description: siteConfig.APP_DESCRIPTION,
  metadataBase: new URL(siteConfig.SITE_URL),
  openGraph: {
    title: \`\${siteConfig.APP_NAME} - プライバシーポリシー\`,
    description: siteConfig.APP_DESCRIPTION,
    url: siteConfig.SITE_URL,
    siteName: siteConfig.APP_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: \`\${siteConfig.APP_NAME} - プライバシーポリシー\`,
    description: siteConfig.APP_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={\`\${inter.className} bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen antialiased\`}>
        {children}
      </body>
    </html>
  );
}
`,
    },

    'app/page.tsx': {
      path: 'app/page.tsx',
      category: 'app',
      description: 'トップページ (/)',
      code: `import Link from 'next/link';
import { ShieldCheck, FileText, ExternalLink, Mail, Building2, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/src/config/site';

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16 sm:py-24 space-y-12">
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-2xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-rose-400" />
          <span>Pinterest API 審査対応</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black">{siteConfig.APP_NAME}</h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{siteConfig.APP_DESCRIPTION}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <p className="text-slate-400">運営者 / 組織名</p>
            <p className="font-bold text-white text-sm">{siteConfig.OPERATOR_NAME}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <p className="text-slate-400">お問い合わせ先</p>
            <p className="font-bold text-white text-sm font-mono">{siteConfig.CONTACT_EMAIL}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link href="/privacy" className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-colors shadow-lg">
            プライバシーポリシーを読む
          </Link>
          <Link href="/terms" className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-colors border border-slate-700">
            利用規約を読む
          </Link>
        </div>
      </div>
    </main>
  );
}
`,
    },

    'app/privacy/page.tsx': {
      path: 'app/privacy/page.tsx',
      category: 'app',
      description: 'プライバシーポリシー (/privacy) 全13項目',
      code: `import { siteConfig } from '@/src/config/site';
import { ShieldCheck, Mail, Building2, Calendar, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: \`プライバシーポリシー | \${siteConfig.APP_NAME}\`,
  description: \`\${siteConfig.APP_NAME}のPinterest API利用におけるプライバシーポリシーです。\`,
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4">
        <Link href="/" className="text-xs text-rose-400 hover:underline">← トップページに戻る</Link>
        <h1 className="text-3xl font-black">プライバシーポリシー (Privacy Policy)</h1>
        <p className="text-xs text-slate-300">
          本プライバシーポリシーは、「{siteConfig.APP_NAME}」におけるPinterest API利用時の個人情報およびデータの取り扱い方針を明記した規定です。
        </p>
        <div className="p-4 rounded-2xl bg-slate-800 flex flex-wrap gap-4 text-xs">
          <span>運営者: <strong>{siteConfig.OPERATOR_NAME}</strong></span>
          <span>連絡先: <strong className="font-mono">{siteConfig.CONTACT_EMAIL}</strong></span>
          <span>最終更新日: <strong className="font-mono">{siteConfig.LAST_UPDATED}</strong></span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第1条（事業者情報）</h2>
          <p>運営者名称: {siteConfig.OPERATOR_NAME}</p>
          <p>問い合わせ窓口: {siteConfig.CONTACT_EMAIL}</p>
          <p>公式サイトURL: {siteConfig.SITE_URL}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第2条（対象となるサービス）</h2>
          <p>本アプリは、Pinterest APIを利用し、ユーザーが指定したPinterestボードの公開ピン情報および画像を取得・一覧表示する機能を提供します。</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第3条（取得する情報）</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>ユーザーが入力したPinterestボードURL</li>
            <li>Pinterest APIを通じて取得するピンの画像URL、説明文等の公開情報</li>
            <li>Pinterestのアクセストークンは運営者がサーバー側の環境変数で管理し、ユーザーからは取得しません。</li>
            <li>一般的なサーバーアクセスログ（ホスティング事業者が取得する範囲）</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第4条（利用目的）</h2>
          <p>ボード内の画像の一覧表示および一括ダウンロード機能の提供、障害対応、機能改善のために利用します。</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第5条（第三者提供）</h2>
          <p>法令に基づく場合を除き第三者へ提供しません。サービス提供に必要な外部サービス（Pinterest, Inc.、Vercel Inc.）へデータが送信されます。</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第6条（Pinterestデータの取り扱い）</h2>
          <p>取得したデータはアプリの機能提供に必要な範囲でのみ利用し、サーバー上への永続保存は行いません。ユーザーはPinterestの設定からアプリとの連携を解除できます。</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第7条（画像の取り扱い）</h2>
          <p>取得した画像の著作権は各権利者に帰属します。ユーザーには個人利用の範囲内で使用することを求めます。</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第8条（Cookie・アナリティクス）</h2>
          <p>本アプリではトラッキング用Cookieおよびアクセス解析ツールは使用しておりません。</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第9条（安全管理措置）</h2>
          <p>アクセストークンはサーバー側環境変数で管理し、通信は常時HTTPS暗号化を行っています。</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第10条（未成年者の利用）</h2>
          <p>未成年者が利用する場合は保護者または親権者の同意を得てください。</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第11条（開示・訂正・削除の請求）</h2>
          <p>連絡先メールアドレス（{siteConfig.CONTACT_EMAIL}）にて遅滞なく受け付けます。</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第12条（プライバシーポリシーの変更）</h2>
          <p>変更時は本サイト上で告知し、LAST_UPDATEDを更新します。</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第13条（制定日・最終更新日）</h2>
          <p>制定日: 2026年10月4日 / 最終更新日: {siteConfig.LAST_UPDATED}</p>
        </section>
      </div>
    </div>
  );
}
`,
    },

    'app/terms/page.tsx': {
      path: 'app/terms/page.tsx',
      category: 'app',
      description: '利用規約 (/terms) 簡易版',
      code: `import { siteConfig } from '@/src/config/site';
import Link from 'next/link';

export const metadata = {
  title: \`利用規約 | \${siteConfig.APP_NAME}\`,
  description: \`\${siteConfig.APP_NAME}の利用規約です。\`,
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4">
        <Link href="/" className="text-xs text-rose-400 hover:underline">← トップページに戻る</Link>
        <h1 className="text-3xl font-black">利用規約 (簡易版)</h1>
        <p className="text-xs text-slate-300">
          本利用規約は、「{siteConfig.APP_NAME}」の利用条件を定めるものです。
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第1条（適用範囲）</h2>
          <p>本アプリを利用するすべてのユーザーに本規約が適用されます。</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第2条（Pinterest利用規約の遵守）</h2>
          <p>ユーザーはPinterestの公式利用規約およびDeveloper Terms of Serviceを遵守するものとします。</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第3条（著作権および画像利用権）</h2>
          <p>ピン画像の著作権は各権利者に帰属します。ユーザーは個人利用の範囲でのみ利用できます。</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第4条（禁止事項）</h2>
          <p>過剰な負荷をかけるスクレイピング、トークンの不正取得、商業的乱用等を禁止します。</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第5条（免責事項）</h2>
          <p>Pinterest APIの仕様変更や障害等によりサービスが停止した場合でも免責されます。</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">第6条（連絡先）</h2>
          <p>お問い合わせ窓口: {siteConfig.CONTACT_EMAIL} / 最終更新日: {siteConfig.TERMS_LAST_UPDATED}</p>
        </section>
      </div>
    </div>
  );
}
`,
    },

    'app/sitemap.ts': {
      path: 'app/sitemap.ts',
      category: 'app',
      description: 'Next.js 自動 sitemap.xml 生成',
      code: `import { MetadataRoute } from 'next';
import { siteConfig } from '@/src/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.SITE_URL.replace(/\\/+$/, '');
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: \`\${baseUrl}/privacy\`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: \`\${baseUrl}/terms\`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
`,
    },

    'app/robots.ts': {
      path: 'app/robots.ts',
      category: 'app',
      description: 'Next.js 自動 robots.txt 生成 (Pinterestbot 許可設定)',
      code: `import { MetadataRoute } from 'next';
import { siteConfig } from '@/src/config/site';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.SITE_URL.replace(/\\/+$/, '');
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/privacy', '/terms'],
      },
      {
        userAgent: 'Pinterestbot',
        allow: ['/', '/privacy', '/terms'],
      },
    ],
    sitemap: \`\${baseUrl}/sitemap.xml\`,
  };
}
`,
    },

    'app/globals.css': {
      path: 'app/globals.css',
      category: 'styles',
      description: 'Tailwind CSS スタイル定義',
      code: `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
    },

    'tailwind.config.ts': {
      path: 'tailwind.config.ts',
      category: 'styles',
      description: 'Tailwind 設定ファイル',
      code: `import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
`,
    },

    'postcss.config.mjs': {
      path: 'postcss.config.mjs',
      category: 'styles',
      description: 'PostCSS 設定ファイル',
      code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
`,
    },

    'tsconfig.json': {
      path: 'tsconfig.json',
      category: 'config',
      description: 'TypeScript 設定ファイル',
      code: `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`,
    },
  };
}

/**
 * プロジェクト全体を ZIP ファイルとして一括ダウンロード
 */
export async function downloadProjectZip(config: SiteConfig): Promise<void> {
  const zip = new JSZip();
  const files = generateNextJsProjectFiles(config);

  // ZIP 内に全ファイルを書き込み
  for (const [relativePath, fileInfo] of Object.entries(files)) {
    zip.file(relativePath, fileInfo.code);
  }

  // README も同梱
  const readmeContent = `# ${config.APP_NAME} - Pinterest API 審査対応 静的サイト

このプロジェクトは、Pinterest Developer App 審査提出用のプライバシーポリシー及び利用規約サイトです。

## 🚀 Vercel へのデプロイ手順 (環境変数 不要)

1. このリポジトリを GitHub にプッシュします。
2. [Vercel](https://vercel.com/new) でリポジトリをインポートします。
3. Framework Preset に「Next.js」が自動選択されます。
4. **環境変数は不要**です。そのまま「Deploy」をクリックすると即座に公開されます。

## 📌 Pinterest App Review 提出用 URL

- App Website URL: ${config.SITE_URL}
- Privacy Policy URL: ${getFullPrivacyUrl(config.SITE_URL)}
- Terms of Service URL: ${getFullTermsUrl(config.SITE_URL)}
`;
  zip.file('README.md', readmeContent);

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = `${(config.APP_NAME || 'pinterest-app').toLowerCase().replace(/[^a-z0-9]/g, '-')}-vercel-deploy.zip`;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { appWithTranslation } from 'next-i18next';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextI18NextConfig from '../next-i18next.config';
import { siteDomain, siteName } from '../lib/site';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  // Dynamic page titles
  const getTitle = () => {
    const path = router.pathname;
    if (path === '/') return siteName;
    if (path === '/projects') return `Projects — ${siteName}`;
    if (path.startsWith('/projects/')) return `Project — ${siteName}`;
    if (path === '/writing') return `Writing — ${siteName}`;
    if (path === '/about') return `About — ${siteName}`;
    return siteName;
  };

  return (
    <>
      <Head>
        <title>{getTitle()}</title>
        <meta name="description" content={t('meta.description', 'Software engineer with MBA. Exploring AI × Crypto.')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={getTitle()} />
        <meta property="og:description" content={t('meta.description', 'Software engineer with MBA. Exploring AI × Crypto.')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://${siteDomain}${router.asPath === '/' ? '' : router.asPath}`} />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Favicon */}
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16.png" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);

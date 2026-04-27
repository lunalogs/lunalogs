import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { appWithTranslation } from 'next-i18next';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
    if (path === '/da') return `Analytics — ${siteName}`;
    return siteName;
  };

  useEffect(() => {
    const trackPageView = () => {
      if (typeof window === 'undefined') {
        return;
      }

      const path = `${window.location.pathname}${window.location.search}`;

      if (path.startsWith('/da')) {
        return;
      }

      const payload = JSON.stringify({
        path,
        referrer: document.referrer,
        title: document.title,
        utmSource: new URLSearchParams(window.location.search).get('utm_source') || '',
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          '/api/analytics/track',
          new Blob([payload], { type: 'application/json' }),
        );
        return;
      }

      void fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      });
    };

    trackPageView();

    const handleRouteChange = () => {
      window.requestAnimationFrame(trackPageView);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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

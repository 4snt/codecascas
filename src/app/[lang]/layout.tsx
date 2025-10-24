import "@/app/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import { LanguageProvider } from "@/context/LanguageProvider";
import { LanguageKeys, SUPPORTED } from "@/lib/translations";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import type { ReactNode } from "react";

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;

  const lang = SUPPORTED.includes(langParam as LanguageKeys)
    ? (langParam as LanguageKeys)
    : "en";

  const baseUrl = "https://codecascas.vercel.app/"; // 👉 troque pelo seu domínio real

  return (
    <html lang={lang}>
      <head>
        {/* SEO básico */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Codecascas — desenvolvimento web e soluções digitais para sua presença online."
        />

        {/* Google Search Console verification */}
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Codecascas" />
        <meta
          property="og:description"
          content="Codecascas — desenvolvimento web e soluções digitais para sua presença online."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${baseUrl}/${lang}`} />
        <meta property="og:image" content={`${baseUrl}/preview.jpg`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Codecascas" />
        <meta
          name="twitter:description"
          content="Codecascas — desenvolvimento web e soluções digitais para sua presença online."
        />
        <meta name="twitter:image" content={`${baseUrl}/preview.jpg`} />

        {/* hreflang dinâmico */}
        {SUPPORTED.map((lng) => (
          <link
            key={lng}
            rel="alternate"
            hrefLang={lng}
            href={`${baseUrl}/${lng}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
      </head>

      <body>
        {/* Vercel Speed Insights */}
        <SpeedInsights />

        {/* Google Analytics GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>

        <LanguageProvider initialLang={lang}>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

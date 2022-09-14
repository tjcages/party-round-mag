import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=DM Mono&display=optional"
          rel="stylesheet"
        ></link>
        <meta charset="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
        />
        <meta name="description" content="Party Round Mag Vol.001" />
        <meta
          name="keywords"
          content="Party, Round, Mag, Magazine, 2022, Volume, Vol, 001, Party Round Mag"
        />
        <meta name="theme-color" content="#c331d5" />
        <meta
          name="msapplication-TileImage"
          content="/img/common/preview.jpg"
        />
        <meta name="msapplication-TileColor" content="#c331d5" />
        <link rel="shortcut icon" href="/img/common/icon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/common/app_icon.png"
        />
        <meta property="og:title" content="Party Round Mag" />
        <meta property="og:site_name" content="Party Round Mag" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Party Round Mag | Vol.001 Get Yours Now"
        />
        <meta property="og:url" content="undefined/" />
        <meta property="og:image" content="/img/common/preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Party Round Mag" />
        <meta
          name="twitter:description"
          content="Party Round Mag Vol.001 | Get Yours Now"
        />
        <meta name="twitter:creator" content="@PartyRound" />
        <meta name="twitter:image" content="/img/common/preview.jpg" />
        <Script
          id="google-analytics"
          strategy="beforeInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-63CEGYKFMN"
        />
        <Script
          id="google-analytics-gtag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || []; function gtag()
            {dataLayer.push(arguments)}
            gtag('js', new Date()); gtag('config', 'G-63CEGYKFMN');
  `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

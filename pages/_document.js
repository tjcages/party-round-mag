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
        <meta name="description" content="A limited edition magazine, filled with alpha, editorial, & mini-drops." />
        <meta
          name="keywords"
          content="Party, Round, Mag, Magazine, 2022, Volume, Vol, 001, Party Round Mag, limited, edition, filled, alpha, editorial, mini, drops"
        />
        <meta name="theme-color" content="#c331d5" />
        <meta
          name="msapplication-TileImage"
          content="https://uploads-ssl.webflow.com/63239dddf0aabc3869e7c9c8/6324b10a9053f9f3641865cc_preview.png"
        />
        <meta name="msapplication-TileColor" content="#c331d5" />
        <link rel="shortcut icon" href="/img/common/icon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/common/app_icon.png"
        />
        <meta property="og:title" content="Party Round Mag | A Drop By Party Round" />
        <meta property="og:site_name" content="Party Round Mag" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="A limited edition magazine, filled with alpha, editorial, & mini-drops."
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PartyRound" />
        <meta name="twitter:creator" content="@PartyRound" />
        <meta name="twitter:image" content="https://uploads-ssl.webflow.com/63239dddf0aabc3869e7c9c8/6324b10a9053f9f3641865cc_preview.png" />
        <meta property="og:url" content="https://partyroundmag.com/" />
        <meta property="og:title" content="Party Round Mag | A Drop By Party Round" />
        <meta property="og:description" content="A limited edition magazine, filled with alpha, editorial, & mini-drops." />
        <meta property="og:image" content="https://uploads-ssl.webflow.com/63239dddf0aabc3869e7c9c8/6324b10a9053f9f3641865cc_preview.png" />

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

// pages/_document.jsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <title>TH CARDS Web</title>
        <meta name="description" content="Tu carta estilo FIFA y alineación personalizada" />
        <link rel="icon" href="/icon_th.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
          <meta name="description" content="Saiba as programações do Igreja Batista Lírio dos Vales IBLV. Saiba com ofertar e como entregar seu dízimo de maneira rápida e fácil." />
          <meta name="og:title" property="og:title" content="Acessos IBLV | Uma Igreja em célula" />
          <meta property="og:description" content="Saiba as programações do Igreja Batista Lírio dos Vales IBLV. Saiba com ofertar e como entregar seu dízimo de maneira rápida e fácil." />
          <meta property="og:url" content="https://iblv-links.vercel.app/" />
          <meta property="og:image" content="https://iblv-links.vercel.app/ogseo.png" />
          <meta name="robots" content="index" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
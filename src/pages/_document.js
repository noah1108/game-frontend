import Document, { Html, Head, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="A site for demonstrating use of _document file"
          />
          <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
          <meta name="author" content="GeeksForGeeks" />
          <meta
            name="keywords"
            content="NextJS,GFG,custom document next,custom app next"
          />
          <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
            crossorigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

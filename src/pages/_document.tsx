import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script src="https://vi-vasylyshyn.github.io/tracker/index.js" data-event="specialEvent" async></script>
      </body>
    </Html>
  )
}

export default Document

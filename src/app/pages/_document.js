import React from "react";
import { ServerStyleSheet } from "styled-components";
import Document, { Head, Main, NextScript } from "next/document";

/**
 * Each page will be wrapped with this custom content.
 * Source: https://nextjs.org/docs/custom-document
 */

class CustomDocument extends Document {
  static getInitialProps({ res, renderPage }) {
    const { lang, platform } = res.locals;
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { styleTags, lang, platform, ...page };
  }

  render() {
    const { lang = "eng" } = this.props;

    return (
      <html lang="en" style={{ height: "100%", backgroundColor: "white" }}>
        <Head>
          <link rel="icon" href="https://edge.ldscdn.org/cdn2/common/images/logos/favicon-lds-1.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes" />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.platformConfig = {
              dataConfig: {
                lang: "${lang}"
              },
              searchConfig: {
                searchEndpoint: "/mySearch",
                searchQueryParam: "q"
              },
              footerConfig: {
                removeLegacyScripts: true,
                noMargin: false
              }
            }`
            }}
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default CustomDocument;

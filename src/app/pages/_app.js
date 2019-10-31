import App from "next/app";
import React from "react";
import withReduxStore from "../lib/withReduxStore";
import { Provider } from "react-redux";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "../styles/theme";
import "../styles/bootstrap.min.css";

/**
 * These should go into their own separate file and imported in once. Same story for Other.js Need to come up with a strategy for global styles.
 */
const GlobalStyle = createGlobalStyle`

  a {
    cursor: pointer;
  }

  /* region Open Sans */
  
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i');
  
  /* endregion */
  
  /* region Glyphicons Halfling */
  
  @font-face {
    font-family: 'Glyphicons Halflings';
    font-weight: 300;
    font-style: normal;
    
    /* stylelint-disable indentation */
    src: url('/fonts/glyphicons-halflings-regular.eot');
    src: url('/fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'),
    url('/fonts/glyphicons-halflings-regular.woff') format('woff'),
    url('/fonts/glyphicons-halflings-regular.ttf') format('truetype'),
    url('/fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format('svg');
    /* stylelint-enable indentation */
  }
  
  /* endregion */
`;

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Provider store={reduxStore}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);

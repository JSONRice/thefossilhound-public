import App from "next/app";
import React from "react";
import withReduxStore from "../lib/withReduxStore";
import { Provider } from "react-redux";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "../styles/theme";
import "../styles/bootstrap.min.css";

/**
 * These should go into their own separate file and imported in once. Same story for App.js
 * Need to come up with a strategy for global styles.
 */
// const GlobalStyle = createGlobalStyle`
//   @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i');
// `;

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Provider store={reduxStore}>
        {/*<GlobalStyle>*/}
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
        {/*</GlobalStyle>*/}
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);

import App, { Container } from "next/app";
import React from "react";
import withReduxStore from "../lib/withReduxStore";
import { Provider } from "react-redux";
import { ThemeProvider, injectGlobal } from "styled-components";
import theme from "../styles/theme";
import Spinner from "../components/Spinner/Spinner";
import styled from "styled-components";

/**
 * These should go into their own separate file and imported in once. Same story for Other.js
 * Need to come up with a strategy for global styles.
 */
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i');
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${theme.fontSize(64)};
  padding: 10px;
`;

class MyApp extends App {

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Provider store={reduxStore}>
        <Container>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Container>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);

import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Head from "next/head";

// TODO: this component is deprecated. Delete it when it's been removed from the app. Use Page component instead.

const FullHeight = styled.div`
  /* Accounting for header, nav bar, and footer */
  min-height: calc(100vh - 145px - 42px - 320px);
  display: flex;
  flex-direction: column;
`;

const Layout = ({
  strings = {},
  theme = {},
  title = "The Church of Jesus Christ of Latter-day Saints",
  children
}) => (
  <ThemeProvider theme={theme}>
    <Head>
      <title>{title}</title>
    </Head>
    <FullHeight>{children}</FullHeight>
  </ThemeProvider>
);

export default Layout;

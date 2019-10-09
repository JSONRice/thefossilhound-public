import React from "react";
import Page from "../components/Page/Page";
import { connect } from "react-redux";

/**
 * Because it is in the pages folder, this component will automatically be associated with a route.
 * When the "/" route is visited, the *default* export for this file will be served to the client.
 * Source: https://nextjs.org/docs/#routing
 */

//TODO route user to appropriate default page

const Home = () => {
  return <Page title="Home">TODO route</Page>;
};

export default connect()(Home);

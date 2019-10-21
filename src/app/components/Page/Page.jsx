import React, { Component } from "react";
import { withRouter } from "next/router";
import styled from "styled-components";
import Head from "next/head";
import BreadcrumbService from "../../services/breadcrumb-service";
// import Breadcrumb from "../Breadcrumb/Breadcrumb";
// import ConnectedMenu from "../Menu/ConnectedMenu";
// import ConnectedUnitSelector from "../UnitSelector/ConnectedUnitSelector";

class Page extends Component {
  state = {
    isMobile: false
  };

  handleResize = () => {
    let isMobile = false;
    if (window.outWidth < 768) {
      isMobile = true;
    }

    if (isMobile !== this.state.isMobile) {
      this.setState({isMobile});
    }
  };

  render() {
    let {
      children,
    } = this.props;
  }


}
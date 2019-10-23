import React, { Component } from "react";
import { withRouter } from "next/router";
import styled from "styled-components";
import Head from "next/head";
import BreadcrumbService from "../../services/breadcrumb-service";
// import Breadcrumb from "../Breadcrumb/Breadcrumb";
// import ConnectedMenu from "../Menu/ConnectedMenu";
// import ConnectedUnitSelector from "../UnitSelector/ConnectedUnitSelector";

const mobileBreakpoint = `(max-width: ${({ theme }) => theme.media.mobileMax}px)`;

const PageContainerGrid = styled.div`
  display: grid;
  grid-template-columns: 0.475fr 2fr 0.475fr;
  
  @media (max-width: ${({ theme }) => theme.media.mobileMax}px) {
    grid-template-columns: 1fr;
    padding: 25px;
  }
  
  background-color: #333;
  color: white;
`;

// 3x3 Grid
const Content = styled.div`
  display: grid;
  font-family: ${({theme}) => theme.font.fontFamilySans};
  ${({theme}) => theme.fontSize(12)};
  color: ${({theme}) => theme.color.gray1600};
`;

const Header = styled(Content)``;

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
      title,
    } = this.props;

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <PageContainerGrid>
          <Header>
            {title}
          </Header>
        </PageContainerGrid>
      </>
    )

  }
}

export default withRouter(Page);
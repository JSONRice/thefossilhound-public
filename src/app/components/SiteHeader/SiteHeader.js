import React from "react";
import SiteNav from "../SiteNav/SiteNav";
import logo from "./logo-placeholder.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledSiteHeader = styled.header`
  align-items: center;
  background: var(--blue, #008000);
  color: var(--white, #000);
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
  padding-top: 1em;
`;

const StyledLink = styled(Link)`
  color: var(--white);
  text-decoration: none;
`;

const Img = styled.img`
  fill: var(--white);
  height: 2em;
  margin-right: 0.5em;
  vertical-align: middle;
  width: 2em;
`;

const StyledSiteNav = styled(SiteNav)`
  display: flex;
  justify-content: space-between;
`;

export const SiteHeader = ({ homelink = "/", links = [] }) => (
  <StyledSiteHeader>
    <StyledLink to={homelink}>
      <Img src={logo} alt="Home" />
      <span>React Starter</span>
    </StyledLink>
    <StyledSiteNav links={links} />
  </StyledSiteHeader>
);

export default SiteHeader;

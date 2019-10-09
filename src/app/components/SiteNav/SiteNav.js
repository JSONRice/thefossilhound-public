import React from "react";
import Link from "next/link";
import styled from "styled-components";

const StyledNav = styled.nav`
  .nav {
    display: flex;
    justify-content: space-between;
  }
`;

const StyledLink = styled.span`
  .link {
    color: var(--white);
    display: block;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &:not(:last-child) {
      margin-right: 1em;
    }
  }
`;

const SiteNav = ({ links = [] }) => (
  <StyledNav>
    {links.map(({ href, text }, i) => (
      <StyledLink key={`styled-link-${i}`}>
        <Link key={`link-${i}`} to={href}>
          {text}
        </Link>
      </StyledLink>
    ))}
  </StyledNav>
);

export default SiteNav;

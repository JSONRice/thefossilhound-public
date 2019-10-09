import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { buildUrl } from "../../utils/url";

const StyledLocalLink = styled.span`
  * {
    color: ${props => (props.noColor ? "black" : "#0091bc")};
    text-decoration: none;
  }

  a:hover {
    color: ${props => (props.noColor ? "black" : "#3F5469")};
    // text-decoration: ${props => (props.noDecoration ? "none" : "underline")};
  }

  &:not(:last-child) {
    margin-right: 1em;
  }
`;

/**
 * Higher Order Component (wrapper) that returns a link component if the hasAccess is true else just
 * the href text is rendered as plain text.
 *
 * Can also add a prefetch property to Link if need be.
 */
export const LocalLink = ({
  children,
  href,
  hasAccess = true,
  hooks,
  newTab = false,
  onClick,
  noColor = false,
  noDecoration = false
}) => {
  if (hasAccess) {
    let target = newTab ? "_blank" : "_self";

    return (
      <StyledLocalLink noColor={noColor} noDecoration={noDecoration}>
        <Link href={buildUrl(href, hooks)}>
          {onClick ? (
            <a onClick={() => onClick()} target={target}>
              {children}
            </a>
          ) : (
            <a>{children}</a>
          )}
        </Link>
      </StyledLocalLink>
    );
  } else {
    return <span>{children}</span>;
  }
};

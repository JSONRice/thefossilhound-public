import React from "react";
import Link from "next/link";
import { buildUrl } from "../../utils/url";
import { StyledAppLink } from "./StyledAppLink";

/**
 * LCRF Link is just a Higher Order Component (wrapper) that returns a link component if the hasAccess is true else just
 * the href text is rendered as plain text.
 *
 * Can also add a prefetch property to Link if need be.
 *
 * TODO: Refactor this component since the anchor tag onClick and the href bound to the NextJS Link will compete if both are added (race condition) nor would it ever make sense to have a populated href and onClick since the onClick is a callback. There's already an OldAppLink so this is somewhat of a special case. ProxySupport employs AppLink's onClick but passes in an empty href so there's some considerations there. Come to a consensus to avoid confusing code.
 */
export const AppLink = ({ children, href, hooks, newTab = false, onClick, noColor = false, noDecoration = false }) => {
  let target = newTab ? "_blank" : "_self";

  return (
    <StyledAppLink noColor={noColor} noDecoration={noDecoration}>
      <Link href={buildUrl(href, hooks)}>
        {onClick ? (
          <a onClick={() => onClick()} target={target}>
            {children}
          </a>
        ) : (
          <a>{children}</a>
        )}
      </Link>
    </StyledAppLink>
  );
};

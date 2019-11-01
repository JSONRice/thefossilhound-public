import * as React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import style from "styled-components";

const Pointer = style.a`
  cursor: pointer !important;
`;

/**
 * LinkWithTooltip Stateless Functional Component (SFC)
 *
 * Properties:
 *
 * id: the element string of the tooltip
 * children: the JSX HTML markup
 * href:
 *
 * @param id
 * @param tooltip
 * @param placement
 * @param href
 * @param children
 * @returns {any}
 * @constructor
 */
export const LinkWithTooltip = ({ id, tooltip, placement, href, children }) => {
  return (
    <OverlayTrigger
      overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
      placement={placement}
      delayShow={300}
      delayHide={150}
    >
      <Pointer href={href}>{children}</Pointer>
    </OverlayTrigger>
  );
};

import * as React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

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
const LinkWithTooltip = ({id, tooltip, placement, href, children}) => {

  return (
    <OverlayTrigger
      overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
      placement={placement} delayShow={300} delayHide={150}>
      <a href={href} style={{cursor: 'auto'}}>{children}</a>
    </OverlayTrigger>
  );
};

export default LinkWithTooltip;

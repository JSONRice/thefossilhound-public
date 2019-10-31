import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Header, HeaderCell } from "./";
import { Cell } from "./Cell";
import { Icon } from "../Icon";
import { column } from "../../utils/prop-types";

const ExpandAllCell = styled(Cell)`
  cursor: pointer;
`;

export const Headers = ({ columnConfiguration, expandAll, toggleExpandAll, viewType }) => {
  let expandAllWidth = "2.5%";
  if (viewType === "tablet") {
    expandAllWidth = "10%";
  }
  if (viewType === "mobile") {
    expandAllWidth = "7%";
  }
  return (
    <Header>
      {toggleExpandAll && (
        <ExpandAllCell onClick={toggleExpandAll} width={expandAllWidth}>
          <Icon name="triangleRight" expand={expandAll} />
        </ExpandAllCell>
      )}
      {columnConfiguration.map(column => (
        <HeaderCell key={column.key} width={column.width ? column.width : `${100 / columnConfiguration.length}%`}>
          {typeof column.header === "function" ? column.header() : column.header}
        </HeaderCell>
      ))}
    </Header>
  );
};

Headers.propTypes = {
  columnConfiguration: PropTypes.arrayOf(PropTypes.shape(column)).isRequired,
  expandAll: PropTypes.bool,
  toggleExpandAll: PropTypes.func,
  viewType: PropTypes.string.isRequired
};

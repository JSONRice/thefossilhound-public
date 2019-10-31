import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Cell } from "./";
import { Amount } from "../Amount";
import { Icon } from "../Icon";
import { Percent } from "../Percent";
import { AppLink } from "../AppLink";
import { hasAccess } from "../../services/security-service";
import { column } from "../../utils/prop-types";
import { roundPercentSpent } from "../../utils/formatters";

const Row = styled.div`
  display: flex;
  padding: 10px;

  > :nth-child(n + 3) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const calcBalance = row => {
  return (
    row.budgetAssignedAmount + row.previousActivityAmount + row.incomeAmount + row.expenseAmount + row.transferAmount
  );
};

const calcPercentSpent = row => {
  return row.budgetAssignedAmount === 0
    ? "-"
    : roundPercentSpent(((row.budgetAssignedAmount - calcBalance(row)) / row.budgetAssignedAmount) * 100);
};

const getBaseLink = link => {
  let parts = link.split("/");
  return parts[parts.length - 1];
};

export const getCellData = (data, column, row, options) => {
  if (column.type) {
    switch (column.type) {
      case "currency":
        // run calculations
        if (column.key === "balance") {
          data = calcBalance(row);
        }
        return <Amount amount={data} currencyCode={options && options.currencyCode ? options.currencyCode : "USD"} />;
      case "link":
        if (data && column.link && column.link.href && column.link.filterKey) {
          // Add url params here
          const hooks = {};
          return (
            <AppLink href={data} hooks={hooks}>
              {getBaseLink(data)}
            </AppLink>
          );
        }
        return data;
      case "percent":
        // run percent calculations and formatting
        if (column.key === "percentSpent") {
          data = calcPercentSpent(row);
        }
        return <Percent percent={data} balance={row.balance} />;
      default:
        return data;
    }
  }
  return data;
};

export const NewRow = ({ row, columnConfiguration, currencyCode, expandedState, expand, line, viewType }) => {
  let rowSpacingColumnWidth = "2.5%";
  if (viewType === "tablet") {
    rowSpacingColumnWidth = "10%";
  }
  if (viewType === "mobile") {
    rowSpacingColumnWidth = "7%";
  }
  return (
    <Row>
      <Cell width={rowSpacingColumnWidth} onClick={expand}>
        {expandedState !== undefined && expand && <Icon name="triangleRight" expand={expandedState} />}
      </Cell>
      {columnConfiguration.map((column, index) => (
        <Cell
          key={`row_${(line || line === undefined) && column.lineKey ? column.lineKey : column.key}_${index}`}
          width={column.width ? column.width : `${100 / columnConfiguration.length}%`}
        >
          {getCellData(row[column.lineKey && row[column.lineKey] ? column.lineKey : column.key], column, row, {
            currencyCode: currencyCode
          })}
        </Cell>
      ))}
    </Row>
  );
};

NewRow.defaultProps = {
  line: false
};

NewRow.propTypes = {
  columnConfiguration: PropTypes.arrayOf(PropTypes.shape(column)),
  currencyCode: PropTypes.string,
  expandedState: PropTypes.bool,
  expand: PropTypes.func,
  line: PropTypes.bool,
  row: PropTypes.object.isRequired,
  viewType: PropTypes.string.isRequired
};

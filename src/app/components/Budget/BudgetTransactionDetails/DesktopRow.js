import { Component, Fragment } from "react";
import styled from "styled-components";
import { Cell } from "../../../components/Table";
import ConnectedOldLocalLink from "../../../components/OldLocalLink/ConnectedOldLocalLink";
import Amount from "../../../components/Amount/Amount";
import theme from "../../../styles/theme";
import React from "react";
import { getBudgetTransactionLink } from "./";
import { financialTransactionTypes } from "../../../utils/constants";
import { formatDate } from "../../../utils/formatters";

let Row = styled.div`
  ${theme.font.fontFamilySans};
  ${theme.fontSize(12)};
  line-height: 20px;
  display: flex;
  padding: 10px 0;
  :nth-child(odd) {
    background-color: ${theme.containers.rowOdd};
  }
`;

export class DesktopRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { row, index, currencyCode } = this.props;
    let { hasAccess, url, hook } = getBudgetTransactionLink(row);
    let isAdjustment =
      row.transactionTypeId === financialTransactionTypes.DONATION_ADJUSTMENT ||
      row.transactionTypeId === financialTransactionTypes.DISBURSEMENT_ADJUSTMENT;
    return (
      <Fragment key={`budget-transaction-detail-desktop-row-${index}`}>
        <Row id={index}>
          <Cell indent="20px">{formatDate(row.postedDate)}</Cell>
          <Cell>
            <ConnectedOldLocalLink hasAccess={hasAccess} href={url} hook={hook} newTab={true}>
              {row.reference}
            </ConnectedOldLocalLink>
          </Cell>
          <Cell>{row.unitSubcategoryName ? row.unitSubcategoryName : row.subcategoryName}</Cell>
          <Cell width="23.4%">
            {isAdjustment ? `adjustment: ${row.description}` : row.description}
          </Cell>
          <Cell>{row.classificationType}</Cell>
          <Cell width="10%">
            <Amount amount={row.amount} showCurrencySymbol={true} currencyCode={currencyCode} />
          </Cell>
        </Row>
      </Fragment>
    );
  }
}

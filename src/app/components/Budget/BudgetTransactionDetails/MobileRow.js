import { Component } from "react";
import styled from "styled-components";
import { Cell } from "../../../components/Table";
import ConnectedOldLocalLink from "../../../components/OldLocalLink/ConnectedOldLocalLink";
import Amount from "../../../components/Amount/Amount";
import React from "react";
import { getBudgetTransactionLink } from "./";
import { financialTransactionTypes } from "../../../utils/constants";
import { formatDate } from "../../../utils/formatters";

// A card is just a super row (collection of rows)
let Card = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.font.fontFamilySans};
  ${({ theme }) => theme.fontSize(12)};
  line-height: 20px;
  :nth-child(even) {
    background-color: ${({ theme }) => theme.containers.responsiveRowEven};
  }
`;

// A row is encapsulated within a card
let Row = styled.div`
  display: flex;
  padding: 10px;
`;

let DateRow = styled(Row)``;

let TupleRow = styled(Row)`
  justify-content: space-evenly;
  padding: 0 10px;
`;

let RefTupleRow = styled(TupleRow)`
  padding-top: 10px;
`;

let AmountTupleRow = styled(TupleRow)`
  justify-content: space-between;
  padding: 10px;
`;

let TypeTupleRow = styled(TupleRow)`
  padding-bottom: 10px;
`;

let Header = styled.span`
  font-weight: bold;
  text-transform: uppercase;
`;

let Line = styled.div`
  margin: 0 10px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray1500};
`;

export class MobileRow extends Component {
  render() {
    let { row, index } = this.props;
    let { hasAccess, url, hook } = getBudgetTransactionLink(row);
    let isAdjustment =
      row.transactionTypeId === financialTransactionTypes.DONATION_ADJUSTMENT ||
      row.transactionTypeId === financialTransactionTypes.DISBURSEMENT_ADJUSTMENT;
    return (
      <Card key={`budget-transaction-detail-mobile-row-${index}`}>
        <DateRow>
          <Cell>{formatDate(row.postedDate)}</Cell>
        </DateRow>
        <Line />
        <RefTupleRow>
          <Cell>
            <Header>Ref #</Header>
          </Cell>
          <Cell>
            <ConnectedOldLocalLink hasAccess={hasAccess} href={url} hook={hook} newTab={true}>
              {row.reference}
            </ConnectedOldLocalLink>
          </Cell>
        </RefTupleRow>
        <TupleRow>
          <Cell>
            <Header>Category</Header>
          </Cell>
          <Cell>{row.unitSubcategoryName ? row.unitSubcategoryName : row.subcategoryName}</Cell>
        </TupleRow>
        <TypeTupleRow>
          <Cell>
            <Header>Type</Header>
          </Cell>
          <Cell>{row.classificationType}</Cell>
        </TypeTupleRow>
        <Line />
        <AmountTupleRow>
          <Cell>{isAdjustment ? `adjustment: ${row.description}` : row.description}</Cell>
          <Cell justifyContent="flex-end">
            <Amount amount={row.amount} showCurrencySymbol={true} currencyCode={row.currencyCode} />
          </Cell>
        </AmountTupleRow>
      </Card>
    );
  }
}

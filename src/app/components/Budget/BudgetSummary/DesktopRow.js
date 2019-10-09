import { Cell } from "../../Table";
import { Icon } from "../../Icon";
import { LocalLink } from "../../LocalLink";
import { Component } from "react";
import Amount from "../../Amount/Amount";
import React from "react";
import { Percent } from "../../../components/Percent/Percent";
import { Row } from "./";
import { hasAccess } from "../../../services/security-service";

export class DesktopRow extends Component {
  render() {
    let {
      balance,
      currencyCode,
      expand,
      expandCallback,
      index,
      isLine = false,
      parentIndex,
      categoryIndent,
      row,
      transactionDetailsUrlHref,
      transactionDetailsUrlHooks,
      showPreviousActivityColumn
    } = this.props;

    let normalColumnPercentage = showPreviousActivityColumn ? "12.5%" : "14.5%";

    return (
      <Row isLine={isLine} parentIndex={isLine ? parentIndex : undefined} id={index}>
        {/*/!*Expand row icon cell:*!/*/}
        <Cell width="2.5%" onClick={() => expandCallback(expand, row)}>
          {row.lines && row.lines.length > 0 && <Icon name="triangleRight" expand={row.expand} />}
        </Cell>
        <Cell width={normalColumnPercentage} indent={categoryIndent}>
          <LocalLink
            href={transactionDetailsUrlHref}
            hooks={transactionDetailsUrlHooks}
            hasAccess={hasAccess("BUDGET_DETAIL")}
          >
            {row.unitSubcategoryName ? row.unitSubcategoryName : row.subcategoryName}
          </LocalLink>
        </Cell>
        <Cell width={normalColumnPercentage} justifyContent="flex-end">
          <Amount amount={row.budgetAssignedAmount} showCurrencySymbol={true} currencyCode={currencyCode} />
        </Cell>
        {showPreviousActivityColumn && (
          <Cell width="12.5%" justifyContent="flex-end">
            <Amount amount={row.previousActivityAmount} showCurrencySymbol={true} currencyCode={currencyCode} />
          </Cell>
        )}
        <Cell width={normalColumnPercentage} justifyContent="flex-end">
          <Amount amount={row.incomeAmount} showCurrencySymbol={true} currencyCode={currencyCode} />
        </Cell>
        <Cell width={normalColumnPercentage} justifyContent="flex-end">
          <Amount amount={row.expenseAmount} showCurrencySymbol={true} currencyCode={currencyCode} />
        </Cell>
        <Cell width={normalColumnPercentage} justifyContent="flex-end">
          <Amount amount={row.transferAmount} showCurrencySymbol={true} currencyCode={currencyCode} />
        </Cell>
        <Cell width={normalColumnPercentage} justifyContent="flex-end">
          {/*Any of the other amounts besides budget assigned might be negative (or zero) so just add that to the total balance sum*/}
          <Amount amount={balance} showCurrencySymbol={true} currencyCode={currencyCode} />
        </Cell>
        {/*Spent: */}
        <Cell width="10%" justifyContent="flex-end">
          <Percent percent={row.percentSpent} balance={balance} />
        </Cell>
      </Row>
    );
  }
}

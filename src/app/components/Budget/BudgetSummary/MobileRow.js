import { Cell } from "../../Table";
import { Icon } from "../../Icon";
import { LocalLink } from "../../../components/LocalLink/LocalLink";
import { Component } from "react";
import styled from "styled-components";
import Amount from "../../../components/Amount/Amount";
import React from "react";
import { Row } from "./";
import { hasAccess } from "../../../services/security-service";

export class MobileRow extends Component {
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
      transactionDetailsUrlHooks
    } = this.props;
    return (
      <Row isLine={isLine} parentIndex={isLine ? parentIndex : undefined} id={index}>
        {/*Expand row icon cell:*/}
        <Cell width="7%" onClick={() => expandCallback(expand, row)}>
          {row.lines && row.lines.length > 0 && <Icon name="triangleRight" expand={row.expand} />}
        </Cell>
        <Cell width="66.5%" indent={categoryIndent}>
          <LocalLink
            href={transactionDetailsUrlHref}
            hooks={transactionDetailsUrlHooks}
            hasAccess={hasAccess("BUDGET_DETAIL")}
          >
            {row.unitSubcategoryName ? row.unitSubcategoryName : row.subcategoryName}
          </LocalLink>
        </Cell>
        <Cell justifyContent="flex-end" width="26.5%">
          {/*Any of the other amounts besides budget assigned might be negative (or zero) so just add that to the total balance sum*/}
          <Amount amount={balance} showCurrencySymbol={true} currencyCode={currencyCode} />
        </Cell>
      </Row>
    );
  }
}

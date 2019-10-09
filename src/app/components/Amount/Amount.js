import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { formatCurrencyWithSymbol } from "../../utils/formatters";

const StyledAmount = styled.div`
  font-family: ${theme.font.fontFamilySans};
  ${props => theme.fontSize(props.fontSize)};
  display: flex;
  padding-left: ${props => (props.paddingLeft ? props.paddingLeft : 0)};
  color: ${props => (props.amount < 0 ? theme.color.red1100 : "inherit")};
`;

const Amount = props => {
  const { amount = 0, showCurrencySymbol = false, fontSize = 12, paddingLeft, currencyCode } = props;
  let formattedAmount = formatCurrencyWithSymbol(amount < 0 ? amount * -1 : amount, currencyCode);
  return (
    <StyledAmount amount={amount} showCurrencySymbol={showCurrencySymbol} fontSize={fontSize} paddingLeft={paddingLeft}>
      {amount < 0 ? `(${formattedAmount})` : formattedAmount}
    </StyledAmount>
  );
};

export default Amount;

import { storiesOf } from "@storybook/react";
import React from "react";
import Amount from "../Amount";
import styled from "styled-components";

let balance = 10000;
let over = -4000;

const Div = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  padding: 15px;
`;

storiesOf("Amount", module)
  .add("USD Positive Amount", () => (
    <Div>
      <span>USD Positive Amount: </span>&nbsp;
      <Amount amount={balance} showCurrencySymbol={true} fontSize={16} />
    </Div>
  ))
  .add("USD Negative Amount", () => (
    <Div>
      <span>USD Negative Amount: </span>&nbsp;
      <Amount amount={over} showCurrencySymbol={true} fontSize={16} />
    </Div>
  ));

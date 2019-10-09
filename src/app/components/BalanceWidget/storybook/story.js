import { storiesOf } from "@storybook/react";
import React from "react";
import BalanceWidget from "../BalanceWidget";

let balance = 10000;
let assignedBudget = 40000;
let currencyCode = "USD";
let over = -4000;
let reallyOver = -400000;

storiesOf("BalanceWidget", module)
  .add("Under Budget", () => (
    <BalanceWidget
      date={new Date()}
      balance={balance}
      assignedBudget={assignedBudget}
      currencyCode={currencyCode}
    />
  ))
  .add("Over Budget", () => (
    <BalanceWidget
      date={new Date()}
      balance={over}
      assignedBudget={assignedBudget}
      currencyCode={currencyCode}
    />
  ))
  .add("Really Over Budget", () => (
    <BalanceWidget
      date={new Date()}
      balance={reallyOver}
      assignedBudget={assignedBudget}
      currencyCode={currencyCode}
    />
  ))
  .add("No Budget", () => (
    <BalanceWidget
      date={new Date()}
      balance={0}
      assignedBudget={0}
      currencyCode={currencyCode}
    />
  ))
  .add("No Budget and spent money", () => (
    <BalanceWidget
      date={new Date()}
      balance={over}
      assignedBudget={0}
      currencyCode={currencyCode}
    />
  ));

import { storiesOf } from "@storybook/react";
import React from "react";
import { DesktopHeader } from "./";
import { DesktopRow } from "./DesktopRow";
import navData from "../../../data/navData";
import { security } from "../../UnitSelector/UnitSelector.story";
import { Provider } from "react-redux";

let row = {
  internalAccountId: 11224,
  transactionId: 1,
  postedDate: "2019-03-12T18:04:48.005Z",
  reference: "8721",
  transactionTypeId: 204,
  classificationType: "INCOME",
  categoryName: "Budget",
  categoryId: 3,
  subcategoryName: "Young Men",
  subcategoryId: 43,
  subcategorySortOrder: 1,
  unitSubcategoryId: 122244,
  unitSubcategoryName: "Deacons",
  description: "Donation Batch",
  amount: 2.33,
  currencyCode: "USD"
};

const store = {
  dispatch: () => {},
  getState: () => {
    return {
      menu: {
        items: navData
      },
      security: security
    };
  },
  subscribe: () => {}
};

storiesOf("BudgetTransactionDetails", module)
  .add("DesktopHeader", () => <DesktopHeader />)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add("DesktopRow", () => <DesktopRow row={row} index={1} />);

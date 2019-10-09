import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import Item from "./Item";
import React from "react";

storiesOf("Menu Item", module)
  .add("default", () => (
    <Item label="Overview" onClick={action("LCR Item clicked")} />
  ))
  .add("empty label", () => (
    <Item label="" onClick={action("ResponsiveMenu Item clicked")} />
  ))
  .add("no label", () => (
    <Item onClick={action("ResponsiveMenu Item clicked")} />
  ))
  .add("no behavior", () => <Item label="Donations" />)
  .add("active", () => (
    <Item label="Expenses" active onClick={action("LCR Item clicked")} />
  ));

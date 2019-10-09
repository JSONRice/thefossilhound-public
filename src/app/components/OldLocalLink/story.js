import { storiesOf } from "@storybook/react";
import OldLocalLink from "./OldLocalLink";
import React from "react";

let href = "/#/dashboard";

let children = "Link Text";

let hook = {
  orgId: 30877,
  internalAccountId: 40631,
  name: "Fransico"
};

storiesOf("OldLocalLink", module)
  .add("Default", () => (
    <OldLocalLink hasAccess={true} href={href} children={children} />
  ))
  .add("With Hook", () => (
    <OldLocalLink hasAccess={true} href={href} children={children} hook={hook} />
  ))
  .add("No Access", () => (
    <OldLocalLink
      hasAccess={false}
      href={href}
      children={children}
      hook={hook}
    />
  ));

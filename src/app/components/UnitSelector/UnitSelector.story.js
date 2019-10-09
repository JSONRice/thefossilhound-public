import { storiesOf } from "@storybook/react";
import UnitSelector from "./UnitSelector";
import React from "react";
import { action } from "@storybook/addon-actions";

export const security = {
  unit: {
    orgName: "Lehi Utah YSA Stake",
    unitNumber: 1575988
  },
  accessibleUnits: [
    {
      orgName: "Lehi Utah YSA Stake",
      unitNumber: 1575988
    },
    {
      orgName: "Lehi YSA 3rd Ward",
      unitNumber: 413089,
      parentOrgName: "Lehi Utah YSA Stake",
      parentUnitNumber: 1575988
    },
    {
      orgName: "Lehi YSA 4th Ward",
      unitNumber: 472050,
      parentOrgName: "Lehi Utah YSA Stake",
      parentUnitNumber: 1575988
    }
  ]
};

storiesOf("UnitSelector", module).add("default", () => (
  <UnitSelector
    unit={security.unit}
    accessibleUnits={security.accessibleUnits}
    onClick={action}
  />
));

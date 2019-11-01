import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";
import { storiesOf, setAddon } from "@storybook/react";
import JSXAddon from "storybook-addon-jsx";
import { Modal } from "./Modal";

setAddon(JSXAddon);

const children = `
Manifesto for Agile Software Development

We are uncovering better ways of developing
software by doing it and helping others do it.
Through this work we have come to value:

Individuals and interactions over processes and tools
Working software over comprehensive documentation
Customer collaboration over contract negotiation
Responding to change over following a plan

That is, while there is value in the items on
the right, we value the items on the left more.
`;

storiesOf("Modals", module)
  .addDecorator(withKnobs)
  .addWithJSX("Modal", () => (
    <Modal heading={text("heading", "Modal Title")} onClose={action("onClose")}>
      {text("children", children)}
    </Modal>
  ));

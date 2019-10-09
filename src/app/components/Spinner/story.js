import React from "react";
import { withKnobs, select, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import styled from "styled-components";

import Spinner from "./Spinner";
import BetterSpinner from "./BetterSpinner";

const LOREM_IPSUM_HISTORY = `
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
`;

const LoremIpsum = styled.div`
  padding: 10px;
`;

storiesOf("Spinner", module)
  .addDecorator(withKnobs)
  .add("Spinner", () => (
    <div>
      <LoremIpsum>{LOREM_IPSUM_HISTORY}</LoremIpsum>
      <div style={{ fontSize: text("Outer dive font-size", "4rem") }}>
        <Spinner
          size={select(
            "size",
            ["font-size", "large"],
            Spinner.defaultProps.size
          )}
        />
      </div>
      <LoremIpsum>{LOREM_IPSUM_HISTORY}</LoremIpsum>
    </div>
  ))
  .add("Spinner delayed 3 seconds", () => (
    <div>
      <LoremIpsum>{LOREM_IPSUM_HISTORY}</LoremIpsum>
      <div style={{ fontSize: text("Outer dive font-size", "4rem") }}>
        <Spinner
          delay={3000}
          size={select(
            "size",
            ["font-size", "large"],
            Spinner.defaultProps.size
          )}
        />
      </div>
      <LoremIpsum>{LOREM_IPSUM_HISTORY}</LoremIpsum>
    </div>
  ))
  .add("Better spinner", () => (
    <div>
      <LoremIpsum>{LOREM_IPSUM_HISTORY}</LoremIpsum>
      <div style={{ fontSize: text("Outer dive font-size", "4rem") }}>
        <BetterSpinner
          size={select(
            "size",
            ["font-size", "large"],
            Spinner.defaultProps.size
          )}
        />
      </div>
      <LoremIpsum>{LOREM_IPSUM_HISTORY}</LoremIpsum>
    </div>
  ));

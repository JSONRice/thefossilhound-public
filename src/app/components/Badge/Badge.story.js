import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import React from "react";
import styled from "styled-components";
import { Badge } from "./";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

storiesOf("Badge", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <>
      <Container>
        <div>
          <p>
            Here's a badge (with defaults): <Badge>10</Badge>
          </p>
          <p>
            Here's another badge:{" "}
            <Badge backgroundColor="red700" color="white100">
              20
            </Badge>
          </p>
        </div>
      </Container>
    </>
  ));

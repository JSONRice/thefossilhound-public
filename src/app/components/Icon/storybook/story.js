import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";

const StoryContainer = styled.div`
  display: inline-flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  padding: 15px;
`;

const GroupedWithIcon = styled.div`
  display: flex;
`;

let toggle = false;

storiesOf("Icons", module).add("Icon example", () => {
  return (
    <StoryContainer>
      For a complete listing of icons see the theme storybook.
      <Icon
        name="triangleRight"
        toggleChildren={toggle}
        expand={toggle}
        onClick={() => {
          alert("activate toggle");
          toggle = !toggle;
        }}
      >
        Here is a right triangle with toggle-able content.
      </Icon>
      <Icon name="triangleBottom" color="red">
        Here is a bottom red triangle
      </Icon>
      <GroupedWithIcon>
        <Icon name="triangleRight" />
        <div>
          This right arrow (chevron) fits nicely next to this text but is in
          its own element.
        </div>
      </GroupedWithIcon>
    </StoryContainer>
  );
});

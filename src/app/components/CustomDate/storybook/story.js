import { storiesOf } from "@storybook/react";
import React from "react";
import CustomDate from "../CustomDate";
import styled from "styled-components";

const StoryContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const apply = () => {
  alert("You clicked on Apply in the storybook.");
};

storiesOf("Custom Date", module).add("Custom Date", () => (
  <StoryContainer>
    <CustomDate onClick={apply} />
  </StoryContainer>
));

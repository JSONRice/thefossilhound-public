import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import Banner from "../Banner";

const StoryContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  padding: 15px;
`;

storiesOf("Banner", module)
  .add("Info Banner", () => (
    <StoryContainer>
      <Banner type="info" title="No Data Available">
        No Dashboard Data
      </Banner>
    </StoryContainer>
  ))
  .add("Success Banner", () => (
    <StoryContainer>
      <Banner type="success" title="Great Success">
        Mission was a success. That's a wrap folks.
      </Banner>
    </StoryContainer>
  ))
  .add("Warning Banner", () => (
    <StoryContainer>
      <Banner type="warning" title="Warning Effective">
        Looks like you've been warned. Proceed with caution.
      </Banner>
    </StoryContainer>
  ))
  .add("Error Banner", () => (
    <StoryContainer>
      <Banner type="error" title="Error!">
        Something went drastically wrong! Please notify the developers!
      </Banner>
    </StoryContainer>
  ));

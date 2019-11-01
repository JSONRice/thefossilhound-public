import { storiesOf } from "@storybook/react";
import React from "react";
import { CloseButton, PrimaryButton, SecondaryButton } from "../";
import styled from "styled-components";

const StoryContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  * {
    margin: 7px;
  }
`;

storiesOf("Buttons", module)
  .add("Primary Buttons", () => (
    <StoryContainer>
      <PrimaryButton onClick={() => alert("Default Primary Button clicked")}>Default Primary Button</PrimaryButton>
      <PrimaryButton autoFocus={true} onClick={() => alert("Default Primary Button focus clicked")}>
        Default Primary Button focused
      </PrimaryButton>
      <PrimaryButton disabled onClick={() => alert("Default Disabled Primary Button clicked")}>
        Disabled Primary Button disabled
      </PrimaryButton>
    </StoryContainer>
  ))
  .add("Secondary Buttons", () => (
    <StoryContainer>
      <SecondaryButton onClick={() => alert("Default Secondary Button clicked")}>
        Default Secondary Button
      </SecondaryButton>
      <SecondaryButton autoFocus={true} onClick={() => alert("Default Secondary Button focus clicked")}>
        Default Secondary Button focused
      </SecondaryButton>
      <SecondaryButton disabled onClick={() => alert("Default Secondary Button clicked")}>
        Disabled Secondary Button disabled
      </SecondaryButton>
    </StoryContainer>
  ))
  .add("Close Button", () => (
    <StoryContainer>
      <h6>Look up at the top right</h6>
      <CloseButton onClick={() => alert("Close me")} />
    </StoryContainer>
  ));

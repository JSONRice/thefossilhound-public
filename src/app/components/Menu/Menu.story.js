import { storiesOf, addParameters } from "@storybook/react";
import { Menu } from "./Menu";
import React from "react";
import { oneItem, allItems } from "./test-data/menu-translated.js";
import { action } from "@storybook/addon-actions";
import { ResponsiveMenu } from "./ResponsiveMenu";
import test from "./test-data/menu-translated-all";
import styled from "styled-components";

const StoryContainer = styled.div`
  margin-top: 30px;
  padding: 15px;
`;

addParameters({ viewpoort: { defaultViewport: "iphone6" } });

storiesOf("Menu", module)
  .add("default", () => <Menu />)

  .add("simple", () => <Menu menuData={oneItem} onClick={action} />)

  .add("full", () => (
    <div>
      <Menu menuData={allItems} onClick={action} activeItem="Donations" />
      <h1>Other content Other content Other content</h1>
    </div>
  ))
  .add(
    "ResponsiveMenu on an iPhone",
    () => (
      <StoryContainer>
        This is a responsive (mobile and tablet) based menu
        <ResponsiveMenu items={test} />
      </StoryContainer>
    ),
    { viewport: { defaultViewport: "iphonex" } }
  );

import React from "react";
import { storiesOf } from "@storybook/react";
import FirstStoryPage from "./FirstStoryPage";
import SecondStoryPage from "./SecondStoryPage";
import ThirdStoryPage from "./ThirdStoryPage";
import FourthStoryPage from "./FourthStoryPage";

storiesOf("Table", module)
  .add("Default", () => (
    <FirstStoryPage />
  ))
  .add("Multi-level Filtering", () => (
    <SecondStoryPage />
  ))
  .add("Default sorting with custom data types (date)", () => (
    <ThirdStoryPage />
  ))
  .addParameters({ viewport: { defaultViewport: 'iphone6' }})
  .add(
    "Mobile responsiveness (iPhone 6 Plus)",
    () => (
      <FourthStoryPage />
    ),
    { viewport: "iphone6p" }
  );

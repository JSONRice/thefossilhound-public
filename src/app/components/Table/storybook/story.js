import React from "react";
import { storiesOf } from "@storybook/react";
import FirstStoryPage from "./FirstStoryPage";
import SecondStoryPage from "./SecondStoryPage";
import ThirdStoryPage from "./ThirdStoryPage";
import FossilsStoryPage from "./FossilsStoryPage";

storiesOf("Table", module)
  .add("Default", () => <FirstStoryPage />)
  .add("Multi-level Filtering", () => <SecondStoryPage />)
  .add("Default sorting with custom data types (date)", () => <ThirdStoryPage />)
  .add("Fossils Table", () => <FossilsStoryPage />);

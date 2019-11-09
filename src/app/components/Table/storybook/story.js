import React from "react";
import { storiesOf } from "@storybook/react";
import FirstStoryPage from "./FirstStoryPage";
import SecondStoryPage from "./SecondStoryPage";
import ThirdStoryPage from "./ThirdStoryPage";
import FossilsStoryPage from "./FossilsStoryPage";
import theme from "../../../styles/theme";

storiesOf("Table", module)
  .addParameters({ options: { theme } })
  .add("Default", () => <FirstStoryPage />)
  .add("Fossils Table", () => <FossilsStoryPage />)
  .add("Multi-level Filtering", () => <SecondStoryPage />)
  .add("Default sorting with custom data types (date)", () => <ThirdStoryPage />);


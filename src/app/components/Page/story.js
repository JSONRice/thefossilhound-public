import React from "react";
import { Provider } from "react-redux";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import { Page } from "./index";
import navData from "../../data/navData";
import { security } from "../UnitSelector/UnitSelector.story";

const StyledImage = styled.img`
  width: 100%;
`;

const LOREM_IPSUM_HISTORY = `
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
`;

const TextColumn = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
`;

// This must be included to get the Page to work without the Redux connected store
const store = {
  getState: () => {
    return {
      menu: {
        items: navData
      },
      security: security
    };
  },
  subscribe: () => {}
};

storiesOf("Page", module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add("Default", () => (
    <Page title="Page with Menu (default)">
      {/**
       * Static files can be put in the "src/app/static" folder, then referenced with "/static/myfile".
       * Source: https://nextjs.org/docs/#static-file-serving-eg-images
       */}
      <StyledImage src="/static/temple1.jpg" alt="placeholder" />
      <StyledImage src="/static/temple2.jpg" alt="placeholder" />
      <StyledImage src="/static/temple3.jpg" alt="placeholder" />
      <TextColumn>
        <p>{`${LOREM_IPSUM_HISTORY}`}</p>
      </TextColumn>
    </Page>
  ))
  .add("Page without ResponsiveMenu", () => (
    <Page title="Page without Menu" includeMenu={false}>
      {/**
       * Static files can be put in the "src/app/static" folder, then referenced with "/static/myfile".
       * Source: https://nextjs.org/docs/#static-file-serving-eg-images
       */}
      <StyledImage src="/static/temple1.jpg" alt="placeholder" />
      <StyledImage src="/static/temple2.jpg" alt="placeholder" />
      <StyledImage src="/static/temple3.jpg" alt="placeholder" />
      <TextColumn>
        <p>{`${LOREM_IPSUM_HISTORY}`}</p>
      </TextColumn>
    </Page>
  ))
  .add("Page with Breadcrumbs", () => {
    return (
      <Page
        title="Page with Breadcrumbs"
        breadcrumbItems={[{ title: "Sushi", url: "/sushi" }, { title: "Nigiri", url: "/nigiri" }]}
      >
        {/**
         * Static files can be put in the "src/app/static" folder, then referenced with "/static/myfile".
         * Source: https://nextjs.org/docs/#static-file-serving-eg-images
         */}
        <StyledImage src="/static/temple1.jpg" alt="placeholder" />
        <StyledImage src="/static/temple2.jpg" alt="placeholder" />
        <StyledImage src="/static/temple3.jpg" alt="placeholder" />
        <TextColumn>
          <p>{`${LOREM_IPSUM_HISTORY}`}</p>
        </TextColumn>
      </Page>
    );
  });
// TODO: fix this since storybook was just updated
// .addParameters({ viewport: { defaultViewport: "iphone6" } })
// .add("Page on phone", () => {
//   return;
// });

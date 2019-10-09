import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import { LocalLink } from "./LocalLink";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: auto auto auto;

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const Content = styled.div`
  ${({ theme }) => theme.fontSize(14)};
  line-height: 20px;
  grid-column-start: 3;
  grid-column-end: 7;
  background-color: white;
  padding: 20px 40px 20px 40px;
  margin-top: 60px;

  @media (max-width: 768px) {
    grid-column-start: 1;
    grid-column-end: 1;
    margin-top: 0;
  }
`;

storiesOf("LocalLink", module)
  .add("Accessible Internal Link", () => (
    <Grid>
      <Content>
        <p>
          LCRF Link is just a Higher Order Component (wrapper) that returns a link component if the hasAccess is true
          else just the href text is rendered as plain text.
        </p>
        <p>
          <b>
            Since you're in a Storybook all Next Link components won't work but here's an accessible based Next link to
            (see log in console): <LocalLink href={"/donations"}>donations</LocalLink>
          </b>
        </p>
        <p>
          Avoid using the NextJS link under next/link since that doesn't check if a user has access to link to content
          unless you're absolutely sure anyone should be allowed to navigate to that content.
        </p>
      </Content>
    </Grid>
  ))
  .add("Accessible Internal Link with no styling", () => (
    <Grid>
      <Content>
        <p>
          LCRF Link is just a Higher Order Component (wrapper) that returns a link component if the hasAccess is true
          else just the href text is rendered as plain text.
        </p>
        <p>
          <b>
            Since you're in a Storybook all Next Link components won't work but here's an accessible based Next link to
            (see log in console):{" "}
            <LocalLink href={"/donations"} noColor={true} noDecoration={true}>
              donations
            </LocalLink>
          </b>
        </p>
        <p>
          Avoid using the NextJS link under next/link since that doesn't check if a user has access to link to content
          unless you're absolutely sure anyone should be allowed to navigate to that content.
        </p>
      </Content>
    </Grid>
  ))
  .add("Accessible External Link", () => (
    <Grid>
      <Content>
        <p>
          LCRF Link is just a Higher Order Component (wrapper) that returns a link component if the hasAccess is true
          else just the href text is rendered as plain text.
        </p>
        <p>
          <b>
            Since you're in a Storybook all Next Link components won't work but here's an accessible based Next link to
            (see log in console): <LocalLink href={"www.lds.org"}>LDS Home</LocalLink>
          </b>
        </p>
        <p>
          Avoid using the NextJS link under next/link since that doesn't check if a user has access to link to content
          unless you're absolutely sure anyone should be allowed to navigate to that content.
        </p>
      </Content>
    </Grid>
  ))
  .add("Inaccessible Internal Link", () => (
    <Grid>
      <Content title="Link is not accessible (hasAccess set to false)" includeMenu={false}>
        <p>
          LCRF Link is just a Higher Order Component (wrapper) that returns a link component if the hasAccess is true
          else just the href text is rendered as plain text.
        </p>
        <p>
          <b>
            Since you're in a Storybook all Next Link components won't work but here's an accessible based Next link to
            (see log in console):{" "}
            <LocalLink hasAccess={false} href={"/donations"}>
              donations
            </LocalLink>
          </b>
        </p>
        <p>
          Avoid using the NextJS link under next/link since that doesn't check if a user has access to link to content
          unless you're absolutely sure anyone should be allowed to navigate to that content.
        </p>
      </Content>
    </Grid>
  ));

import React from "react";
import { mount } from "enzyme";
import Layout from "./Layout";

/**
 * You can get a lot of value for little cost by having a few good unit tests.
 * This file shows an example of that for the Layout component.
 * A smoke test for "renders with required props without crashing" is a good start.
 * You can optionally add tests for critical behaviors like the "renders children" one here.
 * But be careful not to tie your tests to implementation details.
 * It's better to have a few good tests than no tests or many brittle tests.
 *
 * Enzyme includes rendering helpers for React components
 * Source: https://airbnb.io/enzyme/docs/api/mount.html
 *
 * Jest has built-in assertions that let you validate different things
 * Source: https://jestjs.io/docs/en/expect
 */

describe("Layout", () => {
  it("renders with required props without crashing", () => {
    const wrapper = mount(<Layout />);
    const exists = wrapper.exists();

    expect(exists).toBe(true);
  });

  it("renders children", () => {
    const wrapper = mount(<Layout>Some children</Layout>);
    const text = wrapper.text();

    expect(text).toContain("Some children");
  });
});

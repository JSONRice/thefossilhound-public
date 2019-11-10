import React from "react";
import { shallow, mount, render } from "enzyme";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../styles/theme";
import { Accordion } from "./Accordion";
import sinon from "sinon";
import renderer from "react-test-renderer";
import "jest-styled-components";

describe("Accordion", () => {
  let AccordionJSX = (
    <ThemeProvider theme={theme}>
      <Accordion iconName="home" iconColor="#777" iconSize={14} hasIcon={true}>
        HELLO ACCORDION
      </Accordion>
    </ThemeProvider>
  );

  it("Should render without throwing an error", () => {
    expect(shallow(AccordionJSX)).not.toBeNull();
  });

  let ThemedAccordionComponent = mount(AccordionJSX);

  it("Should have a styled-components theme", () => {
    expect(ThemedAccordionComponent.props().theme).not.toBeNull();
  });

  it("check props passed in", () => {
    expect(ThemedAccordionComponent.props().children.props).toEqual({
      iconName: "home",
      iconColor: "#777",
      iconSize: 14,
      hasIcon: true,
      children: "HELLO ACCORDION",
      closed: true,
      iconExpand: false,
      justifyContent: "flex-start"
    });
  });

  it("test styled props on Accordion", () => {
    const AccordionComponent = ThemedAccordionComponent.find("Accordion");
    expect(AccordionComponent.state().closed).toEqual(true);
    AccordionComponent.simulate("click");
    expect(AccordionComponent.state().closed).toEqual(false);
    // One more click for good measure
    AccordionComponent.simulate("click");
    expect(AccordionComponent.state().closed).toEqual(true);
  });
});

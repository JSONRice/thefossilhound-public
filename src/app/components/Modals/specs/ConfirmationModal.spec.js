import React from "react";
import { shallow, mount, render } from "enzyme";
import { ConfirmationModal } from "../ConfirmationModal";
import { ThemeProvider } from "styled-components";
import theme from "../../../styles/theme";

describe("formatters", () => {
  it("Should render without throwing an error", () => {
    expect(shallow(
      <ThemeProvider theme={theme}>
        <ConfirmationModal
          heading={"Confirmation Modal"}
          confirmButtonQAHook="changedByApprovalConfirmSubmitForApprovalAction"
          cancelButtonQAHook="changedByApprovalCancelSubmitForApprovalAction"
        />
      </ThemeProvider>
    )).not.toBeNull();
  });

  // TODO: Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.
  xit('should mount in a full DOM', function() {
    expect(mount(
      <ThemeProvider theme={theme}>
        <ConfirmationModal
          heading={"Confirmation Modal"}
          confirmButtonQAHook="changedByApprovalConfirmSubmitForApprovalAction"
          cancelButtonQAHook="changedByApprovalCancelSubmitForApprovalAction"
        />
      </ThemeProvider>
    ).not.toBeNull());
  });

  // TODO: Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.
  xit("Should have some text (children)", () => {
    expect(render(
      <ThemeProvider theme={theme}>
        <ConfirmationModal
          heading={"Confirmation Modal"}
          confirmButtonQAHook="changedByApprovalConfirmSubmitForApprovalAction"
          cancelButtonQAHook="changedByApprovalCancelSubmitForApprovalAction"
        >
          HELLO MODAL
        </ConfirmationModal>
      </ThemeProvider>
    ).text()).toEqual("HELLO MODAL");
  });
});
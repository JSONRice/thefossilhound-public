import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";
import { storiesOf, setAddon } from "@storybook/react";
import JSXAddon from "storybook-addon-jsx";
import { ConfirmationModal } from "./ConfirmationModal";
import styled from "styled-components";
import { PrimaryButton } from "../../Buttons";

setAddon(JSXAddon);

const CHILDREN = `
We are uncovering better ways of developing
software by doing it and helping others do it.
Through this work we have come to value:

Individuals and interactions over processes and tools
Working software over comprehensive documentation
Customer collaboration over contract negotiation
Responding to change over following a plan

That is, while there is value in the items on
the right, we value the items on the left more.
`;

const PrimaryButtonWrapper = styled.div`
  padding: 20px;
`;

class ConfirmationModalStorybook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  render() {
    let { showModal } = this.state;

    return (
      <>
        <PrimaryButtonWrapper>
          <PrimaryButton onClick={() => this.setState({ showModal: true })}>Click to reveal modal</PrimaryButton>
        </PrimaryButtonWrapper>
        {showModal && (
          <ConfirmationModal
            heading={text("heading", "Confirmation Modal")}
            disabledConfirmButton={boolean("disabledConfirmButton", undefined)}
            disabledCancelButton={boolean("disabledCancelButton", undefined)}
            confirmButtonText={text("confirmButtonText", "Confirm")}
            cancelButtonText={text("cancelButtonText", "Cancel")}
            onConfirm={() => this.setState({ showModal: false }, action("onConfirm"))}
            onCancel={() => this.setState({ showModal: false }, action("onCancel"))}
            confirmButtonQAHook="changedByApprovalConfirmSubmitForApprovalAction"
            cancelButtonQAHook="changedByApprovalCancelSubmitForApprovalAction"
          >
            <b>Manifesto for Agile Software Development:</b>
            <br />
            <br />
            {text("children", CHILDREN)}
          </ConfirmationModal>
        )}
      </>
    );
  }
}

storiesOf("Modals", module)
  .addDecorator(withKnobs)
  .addWithJSX("ConfirmationModal", () => <ConfirmationModalStorybook />);

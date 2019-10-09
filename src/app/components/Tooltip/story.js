import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import { Tooltip } from "./";

import styled from "styled-components";
import { Icon } from "../Icon";
import { PrimaryButton, SecondaryButton } from "../Buttons";

const IconWrapper = styled.div`
  display: flex;
  padding: 5px;
  background-color: lightgoldenrodyellow;
  flex-direction: column;
`;

const PrintButtonIconWrapper = styled(IconWrapper)`
  padding: 5px;
  background-color: inherit;
  flex-direction: row;
  align-items: center;
`;

const StyledDiv = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const PrintButton = styled(PrimaryButton)`
  display: flex;
`;

const PrintLabel = styled.div`
  padding-left: 7px;
  ${({ theme }) => theme.fontSize(20)};
`;

const SecondaryPrintButton = styled(SecondaryButton)`
  display: flex;
  border-color: ${({ theme }) => theme.color.blue800};
`;

const SecondaryPrintLabel = styled.div`
  padding-left: 7px;
  color: ${({ theme }) => theme.color.blue800};
  ${({ theme }) => theme.fontSize(13)};
`;

const Content = styled.div`
  padding: 10px;
`;

const Title = styled(Content)`
  background-color: ${({ theme }) => theme.color.white200};
  font-family: "Open Sans";
  font-style: normal;
  font-weight: normal;
  ${({ theme }) => theme.fontSize(14)};
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  background: ${({ theme }) => theme.color.white200};
  border: 1px solid #cccccc;
  border-radius: 2px;
`;

const CheckboxWrapper = styled.div`
  margin-bottom: 10px;
`;

class HideOnClickExample extends React.Component {
  // See PrintOptionsTooltip for a real example
  state = {
    hideOnClick: false,
    hideTooltip: true
  };

  render() {
    return (
      <StyledDiv>
        <Tooltip
          placement={select(
            "placement",
            [
              "auto",
              "auto-start",
              "auto-end",
              "top",
              "top-start",
              "top-end",
              "right",
              "right-start",
              "right-end",
              "bottom",
              "bottom-start",
              "bottom-end",
              "left",
              "left-start",
              "left-end"
            ],
            Tooltip.defaultProps.placement
          )}
          hideOnClick={boolean("hideOnClick", false)}
          hideTooltip={this.state.hideTooltip}
          positionFixed={boolean("positionFixed", undefined)}
          showOnHover={boolean("showOnHover", undefined)}
          onShow={action("onShow")}
          renderTooltip={() => {
            return (
              <>
                <Title>Print Options</Title>
                <Content>
                  <CheckboxWrapper>
                    <StyledCheckbox /> Budget Summary Report
                  </CheckboxWrapper>
                  <CheckboxWrapper>
                    <StyledCheckbox /> Budget Detail Report
                  </CheckboxWrapper>
                  <SecondaryPrintButton
                    onClick={() => {
                      if (!this.state.hideOnClick) {
                        this.setState({ hideTooltip: !this.state.hideTooltip });
                      }
                    }}
                  >
                    <PrintButtonIconWrapper>
                      <Icon color="#0091BC" fontFamily={"fontFamilyGideon"} name="print" fontSize={13} />
                      <SecondaryPrintLabel>Print</SecondaryPrintLabel>
                    </PrintButtonIconWrapper>
                  </SecondaryPrintButton>
                </Content>
              </>
            );
          }}
        >
          <PrintButton
            onClick={() => {
              if (!this.state.hideOnClick) {
                this.setState({ hideTooltip: !this.state.hideTooltip });
              }
            }}
            style={{ backgroundColor: "#32CD32" }}
          >
            <PrintButtonIconWrapper>
              <Icon color="#ffffff" fontFamily={"fontFamilyGideon"} name="print" fontSize={20} />
              <PrintLabel>Print</PrintLabel>
            </PrintButtonIconWrapper>
          </PrintButton>
        </Tooltip>
      </StyledDiv>
    );
  }
}

storiesOf("Tooltip", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <StyledDiv>
      <Tooltip
        renderTooltip={() => {
          return (
            <>
              <Title>Report Options</Title>
              <div style={{ padding: "10px" }}>
                Not a lot of options are available at this moment. Please try back later.
              </div>
            </>
          );
        }}
      >
        <PrintButton>
          <PrintButtonIconWrapper>
            <Icon color="#ffffff" fontFamily={"fontFamilyGideon"} name="print" fontSize={20} />
            <PrintLabel>Options</PrintLabel>
          </PrintButtonIconWrapper>
        </PrintButton>
      </Tooltip>
    </StyledDiv>
  ))
  .add("hideOnClick defaulted to false", () => <HideOnClickExample />);

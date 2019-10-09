import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { Popover } from "./Popover";
import { Icon } from "../Icon";
import { PrimaryButton } from "../Buttons";
import { Tooltip } from "../Tooltip";
import { boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const PopoverStoryContainer = styled.div`
  display: flex;
  padding: 15px;
`;

const LeftArrowPopoverStoryContainer = styled(PopoverStoryContainer)`
  flex-direction: row;
  background-color: #ddb456;
`;

const ButtonPopoverStoryContainer = styled(PopoverStoryContainer)`
  position: relative;
  width: 350px;
  flex-direction: column;
  background-color: #99bbdd;
  justify-content: center;
  align-content: center;
`;

const UpArrowPopoverStoryContainer = styled(PopoverStoryContainer)`
  position: relative;
  flex-direction: column;
  background-color: #5fdd7f;
`;

const DownArrowPopoverStoryContainer = styled(PopoverStoryContainer)`
  flex-direction: column-reverse;
`;

const IconWrapper = styled.div`
  display: flex;
  padding: 5px;
  background-color: lightgoldenrodyellow;
  flex-direction: column;
`;

const PrintButtonIconWrapper = styled(IconWrapper)`
  padding: 5px;
  background-color: inherit;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  ${({ theme }) => theme.fontSize(14)};
  padding: 4px 6px;
  min-width: 275px;
  width: 347px;
  border: 1px solid ${({ theme }) => theme.color.gray500};
  border-radius: 4px;
`;

const PrintButtonWrapper = styled.div`
  padding-bottom: 5px;
`;

const PrintButton = styled(PrimaryButton)`
  display: flex;
`;

const PrintLabel = styled.div`
  ${({ theme }) => theme.fontSize(20)};
`;

class PopoverStory extends React.Component {
  state = {
    isTopOpen: this.props.isTopOpen,
    isLeftOpen: this.props.isLeftOpen,
    isBottomOpen: this.props.isBottomOpen,
    isPrintButtonClicked: this.props.isPrintButtonClicked
  };

  _typeAheadSearch = e => {
    if (e.target.value && e.target.value.length >= 3) {
      this.setState({ isTopOpen: true });
    } else {
      this.setState({ isTopOpen: false });
    }
  };

  render() {
    let { isTopOpen, isLeftOpen, isPrintButtonClicked } = this.state;

    return (
      <Container>
        <UpArrowPopoverStoryContainer>
          <IconWrapper>
            <StyledInput onChange={this._typeAheadSearch} placeholder="LDS Account or Unit Name/Number" />
            {isTopOpen && (
              <Popover arrowOrientation="up" includeArrow={false} backgroundColor="#F4ECF7">
                Text for fully spanned popover below icon with no arrow.
              </Popover>
            )}
          </IconWrapper>
        </UpArrowPopoverStoryContainer>
        <ButtonPopoverStoryContainer>
          <PrintButtonIconWrapper>
            <PrintButtonWrapper>
              <PrintButton onClick={() => this.setState({ isPrintButtonClicked: !isPrintButtonClicked })}>
                <PrintButtonIconWrapper>
                  <Icon color="#ffffff" fontFamily={"fontFamilyGideon"} name="print" fontSize={20} />
                </PrintButtonIconWrapper>
                <PrintLabel>Print</PrintLabel>
              </PrintButton>
            </PrintButtonWrapper>
            {isPrintButtonClicked && (
              <Popover arrowOrientation="up" backgroundColor="#F4ECF7" title="Print Options">
                Notice how this popover stays within the bounds of it's parent container. The parent container must be
                relatively positioned. This can be a challenge in some scenarios but the parent must be relative for
                this to work as this container is absolutely positioned.
              </Popover>
            )}
          </PrintButtonIconWrapper>
        </ButtonPopoverStoryContainer>
        <LeftArrowPopoverStoryContainer>
          <IconWrapper>
            <Icon
              name={"infoIcon"}
              fontFamily={"fontFamilyGideon"}
              fontSize={13}
              onClick={() => this.setState({ isLeftOpen: !isLeftOpen })}
            />
          </IconWrapper>
          {isLeftOpen && <Popover arrowOrientation="left">Text for left arrow popover.</Popover>}
        </LeftArrowPopoverStoryContainer>
        <Container>
          <PrintButtonIconWrapper>
            <PrintButtonWrapper>
              <Tooltip
                toolTipDisabled={boolean("toolTipDisabled", undefined)}
                toolTipPlacement="bottom"
                toolTipPositionFixed={boolean("toolTipPositionFixed", undefined)}
                showToolTipOnHover={boolean("showToolTipOnHover", undefined)}
                onShowToolTip={action("onShowToolTip")}
                renderTooltip={() => (
                  <div>
                    Notice how this popover stays within the bounds of it's parent container. The parent container must
                    be relatively positioned. This can be a challenge in some scenarios but the parent must be relative
                    for this to work as this container is absolutely positioned.
                  </div>
                )}
              >
                <PrintButton>
                  <PrintButtonIconWrapper>
                    <Icon color="#ffffff" fontFamily={"fontFamilyGideon"} name="print" fontSize={20} />
                  </PrintButtonIconWrapper>
                  <PrintLabel>Print</PrintLabel>
                </PrintButton>
              </Tooltip>
            </PrintButtonWrapper>
          </PrintButtonIconWrapper>
        </Container>
      </Container>
    );
  }
}

storiesOf("Popover", module).add("Popover", () => {
  return (
    <Container>
      The following are some practical applications for Popovers (i.e. ProxySupport drop field and Icon tooltips). Try
      typing at least three or more characters in the text box.
      <PopoverStory />
    </Container>
  );
});

import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { CloseButton } from "../Buttons";

const StyledBanner = styled.div`
  font-family: ${({ theme }) => theme.font.fontFamilySans};
  ${theme.fontSize(14)};
  width: 100%;
  padding: 24px 30px 18px 68px;
  ${props => ({ theme }) => theme.bannerColors(props.type)};
  position: relative;
  margin-bottom: 20px;
  border-radius: 4px;
  word-wrap: break-word;

  ::before {
    font-family: ${({ theme }) => theme.font.fontFamilyGideon};
    ${theme.fontSize(28)};
    line-height: normal;
    position: absolute;
    top: 16px;
    left: 23px;
    ${props => ({ theme }) => theme.bannerIcon(props.type)};
  }
`;

const Header = styled.h3`
  font-family: ${({ theme }) => theme.font.fontFamilyHelamSlab};
  font-style: normal;
  display: block;
  font-weight: 200;
  margin: 0 0 8px;
  line-height: normal;
  ${theme.fontSize(18)};
`;

const Body = styled.p`
  display: block;
  ${theme.fontSize(13)};
  margin: 0 0 8px;
  line-height: normal;
`;

class Banner extends React.Component {
  state = { close: false };

  render() {
    let { type = "info", title = "", children, dismissible = true, show = true } = this.props;
    let { close } = this.state;

    return (
      !close &&
      show && (
        <StyledBanner type={type}>
          {dismissible && <CloseButton onClick={() => this.setState({ close: true })} />}
          <Header>{title}</Header>
          <Body>{children}</Body>
        </StyledBanner>
      )
    );
  }
}

export default Banner;

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../../../styles/theme";

const StyledWrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  z-index: 900000;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: #0008;
  overflow: hidden;
  align-items: center;
  justify-items: center;
`;

const StyledContainer = styled.div`
  pointer-events: auto;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
  max-height: 500px;
  background-color: white;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  top: -15%;
`;

const H1 = styled.h2`
  font-family: ${theme.font.fontFamilyHelamSlab};
  font-style: normal;
  font-weight: 200;
  color: ${theme.color.white100};
  background-color: ${theme.color.blue1000};
  margin: 0;
  padding: 20px;
  border: 1px solid ${theme.color.blue1000};
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  ${theme.fontSize(22)};
  line-height: 20px;
`;

const ClickableText = styled.span`
  cursor: ${({ disabled }) => !disabled && "pointer"};
  color: ${({ disabled, theme }) => disabled && theme.color.textPrimaryLight};

  &:hover {
    color: ${({ disabled, theme }) => !disabled && theme.color.textPrimaryDark};
  }
`;

ClickableText.propTypes = {
  disabled: PropTypes.bool
};

export class Modal extends React.Component {
  static propTypes = {
    heading: PropTypes.string.isRequired,
    onClose: PropTypes.func
  };

  constructor(...args) {
    super(...args);
    this._$portalWrapper = document.getElementById("modals");
    this._$portalEl = document.createElement("div");
  }

  render() {
    const { heading, onClose, children } = this.props;

    return ReactDOM.createPortal(
      <StyledWrapper>
        <StyledContainer cornerType="none" gutter="500">
          <H1>
            {heading}
            <ClickableText onClick={onClose} />
          </H1>
          <div>{children}</div>
        </StyledContainer>
      </StyledWrapper>,
      this._$portalEl
    );
  }

  componentDidMount() {
    this._$portalWrapper.appendChild(this._$portalEl);

    document.body.style.pointerEvents = "none";
    document.addEventListener("keydown", this.onKeyPress);
  }

  componentWillUnmount() {
    this._$portalWrapper.removeChild(this._$portalEl);

    document.removeEventListener("keydown", this.onKeyPress);
    document.body.style.pointerEvents = null;
  }

  onKeyPress = e => {
    if (e.keyCode === 27 && this.props.onClose) {
      this.props.onClose();
    }
  };
}

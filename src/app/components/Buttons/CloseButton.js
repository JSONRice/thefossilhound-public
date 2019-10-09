import styled from "styled-components";
import theme from "../../styles/theme";
import React from "react";

const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: 0;

  float: right;
  ${theme.fontSize(21)};
  font-weight: bold;
  line-height: 1;
  color: ${theme.color.black900};
  text-shadow: 0 1px 0 ${theme.color.white100};
  opacity: 0.2;

  :hover {
    padding: 0;
    color: ${theme.color.black900};
    text-decoration: none;
    cursor: pointer;
    opacity: 0.5;
  }
`;

export const CloseButton = ({ onClick }) => {
  return (
    <StyledCloseButton aria-label="Close" type="button" onClick={onClick}>
      <span aria-hidden="true">×</span>
    </StyledCloseButton>
  );
};

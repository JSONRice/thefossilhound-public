import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const SecondaryButton = styled.button`
  min-height: ${({ size, theme }) => (size === "small" ? theme.button.small.minHeight : theme.button.minHeight)};
  ${({ size, theme }) => theme.fontSize(size === "small" ? 11 : 14)};

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  &:hover,
  &:active,
  &:focus {
    background-color: ${({ theme }) => theme.color.secondaryButtonHoverBackground};
    border-color: ${({ theme }) => theme.color.secondaryButtonHoverBorder};
  }

  color: ${({ theme }) => theme.color.black700};
  background-color: ${({ active, theme }) =>
    active ? theme.color.secondaryButtonHoverBackground : theme.color.buttonText};
  border-color: ${({ active, theme }) =>
    active ? theme.color.secondaryButtonHoverBorder : theme.color.secondaryButtonBorder};
  line-height: 1.5;
  display: inline-block;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  user-select: none;
  background-image: none;
  border: 1px solid ${({ theme }) => theme.color.gray500};
  border-radius: 4px;
  word-wrap: break-word;
  ${({ theme }) => theme.font.fontFamilySans};
  transition: background-color 0.1s ease-in-out;
  text-decoration: none;
`;

SecondaryButton.propTypes = {
  size: PropTypes.oneOf(["default", "small"]),
  loading: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func
};

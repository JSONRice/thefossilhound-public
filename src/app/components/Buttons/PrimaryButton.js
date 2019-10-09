import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const PrimaryButton = styled.button`
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
  &:focus {
    color: ${({ theme }) => theme.color.buttonText};
    background-color: ${({ theme }) => theme.color.primaryButtonHover};
    border-color: ${({ theme }) => theme.color.primaryButtonHoverBorder};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.primaryButtonActive};
  }

  color: ${({ theme }) => theme.color.buttonText};
  background-color: ${({ theme }) => theme.color.primaryButtonBackground};
  line-height: 1.5;
  display: inline-block;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  user-select: none;
  background-image: none;
  border: 1px solid ${({ theme }) => theme.color.blue1000};
  border-radius: 4px;
  word-wrap: break-word;
  ${({ theme }) => theme.font.fontFamilySans};
  transition: background-color 0.1s ease-in-out;
  text-decoration: none;
`;

PrimaryButton.propTypes = {
  focused: PropTypes.bool,
  size: PropTypes.oneOf(["default", "small"]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func
};

import React from "react";
import styled from "styled-components";
import { SecondaryButton } from "../Buttons";

/**
 * (HOC) Clear button for filter bar
 *
 * @type {StyledComponentClass<any, any, any>}
 */
const Clear = styled(SecondaryButton)`
  border: none;
  ${({ theme }) => theme.fontSize(11)};
  line-height: 0;
  background-color: transparent !important;
  color: ${({ theme }) => theme.color.gray1000};
  &:hover {
    color: ${({ theme }) => theme.color.blue800};
    text-decoration: underline;
  }
`;

export default ({ onClick }) => {
  return <Clear onClick={onClick}>Clear</Clear>;
};

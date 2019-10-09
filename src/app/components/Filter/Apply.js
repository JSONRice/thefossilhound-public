import styled from "styled-components";
import { PrimaryButton } from "../Buttons";
import React from "react";

export const StyledApply = styled(PrimaryButton)`
  ${({ theme }) => theme.fontSize(11)};
  line-height: 0;
`;

/**
 * (HOC) Apply button for custom dates
 */
export const Apply = ({ onClick }) => {
  return (
    <StyledApply onClick={onClick} disabled={false} size="small">
      Apply
    </StyledApply>
  );
};

import React from "react";
import { ButtonGroup } from "../../Buttons";
import styled from "styled-components";

const StyledButtonGroup = styled(ButtonGroup)`
  justify-content: flex-end;
  padding: 20px;
  > *:not(:last-child) {
    margin-right: 15px;
  }
`;

const Separator = styled.hr`
  margin: 0;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.gray200};
`;

export const ModalBottomButtonGroup = ({ children }) => {
  return (
    <>
      <Separator />
      <StyledButtonGroup>{children}</StyledButtonGroup>
    </>
  );
};

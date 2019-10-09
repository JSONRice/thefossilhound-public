import React from "react";
import styled from "styled-components";

const DatePickerContainer = styled.div`
  margin: 5px 0 10px 0;
`;

const StyledDatePicker = styled.div`
  display: flex;
  flex: 1;
  background-color: #e6e6e6;
  border: 1px solid #999999;
  border-radius: 6px;
  padding: 15px;

  > *:not(:last-child) {
    margin-right: 15px;
  }
`;

export const DatePicker = ({ children }) => {
  return (
    <DatePickerContainer>
      <StyledDatePicker>{children}</StyledDatePicker>
    </DatePickerContainer>
  );
};

import React from "react";
import { HeaderCell, Header } from "../../Table";
import styled from "styled-components";

let StyledHeader = styled(Header)`
  padding: 10px 0px;
`;

export const DesktopHeader = () => {
  return (
    <StyledHeader>
      <HeaderCell indent="20px">Date</HeaderCell>
      <HeaderCell>Ref #</HeaderCell>
      <HeaderCell>Category</HeaderCell>
      <HeaderCell width="23.4%">Description</HeaderCell>
      <HeaderCell>Type</HeaderCell>
      <HeaderCell width="10">Amount</HeaderCell>
    </StyledHeader>
  );
};

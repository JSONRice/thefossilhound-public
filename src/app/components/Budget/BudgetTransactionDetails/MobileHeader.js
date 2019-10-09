import React from "react";
import { HeaderCell, Header } from "../../Table";
import styled from "styled-components";

let Row = styled.div`
  padding: 10px;
`;

export const MobileHeader = () => {
  return (
    <Header>
      <Row>
        <HeaderCell>Transactions</HeaderCell>
      </Row>
    </Header>
  );
};

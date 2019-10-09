import React from "react";
import styled from "styled-components";

const FilterBarContainer = styled.div`
  display: flex;
  padding: 10px 10px 0 0;
  margin: 5px 0 0 0;

  > *:not(:last-child) {
    margin-right: 15px;
  }
`;

export const FilterBar = ({ children }) => {
  return <FilterBarContainer>{children}</FilterBarContainer>;
};

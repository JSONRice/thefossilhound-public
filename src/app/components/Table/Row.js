import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  padding: 10px;

  background-color: ${props =>
    !props.isLine
      ? props.id % 2 !== 0
        ? ({ theme }) => theme.containers.rowOdd
        : "transparent"
      : props.parentIndex % 2 !== 0
      ? ({ theme }) => theme.containers.rowOdd
      : "transparent"};
`;

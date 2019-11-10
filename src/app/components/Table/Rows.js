import React from "react";
import PropTypes from "prop-types";
import { ExpandableRow, NewRow } from "./";
import styled from "styled-components";
import { Spinner } from "../Spinner";
import { column } from "../../utils/prop-types";

const RowsContainer = styled.section`
  width: 100%;

  > :nth-child(odd) {
    background-color: ${({ theme }) => theme.containers.rowOdd};
  }
  > :nth-child(even) {
    background-color: ${({ theme }) => theme.containers.rowEven};
  }
`;

export const Rows = ({ columnConfiguration, currencyCode, expandAll, loading, rows, viewType }) => {
  if (!rows || rows.length === 0 || loading) {
    return <Spinner delay={300} />;
  }

  return (
    <RowsContainer>
      {rows.map((row, rowIndex) => {
        if (row && row.lines && row.lines.length > 0) {
          return (
            <ExpandableRow
              row={row}
              columnConfiguration={columnConfiguration}
              currencyCode={currencyCode}
              expandAll={expandAll}
              key={`row-${rowIndex}`}
              viewType={viewType}
            />
          );
        }
        return (
          <NewRow
            row={row}
            columnConfiguration={columnConfiguration}
            currencyCode={currencyCode}
            viewType={viewType}
            key={`row-${rowIndex}`}
          />
        );
      })}
    </RowsContainer>
  );
};

Rows.propTypes = {
  columnConfiguration: PropTypes.arrayOf(PropTypes.shape(column)).isRequired,
  currencyCode: PropTypes.string,
  expandAll: PropTypes.bool,
  loading: PropTypes.bool,
  rows: PropTypes.array.isRequired,
  viewType: PropTypes.string.isRequired
};

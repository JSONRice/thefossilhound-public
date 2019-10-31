import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import MediaQuery from "@churchofjesuschrist/eden-media-query";
import { Rows, Headers } from "./";
import theme from "../../styles/theme";
import { column } from "../../utils/prop-types";
import MediaQuery from "react-responsive";
import { ResponsiveMenu } from "../Menu";

/**
 * The Table component provides table based API functionality for sorting,
 * filtering, searching, etc. It also renders the rows and columns based on the data received
 * Developers are responsible for passing proper data that can be displayed in a table.
 * Column configuration data is also required, which defines the columns that will be displayed.
 *
 * DOCS
 * 1. Width's of all columns provided should total => 100 - (arrow column width)
 * Arrow Column Width Amount by Viewtype:
 *  - Desktop: 2.5%
 *  - Tablet: 10%
 *  - Mobile: 7%
 */
const DEFAULT_KEY = "*";

const TableContainer = styled.article`
  @media screen and (max-width: ${({ theme }) => theme.media.tabletMax}px) {
    width: 100%;
  }
`;

export class Table extends Component {
  constructor(props) {
    super(props);
    let defaultSortAsc = this.props.defaultSortAsc;
    let sortMultiplier = 0; // default (for sort function)
    if (defaultSortAsc === true) {
      sortMultiplier = 1;
    } else if (defaultSortAsc === false) {
      sortMultiplier = -1;
    }
    this.state = {
      expandAll: false,
      expandedRows: [],
      overridenSortAsc: undefined,
      sortMultiplier: sortMultiplier,
      sortKey: undefined,
      sortDataType: "string",
      filterPairs: this.props.filterPairs
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.filterPairs !== prevProps.filterPairs && this.props.filterPairs !== this.state.filterPairs) {
      this.setState({ filterPairs: this.props.filterPairs });
    }
  }

  /**
   * Expands a row based on the row index. If no row index is provided toggle expands all the rows.
   * Keep in mind that by default expandAll is false so if no rowIndex is provided then the expandAll is applied (set
   * to true).
   *
   * @param rowIndex
   */
  expand = rowIndex => {
    let { expandAll, expandedRows } = this.state;
    if (rowIndex || rowIndex === 0) {
      this.setState({
        expandedRows: expandedRows.includes(rowIndex)
          ? expandedRows.filter(item => item !== rowIndex)
          : [...expandedRows, rowIndex]
      });
    } else {
      this.setState({
        expandAll: !expandAll,
        expandedRows: !expandAll ? this.props.data.map((_, index) => index) : []
      });
    }
  };

  sortBy = (key, defaultSortType) => {
    let { overridenSortAsc, sortMultiplier, sortDataType } = this.state;
    // The optional default sort type always trumps the sort data type.
    if (defaultSortType && typeof defaultSortType === "string") {
      sortDataType = defaultSortType;
    }
    // Overriden sort asc is utilized by dropdowns and other sort invoking components that want to override the
    // sort order to match their behavior. See the third storybook for table.
    if (overridenSortAsc === true) {
      sortMultiplier = 1;
    } else if (overridenSortAsc === false) {
      sortMultiplier = -1;
    }
    return (a, b) => {
      // Date string types
      if (sortDataType === "date") {
        const aVal = new Date(a[key]).getTime();
        const bVal = new Date(b[key]).getTime();
        if (aVal > bVal) {
          return sortMultiplier;
        } else if (aVal < bVal) {
          return -sortMultiplier;
        } /* equality */ else {
          return 0;
        }
      }
      // All other types - strings and numbers
      else {
        let aVal = a[key];
        let bVal = b[key];
        if (aVal > bVal) {
          return sortMultiplier;
        } else if (aVal < bVal) {
          return -sortMultiplier;
        } /* equality */ else {
          return 0;
        }
      }
    };
  };

  sort = (key, dataType = "string", overridenSortAsc = undefined) => {
    let { sortKey, sortMultiplier } = this.state;
    this.setState({
      overridenSortAsc,
      sortKey: key,
      sortMultiplier: sortKey === key ? sortMultiplier * -1 : 1,
      sortDataType: dataType
    });
  };

  // One level deep
  filter = (filterValue, filterKey = DEFAULT_KEY, filterType = "string") => {
    let { filterPairs } = this.state;
    let pairs = null;
    if (filterValue) {
      if (filterType === "string") {
        filterValue = filterValue.toLowerCase();
      }
      // Append the new filter key-value pair to the filtered pairs map and re-render the component
      pairs = {
        ...filterPairs,
        [filterKey]: { filterValue, filterType }
      };
      this.setState({
        filterPairs: pairs
      });
    } else {
      delete filterPairs[filterKey];
      this.setState({
        filterPairs
      });
    }
    return pairs ? pairs : this.state.filterPairs;
  };

  clear = () => {
    this.setState({
      filterPairs: []
    });
  };

  filterAll = filterKey => {
    return a => {
      if (!filterKey) {
        return true;
      }
      return Object.keys(a).find(b => {
        let topLevelMatch = this.compareRecord(a[b], filterKey);
        // If any lines match return true else return false
        let linesMatched = false;
        if (a.lines && a.lines.length > 0) {
          linesMatched = a.lines
            .map(record => {
              // If any key in the record equals the filter key return true
              return Object.keys(record).some(r => {
                return this.compareRecord(record[r], filterKey);
              });
            })
            .includes(true);
        }
        return topLevelMatch || linesMatched;
      });
    };
  };

  // If the record matches the filter key return true else return false
  compareRecord = (record, filterKey) => {
    if (record && !Array.isArray(record)) {
      return (
        record
          .toString()
          .toLowerCase()
          .indexOf(filterKey.toLowerCase()) > -1
      );
    }
    return false;
  };

  toggleExpandAll() {
    this.setState({ expandAll: !this.state.expandAll });
  }

  render() {
    let {
      columnConfiguration,
      tabletOverrideColumnConfiguration,
      mobileOverrideColumnConfiguration,
      children,
      currencyCode,
      data = [],
      defaultSortKey,
      defaultSortType,
      loading
    } = this.props;
    let { expandAll, filterPairs, sortKey } = this.state;
    const tabletBreakPoint = `(min-width: ${theme.media.mobileMax + 1}px)`;
    const desktopBreakPoint = `(min-width: ${theme.media.tabletMax + 1}px)`;
    let rows = Object.keys(filterPairs).reduce((acc, key) => {
      let filterValue = filterPairs[key].filterValue;
      let filterType = filterPairs[key].filterType;
      if (key === "*") {
        return acc.filter(this.filterAll(filterValue, filterType));
      } else {
        return acc.filter(item => {
          if (filterType === "date") {
            // TODO: implement date filter logic
          }
          if (item[key]) {
            return (
              item[key]
                .toString()
                .toLowerCase()
                .indexOf(filterValue.toString().toLowerCase()) > -1
            );
          }
        });
      }
    }, data);

    if (columnConfiguration) {
      rows = rows.map(row => {
        return { ...row, expanded: false };
      });
    }

    // TODO => The row manipulation here should happen in a lifecycle function, and rows should probably be a derived state from props
    // If filters have been applied and only one row with lines is left, expand that row
    if (
      rows &&
      rows.length === 1 &&
      rows[0].lines &&
      rows[0].lines.length > 0 &&
      !this.state.expandedRows.includes(0) &&
      filterPairs &&
      Object.keys(filterPairs).length > 0
    ) {
      if (columnConfiguration) {
        rows[0].expanded = true;
      } else {
        this.expand(0);
      }
    }

    // If there is a sort key or default sort key apply that to the final set:
    if (sortKey) {
      rows = rows.sort(this.sortBy(sortKey));
    } else if (defaultSortKey) {
      if (defaultSortType) {
        rows = rows.sort(this.sortBy(defaultSortKey, defaultSortType));
      } else {
        rows = rows.sort(this.sortBy(defaultSortKey));
      }
    }

    const renderTable = (viewType = "desktop") => {
      let columns = columnConfiguration; // desktop column config
      if ((viewType === "tablet" || viewType === "mobile") && tabletOverrideColumnConfiguration) {
        columns = tabletOverrideColumnConfiguration;
      }
      if (viewType === "mobile" && mobileOverrideColumnConfiguration) {
        columns = mobileOverrideColumnConfiguration;
      }
      return (
        <TableContainer>
          <Headers
            columnConfiguration={columns}
            expandAll={expandAll}
            toggleExpandAll={this.toggleExpandAll.bind(this)}
            viewType={viewType}
          />
          {(rows && rows.length > 0) || loading ? (
            <Rows
              rows={rows}
              columnConfiguration={columns}
              currencyCode={currencyCode}
              expandAll={expandAll}
              viewType={viewType}
              loading={loading}
            />
          ) : (
            <span>No results for search</span>
          )}
        </TableContainer>
      );
    };

    // Return the children with the exposed Table API functions:
    return (
      <>
        {children({
          expand: this.expand,
          expandedRows: this.state.expandedRows,
          rows,
          sort: this.sort,
          filter: this.filter,
          clear: this.clear,
          filterPairs: this.state.filterPairs
        })}
        {columnConfiguration && (
          <>
            {/*Mobile*/}
            <MediaQuery maxDeviceWidth={theme.media.mobileMax}>{renderTable("mobile")}</MediaQuery>
            {/*Tablet*/}
            <MediaQuery minDeviceWidth={theme.media.mobileMax + 1} maxDeviceWidth={theme.media.tabletMax}>
              {renderTable("tablet")}
            </MediaQuery>
            {/*Desktop*/}
            <MediaQuery minDeviceWidth={theme.media.tabletMax + 1}>{renderTable("desktop")}</MediaQuery>
          </>
        )}
      </>
    );
  }
}

Table.defaultProps = {
  filterPairs: { "*": { filterValue: "", filterType: "string" } }
};

Table.propTypes = {
  data: PropTypes.array,
  columnConfiguration: PropTypes.arrayOf(PropTypes.shape(column)),
  tabletOverrideColumnConfiguration: PropTypes.arrayOf(PropTypes.shape(column)),
  mobileOverrideColumnConfiguration: PropTypes.arrayOf(PropTypes.shape(column)),
  loading: PropTypes.bool,
  currencyCode: PropTypes.string
};

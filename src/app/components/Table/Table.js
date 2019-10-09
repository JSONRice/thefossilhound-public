import React, { Component } from "react";

/**
 * The Table component is a bare bones component that simply provides table based API functionality for sorting,
 * filtering, searching, etc. The developer is responsible for supplying a list of data items which is nothing more than
 * an array of objects. Each object element represents a row and every tuple (key-value pair) in the object represents a
 * single cell. The table simply renders the rows and maintains the data set (sorted, filtered, etc.).
 */

const DEFAULT_KEY = "*";

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

    let { isMobile, isTablet } = this._calcWindowDimensions();

    this.state = {
      overridenSortAsc: undefined,
      data: this.props.data,
      sortMultiplier: sortMultiplier,
      sortKey: undefined,
      sortDataType: "string",
      filterPairs: this.props.filterPairs,
      isMobile,
      isTablet
    };
  }

  _calcWindowDimensions = () => {
    let isMobile = false;
    let isTablet = false;

    // Check if width is zero. If so we're on an iOS device and roll back to use window.innerWidth
    let width = window.outerWidth === 0 ? window.innerWidth : window.outerWidth;

    // Mobile
    if (width < 767) {
      isMobile = true;
    }
    // Tablet
    if (width >= 767 && width <= 991) {
      isTablet = true;
    }

    return { isMobile, isTablet };
  };

  handleResize = () => {
    let { isMobile, isTablet } = this._calcWindowDimensions();
    this.setState({ isMobile, isTablet });
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  /**
   * Expand a row callback
   *
   * @param id
   * @param idName defaults to "id"
   * @param all expand flag toggle
   */
  expand = (id, idName = "id", all) => {
    let results = this.state.data.map(d => {
      if (d[idName] === id) {
        if (all !== undefined) {
          d.expand = !all;
        } else {
          d.expand = !d.expand;
        }
      }
      return d;
    });

    this.setState({
      data: results
    });
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

  unexpand = () => {
    // Remove expand from every record (nothing should be expanded by default):
    let data = this.state.data.map(d => {
      d.expand = false;
      return d;
    });

    this.setState({ data });
  };

  clear = () => {
    this.setState({
      filterPairs: []
    });

    this.unexpand();
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
          // linesMatched ? (a.expand = true) : (a.expand = false);
        }
        // else {
        //   a.expand = false;
        // }

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

  /**
   * If the underlying data set changes on the parent make sure to update it in the Table.
   *
   * @param nextProps
   * @param prevState
   * @returns {*}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data && prevState.data) {
      if (nextProps.data.length !== prevState.data.length) {
        return {
          ...prevState,
          data: nextProps.data
        };
      }
    }
    return null;
  }

  render() {
    let { children, defaultSortKey, defaultSortType } = this.props;

    let { data = [], filterPairs, isMobile = false, isTablet = false, sortKey } = this.state;

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

    // Return the children with the exposed Table API functions:
    return (
      <React.Fragment>
        {children({
          rows,
          sort: this.sort,
          filter: this.filter,
          expand: this.expand,
          clear: this.clear,
          filterPairs: this.state.filterPairs,
          isMobile,
          isTablet,
          unexpand: this.unexpand
        })}
      </React.Fragment>
    );
  }
}

Table.defaultProps = {
  filterPairs: { "*": { filterValue: "", filterType: "string" } }
};

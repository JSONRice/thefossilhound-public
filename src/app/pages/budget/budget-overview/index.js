import React from "react";
import Page from "../../../components/Page/Page";
import { roundPercentSpent, formatCurrencyWithSymbol } from "../../../utils/formatters";
import styled from "styled-components";
import { Cell, Header, HeaderCell, Table } from "../../../components/Table";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { LCRF_BUDGET_SUMMARIES_QUERY } from "../../../queries/lcrfBudgetSummaries";
import Spinner from "../../../components/Spinner/Spinner";
import { Apply, Clear, DateButtons, DatePicker, FilterBar, Search } from "../../../components/Filter";
import { Icon } from "../../../components/Icon";
import BalanceWidget from "../../../components/BalanceWidget/BalanceWidget";
import { DesktopRow, MobileRow, TabletRow } from "../../../components/Budget/BudgetSummary";
import { Dropdown } from "../../../components/Dropdown";
import { extractFilterOptions, extractFlattenedFilterOptions, flatten } from "../../../utils/filter-utils";
import { getCurrencyCode, getCurrencyCodeFromData } from "../../../services/security-service";
import { updateFilterField, clear } from "../../../actions/budget/budget-overview-actions";
import {
  getMonthOptions,
  getDateFromGraphQLDateString,
  getTwoDigitMonth
} from "../../../services/date-formatter-service";
import { datePickerDropdownOptions, getDateTypeLabel, retentionYearsOptions } from "../../../utils/budget-utils";
import { ResponsiveFilterBarDropdownWrapper } from "../../../components/Filter";
import Banner from "../../../components/Banner/Banner";
import { PrintOptionsTooltip } from "../../../components/Budget";
import { Tooltip } from "../../../components/Tooltip";
import { Badge } from "../../../components/Badge";

let StyledHeader = styled(Header)`
  padding: 10px;
`;

const ResponsiveBalanceWidgetWrapper = styled.div`
  padding-left: 8px;
`;

const StyledResponsiveFilterBar = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.color.blue1100};
`;

const ResponsiveFilterBarHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-left: 8px;
  color: ${({ theme }) => theme.color.blue800};
`;

const ResponsiveFilterBarClear = styled(Clear)`
  background-color: transparent;
  color: ${({ theme }) => theme.color.blue800};

  &:active,
  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.color.blue800};
    border: none;
  }
`;

const ResponsiveFilterBarRowContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ResponsiveFilterBarSearchRow = styled(ResponsiveFilterBarRowContainer)`
  padding: 12px 10px;
  border: none;
`;

const ResponsiveFilterBarRowBorder = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color.blue1600};
`;

const ResponsiveFilterBarSearch = styled(Search)`
  border-radius: 4px;
  width: 100%;
`;

const ResponsiveFilterBarRow = styled(ResponsiveFilterBarRowContainer)`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px 12px 10px;
`;

// For Apply and Clear buttons though Clear appears more like a link it's really a transparent button
const ResponsiveFilterBarButtonsRow = styled(ResponsiveFilterBarRow)`
  display: inline;
  padding: 12px;
  *:last-child {
    padding-right: 0;
  }
`;

const ResponsiveFilterBarDatePickerRow = styled(ResponsiveFilterBarRow)`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 10px 0 10px;
`;

const IconWrapper = styled.div`
  margin-right: 5px;
`;

// The previous column is only revealed if a custom date is selected. This is the tooltip container for that header.
const PreviousColumnTooltip = styled.div`
  text-transform: none;
  padding: 10px;
`;

const ConnectedQuery = connect(state => {
  return {
    variables: {
      input: {
        orgId: state.security.unit ? state.security.unit.orgId : null,
        dateFrom: state.budgetSummary.variables.input.dateFrom,
        dateTo: state.budgetSummary.variables.input.dateTo
      }
    }
  };
})(Query);

class BudgetSummary extends React.Component {
  constructor(props) {
    super(props);
    this.searchTextRef = React.createRef();
    this.state = {
      categoryExpandAllClicked: false,
      customDateError: false,
      dateType: "",
      dateTypeSelected: props.budgetSummary.dateType,
      showCustomDate: false,
      showCustomResponsiveFilterBarDate: false,
      showResponsiveFilterBar: false
    };
  }

  _updateFilterBarField = field => this.props.dispatchUpdateFilterField(field);

  /**
   * Render headers (header row)
   *
   * @param expand callback
   * @param rows to base expand off of
   * @param isMobile
   * @param isTablet
   * @param showPreviousActivityColumn show or hide the previous activity column
   * @private
   */
  _renderHeaders = (expand, rows = [], isMobile = false, isTablet = false, showPreviousActivityColumn) => {
    let expandAll = (expand, rows) => {
      if (expand && rows && rows.length > 0) {
        rows.forEach(record => expand(record.subcategoryId, "subcategoryId", this.state.categoryExpandAllClicked));
        this.setState({ categoryExpandAllClicked: !this.state.categoryExpandAllClicked });
      }
    };

    // MOBILE
    if (isMobile) {
      return (
        <StyledHeader>
          <Cell width="7%" onClick={() => expandAll(expand, rows)}>
            <Icon name="triangleRight" expand={this.state.categoryExpandAllClicked} />
          </Cell>
          <HeaderCell width="66.5%">CATEGORY</HeaderCell>
          <HeaderCell justifyContent="flex-end" width="26.5%">
            {translate("label.balance")}
          </HeaderCell>
        </StyledHeader>
      );
    }
    // TABLET
    else if (isTablet) {
      return (
        <StyledHeader>
          <Cell width="10%" onClick={() => expandAll(expand, rows)}>
            <Icon name="triangleRight" expand={this.state.categoryExpandAllClicked} />
          </Cell>
          <HeaderCell width="30%">CATEGORY</HeaderCell>
          <HeaderCell justifyContent="flex-end" width="20%">
            {translate("label.budget")}
          </HeaderCell>
          <HeaderCell justifyContent="flex-end" width="20%">
            {translate("label.balance")}
          </HeaderCell>
          <HeaderCell justifyContent="flex-end" width="20%">
            {translate("label.spent") + " %"}
          </HeaderCell>
        </StyledHeader>
      );
    }
    // DESKTOP
    else {
      let normalColumnPercentage = showPreviousActivityColumn ? "12.5%" : "14.5%";

      return (
        <StyledHeader>
          <Cell width="2.5%" onClick={() => expandAll(expand, rows)}>
            <Icon name="triangleRight" expand={this.state.categoryExpandAllClicked} />
          </Cell>
          <HeaderCell width={normalColumnPercentage}>CATEGORY</HeaderCell>
          <HeaderCell justifyContent="flex-end" width={normalColumnPercentage}>
            {translate("label.budget")}
          </HeaderCell>
          {showPreviousActivityColumn && (
            <HeaderCell justifyContent="flex-end" width={normalColumnPercentage}>
              <IconWrapper>
                <Tooltip
                  placement="bottom"
                  positionFixed={true}
                  showOnHover={false}
                  renderTooltip={() => {
                    return <PreviousColumnTooltip>{translate("text.budget.previous.info")}</PreviousColumnTooltip>;
                  }}
                >
                  <Icon name={"infoIcon"} fontFamily={"fontFamilyGideon"} fontSize={13} />
                </Tooltip>
              </IconWrapper>
              {translate("label.previous")}
            </HeaderCell>
          )}
          <HeaderCell justifyContent="flex-end" width={normalColumnPercentage}>
            {translate("label.income")}
          </HeaderCell>
          <HeaderCell justifyContent="flex-end" width={normalColumnPercentage}>
            {translate("label.expenses")}
          </HeaderCell>
          <HeaderCell justifyContent="flex-end" width={normalColumnPercentage}>
            {translate("label.transfers")}
          </HeaderCell>
          <HeaderCell justifyContent="flex-end" width={normalColumnPercentage}>
            {translate("label.balance")}
          </HeaderCell>
          <HeaderCell justifyContent="flex-end" width="10%">
            {translate("label.spent") + " %"}
          </HeaderCell>
        </StyledHeader>
      );
    }
  };

  /**
   * Return the JSX for a single row.
   *
   * @param row
   * @param index that row is relevant to the table and starting at zero
   * @param isLine (optional) indicates if the row is a child row (line) to a parent row.
   * @param expand callback (optional)
   * @param categoryIndent (optional) is applied to the indentation of the category
   * @param isMobile (optional)
   * @param isTablet (optional)
   * @param parentIndex (optional) is useful for determining the position in the table of the parent row
   * @param showPreviousActivityColumn shows the previous activity column
   *
   * @return row jsx
   */
  _renderRow = (
    row,
    index,
    isLine = false,
    expand,
    categoryIndent,
    isMobile = false,
    isTablet = false,
    parentIndex,
    showPreviousActivityColumn
  ) => {
    let expandCallback = (expand, row) => {
      if (expand && row) {
        expand(row.subcategoryId, "subcategoryId");
      }
    };

    const balance =
      row.budgetAssignedAmount + row.previousActivityAmount + row.incomeAmount + row.expenseAmount + row.transferAmount;
    row.percentSpent =
      row.budgetAssignedAmount === 0
        ? "-"
        : roundPercentSpent(((row.budgetAssignedAmount - balance) / row.budgetAssignedAmount) * 100);
    row.formattedPercent = row.percentSpent === "-" ? row.percentSpent : `${row.percentSpent}%`;

    const transactionDetailsUrlHooks = {
      orgId: this.props.unit.orgId,
      subcategoryId: row.subcategoryId,
      unitSubcategoryId: row.unitSubcategoryId,
      dateFrom: this.props.budgetSummary.variables.input.dateFrom,
      dateTo: this.props.budgetSummary.variables.input.dateTo,
      onlyNullUnitSubcategory: row.unitSubcategoryName !== null && row.unitSubcategoryId === null,
      dateType: this.state.dateTypeSelected
    };

    const transactionDetailsUrlHref = "/budget/transaction-details";
    const currencyCode = getCurrencyCode(this.props.unit.internalAccounts, row.internalAccountId);
    //This in needed for the universal search to pick up formatted data.
    row.formattedBudgetAssignedAmount = formatCurrencyWithSymbol(
      row.budgetAssignedAmount < 0 ? row.budgetAssignedAmount * -1 : row.budgetAssignedAmount,
      currencyCode
    );
    row.formattedBudgetAssignedAmount =
      row.budgetAssignedAmount < 0 ? `(${row.formattedBudgetAssignedAmount})` : row.formattedBudgetAssignedAmount;
    row.formattedPreviousActivityAmount = formatCurrencyWithSymbol(
      row.previousActivityAmount < 0 ? row.previousActivityAmount * -1 : row.previousActivityAmount,
      currencyCode
    );
    row.formattedPreviousActivityAmount =
      row.previousActivityAmount < 0 ? `(${row.formattedPreviousActivityAmount})` : row.formattedPreviousActivityAmount;
    row.formattedIncomeAmount = formatCurrencyWithSymbol(
      row.incomeAmount < 0 ? row.incomeAmount * -1 : row.incomeAmount,
      currencyCode
    );
    row.formattedIncomeAmount = row.incomeAmount < 0 ? `(${row.formattedIncomeAmount})` : row.formattedIncomeAmount;
    row.formattedExpenseAmount = formatCurrencyWithSymbol(
      row.expenseAmount < 0 ? row.expenseAmount * -1 : row.expenseAmount,
      currencyCode
    );
    row.formattedExpenseAmount = row.expenseAmount < 0 ? `(${row.formattedExpenseAmount})` : row.formattedExpenseAmount;
    row.formattedTransferAmount = formatCurrencyWithSymbol(
      row.transferAmount < 0 ? row.transferAmount * -1 : row.transferAmount,
      currencyCode
    );
    row.formattedTransferAmount =
      row.transferAmount < 0 ? `(${row.formattedTransferAmount})` : row.formattedTransferAmount;
    row.formattedBalance = formatCurrencyWithSymbol(balance < 0 ? balance * -1 : balance, currencyCode);
    row.formattedBalance = balance < 0 ? `(${row.formattedBalance})` : row.formattedBalance;

    if (isMobile) {
      return (
        <MobileRow
          balance={balance}
          expand={expand}
          expandCallback={expandCallback}
          row={row}
          index={index}
          parentIndex={parentIndex}
          key={`budget-overview-mobile-row-${index}`}
          transactionDetailsUrlHref={transactionDetailsUrlHref}
          transactionDetailsUrlHooks={transactionDetailsUrlHooks}
          currencyCode={currencyCode}
          isLine={isLine}
          categoryIndent={categoryIndent}
        />
      );
    } else if (isTablet) {
      return (
        <TabletRow
          balance={balance}
          expand={expand}
          expandCallback={expandCallback}
          row={row}
          index={index}
          parentIndex={parentIndex}
          key={`budget-overview-tablet-row-${index}`}
          transactionDetailsUrlHref={transactionDetailsUrlHref}
          transactionDetailsUrlHooks={transactionDetailsUrlHooks}
          currencyCode={currencyCode}
          isLine={isLine}
          categoryIndent={categoryIndent}
        />
      );
    } else {
      return (
        <DesktopRow
          key={`budget-overview-desktop-row-${index}`}
          balance={balance}
          expand={expand}
          expandCallback={expandCallback}
          row={row}
          index={index}
          parentIndex={parentIndex}
          transactionDetailsUrlHref={transactionDetailsUrlHref}
          transactionDetailsUrlHooks={transactionDetailsUrlHooks}
          currencyCode={currencyCode}
          isLine={isLine}
          categoryIndent={categoryIndent}
          showPreviousActivityColumn={showPreviousActivityColumn}
        />
      );
    }
  };

  _calcTotalBalance = rows => {
    let noUnitSubcategory = rows.filter(r => r.unitSubcategoryName === null);
    return noUnitSubcategory.length === 0
      ? rows.reduce(
          (total, r) =>
            total +
            r.budgetAssignedAmount +
            r.previousActivityAmount +
            r.incomeAmount +
            r.expenseAmount +
            r.transferAmount,
          0
        )
      : noUnitSubcategory.reduce(
          (total, r) =>
            total +
            r.budgetAssignedAmount +
            r.previousActivityAmount +
            r.incomeAmount +
            r.expenseAmount +
            r.transferAmount,
          0
        );
  };

  _calcTotalBudget = rows => {
    let noUnitSubcategory = rows.filter(r => r.unitSubcategoryName === null);
    return noUnitSubcategory.length === 0
      ? rows.reduce((total, r) => total + r.budgetAssignedAmount, 0)
      : noUnitSubcategory.reduce((total, r) => total + r.budgetAssignedAmount, 0);
  };

  _getBalanceWidgetTitle = filterPairs => {
    let title = "";
    let keys = Object.keys(filterPairs).filter(key => {
      return key !== "*";
    });
    // Take the last key from the filtered pairs (that should be the title).
    if (keys.length) {
      title = filterPairs[keys[keys.length - 1]].filterValue;
    }
    return title && title.length > 0 ? title : undefined;
  };

  _filterDropdownsOnly(rows, filterPairs) {
    rows = this._flatten(rows);
    if (rows) {
      return Object.keys(filterPairs).reduce((acc, key) => {
        let filterValue = filterPairs[key].filterValue;

        return acc.filter(item => {
          return item[key]
            ? (!item.lines || item.lines.length === 0) &&
                item[key]
                  .toString()
                  .toLowerCase()
                  .indexOf(filterValue.toString().toLowerCase()) > -1
            : true;
        });
      }, rows);
    }
    return rows;
  }

  // The clear param is the clear function from the table
  _clear = clear => {
    // Clear out the search text (use innerRef since this is a styled component):
    this.searchTextRef.current.value = "";
    // Clear Redux store
    this.props.dispatchClear();
    // Clear filters in table state
    clear();
    // Finally clear out the page state fields that are relevant
    this.setState({
      categoryExpandAllClicked: false,
      dateType: "",
      showCustomDate: false,
      showCustomResponsiveFilterBarDate: false
    });
  };

  _flatten = data => {
    let flattened = [];
    data.forEach(record => {
      if (record.lines && record.lines.length > 0) {
        record.lines.forEach(line => {
          flattened.push(line);
        });
      }
      flattened.push(record);
    });
    return flattened;
  };

  _onChangeSubcategory = (subcategoryName, rows, filter) => {
    this._updateFilterBarField({ subcategoryName });
    this._updateFilterBarField({ unitSubcategoryName: "" });
    filter(null, "unitSubcategoryName");
    let filterPairs = filter(subcategoryName, "subcategoryName");
    this._updateFilterBarField({ filterPairs });
    this._updateFilterBarField({ subcategoryId: rows.find(r => r.subcategoryName === subcategoryName).subcategoryId });
  };

  _onChangeUnitSubcategory = (unitSubcategoryName, rows, filter) => {
    if (unitSubcategoryName) {
      this._updateFilterBarField({ unitSubcategoryName });
    } else {
      this._updateFilterBarField({ unitSubcategoryName: "" });
    }
    let filterPairs = filter(unitSubcategoryName, "unitSubcategoryName");
    this._updateFilterBarField({ filterPairs });
    this._updateFilterBarField({
      unitSubcategoryId: rows.find(r => r.unitSubcategoryName === unitSubcategoryName).unitSubcategoryId
    });
  };

  _validateCustomDate = () => {
    let { year = null, fromMonth = null, toMonth = null } = this.props.budgetSummary;
    if (year && fromMonth && toMonth && Number(fromMonth) <= Number(toMonth)) {
      this._updateFilterBarField({ dateType: "custom" });
      this.setState({ customDateError: false });
    } else {
      this.setState({ customDateError: true });
    }
  };

  /**
   * This is for the filters count badge.
   */
  _renderFiltersBadge = () => {
    let {
      dateType = "label.current.year",
      filterPairs = [],
      subcategoryName = "",
      unitSubcategoryName = ""
    } = this.props.budgetSummary;

    let ResponsiveFilterBadgeContainer = styled.span`
      margin-bottom: 3px;
    `;

    let filterCount = 0;
    filterCount += filterPairs["*"] ? 1 : 0;
    filterCount += dateType !== "current" && dateType !== "label.current.year" ? 1 : 0;
    filterCount += Number(subcategoryName) !== 0 ? 1 : 0;
    filterCount += Number(unitSubcategoryName) !== 0 ? 1 : 0;
    if (filterCount > 0) {
      return (
        <ResponsiveFilterBadgeContainer>
          &nbsp;<Badge>{filterCount}</Badge>
        </ResponsiveFilterBadgeContainer>
      );
    }
  };

  render() {
    let today = new Date();

    let {
      dateType,
      filterPairs = {},
      fromMonth = "",
      searchText = "",
      subcategoryId = 0,
      subcategoryName = "",
      toMonth = "",
      unitSubcategoryName = "",
      unitSubcategoryId = 0,
      variables = {},
      year = ""
    } = this.props.budgetSummary;

    let { customDateError, showCustomDate, showCustomResponsiveFilterBarDate, showResponsiveFilterBar } = this.state;

    let dateTo = getDateFromGraphQLDateString(variables.input.dateTo);

    // Only show previous activity column if custom and fromMonth is not january
    let showPreviousActivityColumn = dateType === "custom" && variables.input.dateFrom.substring(5, 7) !== "01";
    let rptDateFrom = getDateFromGraphQLDateString(variables.input.dateFrom);
    let rptDateTo = getDateFromGraphQLDateString(variables.input.dateTo);

    return (
      <Page
        title={translate("label.budget")}
        renderPrintOptionsTooltip={() => {
          return (
            <PrintOptionsTooltip
              beginMonth={getTwoDigitMonth(rptDateFrom)}
              endMonth={getTwoDigitMonth(rptDateTo)}
              reportYear={rptDateTo.getFullYear()}
              orgId={this.props.unit.orgId}
              subcategoryId={subcategoryId}
              unitSubcategoryId={unitSubcategoryId}
            />
          );
        }}
      >
        <ConnectedQuery query={LCRF_BUDGET_SUMMARIES_QUERY} notifyOnNetworkStatusChange fetchPolicy={"network-only"}>
          {({ loading, data }) => {
            if (!data) {
              return <Spinner delay={0.5} />;
            }

            let { lcrfBudgetSummaries = [] } = data;

            let monthOptions = getMonthOptions();
            let flattenedLcrfBudget = unitSubcategoryName ? flatten(lcrfBudgetSummaries) : [];

            return loading ? (
              <Spinner delay={0.5} />
            ) : (
              <Table
                data={unitSubcategoryName && flattenedLcrfBudget.length > 0 ? flattenedLcrfBudget : lcrfBudgetSummaries}
                defaultSortType="string"
                defaultSortKey="sortOrder"
                defaultSortAsc={true}
                filterPairs={filterPairs}
              >
                {({ rows, sort, loading, filter, filterPairs, expand, isMobile, isTablet, clear }) => {
                  // category can either represent a subcategory or unit subcategory block
                  let category =
                    unitSubcategoryName && flattenedLcrfBudget.length > 0
                      ? flattenedLcrfBudget.filter(d => d.subcategoryName === subcategoryName)
                      : rows.find(d => d.subcategoryName === subcategoryName);

                  return (
                    <>
                      {isMobile || isTablet ? (
                        <>
                          <ResponsiveBalanceWidgetWrapper>
                            <BalanceWidget
                              date={dateTo > today.getTime() ? today : dateTo}
                              balance={this._calcTotalBalance(
                                this._filterDropdownsOnly(lcrfBudgetSummaries, filterPairs)
                              )}
                              assignedBudget={this._calcTotalBudget(
                                this._filterDropdownsOnly(lcrfBudgetSummaries, filterPairs)
                              )}
                              currencyCode={getCurrencyCodeFromData(this.props.unit.internalAccounts, data)}
                              title={this._getBalanceWidgetTitle(filterPairs)}
                            />
                          </ResponsiveBalanceWidgetWrapper>
                          {lcrfBudgetSummaries.length > 0 && (
                            <ResponsiveFilterBarHeader
                              onClick={() => {
                                this.setState({ showResponsiveFilterBar: !showResponsiveFilterBar });
                              }}
                            >
                              <Cell width="93%" wordWrap={false}>
                                <div style={{ paddingBottom: "2px" }}>
                                  {translate("label.filters")}&nbsp;{this._renderFiltersBadge()}
                                </div>
                              </Cell>
                              <Cell width="7%">
                                <Icon name="chevronDown" rotateDeg={180} expand={showResponsiveFilterBar} />
                              </Cell>
                            </ResponsiveFilterBarHeader>
                          )}
                          {showResponsiveFilterBar && lcrfBudgetSummaries.length > 0 && (
                            <>
                              <StyledResponsiveFilterBar>
                                <ResponsiveFilterBarSearchRow>
                                  <Cell width="100%">
                                    <ResponsiveFilterBarSearch
                                      innerRef={this.searchTextRef}
                                      onChange={e =>
                                        this._updateFilterBarField({
                                          searchText: e.currentTarget.value,
                                          filterPairs: filter(e.currentTarget.value)
                                        })
                                      }
                                      placeholder={translate("label.search")}
                                      type="text"
                                      value={searchText}
                                    />
                                  </Cell>
                                </ResponsiveFilterBarSearchRow>
                                <ResponsiveFilterBarRow>
                                  <Cell
                                    style={{ display: "flex" }}
                                    width="100%"
                                    key={`responsive-dropdown-filter-subcategory`}
                                  >
                                    <ResponsiveFilterBarDropdownWrapper style={{ flex: "1" }}>
                                      <Dropdown
                                        placeholder="label.all.categories"
                                        onChange={subcategoryName => {
                                          this._onChangeSubcategory(subcategoryName, lcrfBudgetSummaries, filter);
                                        }}
                                        value={subcategoryName}
                                        data={extractFilterOptions(lcrfBudgetSummaries, "subcategoryName", "sortOrder")}
                                      />
                                    </ResponsiveFilterBarDropdownWrapper>
                                    {/*If we're dealing with the unit subcategory then the data is already flattened (no lines). See the data prop for unit subcategories.*/}
                                    {((category && category.lines && category.lines.length > 0) ||
                                      unitSubcategoryName) && (
                                      <ResponsiveFilterBarDropdownWrapper style={{ flex: "1", marginLeft: "10px" }}>
                                        <Dropdown
                                          placeholder="label.all.unit.cats"
                                          onChange={unitSubcategoryName => {
                                            this._onChangeUnitSubcategory(
                                              unitSubcategoryName,
                                              flattenedLcrfBudget.length > 0
                                                ? flattenedLcrfBudget
                                                : flatten(lcrfBudgetSummaries),
                                              filter
                                            );
                                          }}
                                          data={
                                            unitSubcategoryName
                                              ? extractFlattenedFilterOptions(category, "unitSubcategoryName")
                                              : extractFilterOptions(category.lines, "unitSubcategoryName")
                                          }
                                          value={unitSubcategoryName}
                                        />
                                      </ResponsiveFilterBarDropdownWrapper>
                                    )}
                                  </Cell>
                                </ResponsiveFilterBarRow>
                                <ResponsiveFilterBarRowBorder />
                                <ResponsiveFilterBarDatePickerRow>
                                  <Cell style={{ display: "flex" }} width="100%">
                                    <ResponsiveFilterBarDropdownWrapper style={{ flex: "1" }}>
                                      <Dropdown
                                        active={this.state.dateTypeSelected}
                                        data={datePickerDropdownOptions}
                                        excludePlaceholder={true}
                                        onChange={dateType => {
                                          this.setState({ dateTypeSelected: dateType });
                                          if (dateType !== "label.custom.date" && showCustomResponsiveFilterBarDate) {
                                            this.setState({ showCustomDate: false });
                                          }

                                          // Date type fields require updated variables for GraphQL:
                                          switch (dateType) {
                                            case "label.previous.year":
                                              this._updateFilterBarField({ dateType: "previous" });
                                              this.setState({ showCustomResponsiveFilterBarDate: false });
                                              break;
                                            case "label.custom.date":
                                              /**
                                               * No need to update the filter bar field for custom (here) since that
                                               * triggers the application of the custom date. Only call that after the
                                               * Apply custom date button is selected.
                                               */
                                              this.setState({ showCustomResponsiveFilterBarDate: true });
                                              break;
                                            case "label.current.year":
                                            default:
                                              this._updateFilterBarField({ dateType: "current" });
                                              this.setState({ showCustomResponsiveFilterBarDate: false });
                                          }
                                        }}
                                        value={getDateTypeLabel(dateType)}
                                      />
                                    </ResponsiveFilterBarDropdownWrapper>
                                    {this.state.showCustomResponsiveFilterBarDate && (
                                      <ResponsiveFilterBarDropdownWrapper style={{ flex: "1", marginLeft: "10px" }}>
                                        <Dropdown
                                          placeholder="label.year"
                                          data={retentionYearsOptions(this.props.internalAccount.retentionYears)}
                                          onChange={year => this._updateFilterBarField({ year })}
                                          value={year}
                                        />
                                      </ResponsiveFilterBarDropdownWrapper>
                                    )}
                                  </Cell>
                                </ResponsiveFilterBarDatePickerRow>
                                {/*Need another row for the from month and to month (designs are a bit wonky):*/}
                                {this.state.showCustomResponsiveFilterBarDate && (
                                  <ResponsiveFilterBarDatePickerRow>
                                    <Cell style={{ display: "flex" }} width="100%">
                                      <ResponsiveFilterBarDropdownWrapper style={{ flex: "1" }}>
                                        <Dropdown
                                          placeholder="label.from.month"
                                          data={monthOptions}
                                          onChange={fromMonth => {
                                            this._updateFilterBarField({ fromMonth: fromMonth });
                                          }}
                                          value={fromMonth}
                                        />
                                      </ResponsiveFilterBarDropdownWrapper>
                                      <ResponsiveFilterBarDropdownWrapper style={{ flex: "1", marginLeft: "10px" }}>
                                        <Dropdown
                                          placeholder="label.to.month"
                                          data={monthOptions}
                                          onChange={toMonth => {
                                            this._updateFilterBarField({ toMonth: toMonth });
                                          }}
                                          value={toMonth}
                                        />
                                      </ResponsiveFilterBarDropdownWrapper>
                                    </Cell>
                                  </ResponsiveFilterBarDatePickerRow>
                                )}
                                <ResponsiveFilterBarButtonsRow>
                                  <Apply onClick={() => this._validateCustomDate()} />
                                  <ResponsiveFilterBarClear onClick={() => this._clear(clear)} />
                                </ResponsiveFilterBarButtonsRow>
                                <Banner
                                  type="error"
                                  title={translate("label.error")}
                                  show={customDateError}
                                  dismissible={false}
                                >
                                  {translate("label.invalid.date")}
                                </Banner>
                              </StyledResponsiveFilterBar>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <BalanceWidget
                            date={dateTo > today.getTime() ? today : dateTo}
                            balance={this._calcTotalBalance(
                              this._filterDropdownsOnly(lcrfBudgetSummaries, filterPairs)
                            )}
                            assignedBudget={this._calcTotalBudget(
                              this._filterDropdownsOnly(lcrfBudgetSummaries, filterPairs)
                            )}
                            currencyCode={getCurrencyCodeFromData(
                              this.props.unit.internalAccounts,
                              lcrfBudgetSummaries
                            )}
                            title={this._getBalanceWidgetTitle(filterPairs)}
                          />
                          <>
                            <FilterBar>
                              <Search
                                innerRef={this.searchTextRef}
                                onChange={e => {
                                  this._updateFilterBarField({
                                    searchText: e.currentTarget.value,
                                    filterPairs: filter(e.currentTarget.value)
                                  });
                                }}
                                placeholder={translate("label.search")}
                                value={searchText}
                              />
                              <DateButtons
                                active={this.state.dateTypeSelected}
                                onClick={dateType => {
                                  this.setState({ dateTypeSelected: dateType });
                                  if (dateType === "custom") {
                                    this.setState({ showCustomDate: true });
                                  } else {
                                    this.setState({ showCustomDate: false });
                                    this._updateFilterBarField({ dateType });
                                  }
                                }}
                              />
                              <Dropdown
                                placeholder="label.all.categories"
                                onChange={subcategoryName => {
                                  this._onChangeSubcategory(subcategoryName, lcrfBudgetSummaries, filter);
                                }}
                                data={extractFilterOptions(lcrfBudgetSummaries, "subcategoryName", "sortOrder")}
                                value={subcategoryName}
                              />
                              {/*If we're dealing with the unit subcategory then the data is already flattened (no lines). See the data prop for unit subcategories.*/}
                              {((category && category.lines && category.lines.length > 0) || unitSubcategoryName) && (
                                <Dropdown
                                  placeholder="label.all.unit.cats"
                                  onChange={unitSubcategoryName => {
                                    this._onChangeUnitSubcategory(
                                      unitSubcategoryName,
                                      flattenedLcrfBudget.length > 0
                                        ? flattenedLcrfBudget
                                        : flatten(lcrfBudgetSummaries),
                                      filter
                                    );
                                  }}
                                  data={
                                    unitSubcategoryName
                                      ? extractFlattenedFilterOptions(category, "unitSubcategoryName")
                                      : extractFilterOptions(category.lines, "unitSubcategoryName")
                                  }
                                  value={unitSubcategoryName}
                                />
                              )}
                              <Clear onClick={() => this._clear(clear)} />
                            </FilterBar>
                            {/*Custom date picker*/}
                            {showCustomDate && (
                              <>
                                <DatePicker>
                                  <Dropdown
                                    placeholder="label.year"
                                    data={retentionYearsOptions(this.props.internalAccount.retentionYears)}
                                    onChange={year => this._updateFilterBarField({ year })}
                                    value={year}
                                  />
                                  <Dropdown
                                    placeholder="label.from.month"
                                    data={monthOptions}
                                    onChange={fromMonth => {
                                      this._updateFilterBarField({ fromMonth });
                                    }}
                                    value={fromMonth}
                                  />
                                  <Dropdown
                                    placeholder="label.to.month"
                                    data={monthOptions}
                                    onChange={toMonth => {
                                      this._updateFilterBarField({ toMonth });
                                    }}
                                    value={toMonth}
                                  />
                                  <Apply
                                    disabled={false}
                                    onClick={() => {
                                      this._validateCustomDate();
                                    }}
                                    size="small"
                                  />
                                </DatePicker>
                                <Banner
                                  type="error"
                                  title={translate("label.error")}
                                  show={customDateError}
                                  dismissible={false}
                                >
                                  {translate("label.invalid.date")}
                                </Banner>
                              </>
                            )}
                          </>
                        </>
                      )}
                      {this._renderHeaders(expand, lcrfBudgetSummaries, isMobile, isTablet, showPreviousActivityColumn)}

                      {rows.length > 0 ? (
                        rows.map((r, index) => {
                          return (
                            <React.Fragment key={`${index}`}>
                              {/* Main non-header row (parent): */}
                              {this._renderRow(
                                r,
                                index,
                                false,
                                expand,
                                null,
                                isMobile,
                                isTablet,
                                null,
                                showPreviousActivityColumn
                              )}
                              {/* Expanded non-header line (child) row(s) if any: */}
                              {r.expand &&
                                r.lines &&
                                r.lines.length > 0 &&
                                r.lines.map((l, i) => {
                                  return this._renderRow(
                                    l,
                                    i,
                                    true,
                                    false,
                                    "20px",
                                    isMobile,
                                    isTablet,
                                    index,
                                    showPreviousActivityColumn
                                  );
                                })}
                            </React.Fragment>
                          );
                        })
                      ) : (
                        <React.Fragment>{translate("text.no.results.for.search")}</React.Fragment>
                      )}
                    </>
                  );
                }}
              </Table>
            );
          }}
        </ConnectedQuery>
      </Page>
    );
  }
}

// The second argument is this.props (if any) so destructuring is applied to that.
function mapDispatchToProps(dispatch) {
  return {
    dispatchUpdateFilterField(field) {
      dispatch(updateFilterField(field));
    },
    dispatchClear() {
      dispatch(clear());
    }
  };
}

function mapStateToProps(state) {
  return {
    budgetSummary: state.budgetSummary,
    unit: state.security.unit,
    internalAccount: state.security.internalAccount
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetSummary);

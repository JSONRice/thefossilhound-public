import React, { Component, Fragment } from "react";
import Page from "../../../components/Page/Page";
import { translate } from "../../../utils/translate";
import { Cell, Table } from "../../../components/Table";
import {
  DesktopHeader,
  DesktopRow,
  MobileHeader,
  MobileRow
} from "../../../components/Budget/BudgetTransactionDetails";
import {
  Apply,
  Clear,
  DateButtons,
  DatePicker,
  FilterBar,
  ResponsiveFilterBarDropdownWrapper,
  Search
} from "../../../components/Filter";
import {
  getDateFromGraphQLDateString,
  getGraphQLDate,
  getMonthOptions,
  getTwoDigitMonth
} from "../../../services/date-formatter-service";
import { transactionTypeTranslationLabel } from "../../../utils/constants";
import { lcrfBudgetDetails } from "../../../queries/lcrfBudgetDetails";
import { lcrfBudgetBalance } from "../../../queries/lcrfBudgetBalance";
import { Query } from "react-apollo";
import Spinner from "../../../components/Spinner/Spinner";
import TotalRow from "../../../components/TotalRow/TotalRow";
import { getCurrencyCode, getCurrencyCodeFromData } from "../../../services/security-service";
import BalanceWidget from "../../../components/BalanceWidget/BalanceWidget";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import styled from "styled-components";
import { extractFilterOptions } from "../../../utils/filter-utils";
import { Dropdown } from "../../../components/Dropdown/index";
import {
  applyCustomDateSubmitted,
  currentYearClicked,
  datePickerDropdownOptions,
  getDateTypeLabel,
  previousYearClicked,
  retentionYearsOptions
} from "../../../utils/budget-utils";
import { Icon } from "../../../components/Icon";
import Banner from "../../../components/Banner/Banner";
import { PrintOptionsTooltip } from "../../../components/Budget";
import { Badge } from "../../../components/Badge";
import { formatDate, formatCurrencyWithSymbol } from "../../../utils/formatters";

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
    color: transparent;
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

const ResponsiveBalanceWidgetWrapper = styled.div`
  padding-left: 8px;
`;

class BudgetTransactionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = this._getInitialState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.unit.orgId !== this.props.unit.orgId) {
      this._updateVariables({ input: { orgId: this.props.unit.orgId } });
    }
  }

  /**
   * This utility function is useful for setting initial state as well as resetting state.
   *
   * @returns initial state
   * @private
   */
  _getInitialState = () => {
    let currentYear = new Date().getFullYear();
    let currentYearFromDate = new Date(currentYear - 1, 0, 1);
    let currentYearToDate = new Date(currentYear, 0, 1);

    let {
      router: {
        query: { dateFrom, dateTo, orgId, subcategoryId, unitSubcategoryId, onlyNullUnitSubcategory, dateType }
      }
    } = this.props;

    this.searchTextRef = React.createRef();

    const defaultDateType = dateType || "current";

    const initialState = {
      classificationType: "",
      dateType: defaultDateType,
      dateTypeSelected: defaultDateType,
      filterPairs: {},
      fromMonth: "",
      searchText: "",
      showCustomDate: false,
      showCustomResponsiveFilterBar: false,
      showCustomResponsiveFilterBarDate: false,
      toMonth: "",
      unitSubcategoryName: "",
      variables: {
        input: {
          orgId,
          subcategoryId,
          unitSubcategoryId: unitSubcategoryId !== "null" ? unitSubcategoryId : undefined,
          dateFrom: dateFrom || getGraphQLDate(currentYearFromDate),
          dateTo: dateTo || getGraphQLDate(currentYearToDate),
          onlyNullUnitSubcategory
        }
      },
      balanceVariables: {
        input: {
          orgId,
          subcategoryId,
          unitSubcategoryId: unitSubcategoryId !== "null" ? unitSubcategoryId : undefined,
          dateFrom: dateFrom || getGraphQLDate(currentYearFromDate),
          dateTo: dateTo || getGraphQLDate(currentYearToDate),
          onlyNullUnitSubcategory
        }
      },
      year: "",
      customDateError: false,
      unitSubactegoryIdsByName: {}
    };

    return initialState;
  };

  // The clear param is the clear function from the table
  _clear = clear => {
    // Clear out the search text (use innerRef since this is a styled component):
    this.searchTextRef.current.value = "";
    // Clear filters in table state
    clear();
    // Finally reset component state
    this.setState(this._getInitialState());
  };

  _formatData = data => {
    let currencyCode = getCurrencyCodeFromData(this.props.unit.internalAccounts, data);
    data.map(row => {
      if (transactionTypeTranslationLabel[row.classificationType]) {
        row.classificationType = translate(transactionTypeTranslationLabel[row.classificationType]);
      }
      row.formatedPostedDate = formatDate(row.postedDate);
      row.formatedAmount = formatCurrencyWithSymbol(row.amount < 0 ? row.amount * -1 : row.amount, currencyCode);
      row.formatedAmount = row.amount < 0 ? `(${row.formattedAmount})` : row.formattedAmount;
    });
    return data;
  };

  _getTotal = data => {
    return data.reduce((total, curr) => total + curr.amount, 0);
  };

  _updateVariables = newVariables => {
    let { router } = this.props;
    let { variables } = this.state;
    newVariables.input = { ...variables.input, ...newVariables.input };
    this.setState({ variables: newVariables });
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        orgId: newVariables.input.orgId,
        dateFrom: newVariables.input.dateFrom,
        dateTo: newVariables.input.dateTo
      }
    });
    this._updateBalanceVariables(newVariables);
  };

  _updateBalanceVariables = newVariables => {
    let { balanceVariables } = this.state;
    newVariables.input = { ...balanceVariables.input, ...newVariables.input };
    this.setState({ balanceVariables: newVariables });
  };

  _validateCustomDate = () => {
    let { year = null, fromMonth = null, toMonth = null } = this.state;
    if (year && fromMonth && toMonth && fromMonth <= toMonth) {
      this._updateVariables(applyCustomDateSubmitted(this.state));
      this.setState({ customDateError: false });
    } else {
      this.setState({ customDateError: true });
    }
  };

  /**
   * This is for the filters count badge.
   */
  _renderFiltersBadge = () => {
    let { classificationType = "", dateTypeSelected = "", searchText = "", unitSubcategoryName = "" } = this.state;

    let ResponsiveFilterBadgeContainer = styled.span`
      margin-bottom: 3px;
    `;

    let filterCount = 0;
    filterCount +=
      classificationType &&
      classificationType.toLowerCase() !== "type" &&
      classificationType.toLowerCase() !== "label.type"
        ? 1
        : 0;
    filterCount += searchText.length > 0 ? 1 : 0;
    filterCount += dateTypeSelected !== "current" && dateTypeSelected !== "label.current.year" ? 1 : 0;
    filterCount += Number(unitSubcategoryName) !== 0 ? 1 : 0;
    if (filterCount > 0) {
      return (
        <ResponsiveFilterBadgeContainer>
          &nbsp;<Badge>{filterCount}</Badge>
        </ResponsiveFilterBadgeContainer>
      );
    }
  };

  _getUnitSubactegoryIdsByName = data => {
    return data.reduce((acc, curr) => {
      if (!acc[curr["unitSubcategoryName"]]) {
        acc[curr["unitSubcategoryName"]] = curr["unitSubcategoryId"];
      }
      return acc;
    }, {});
  };

  render() {
    let {
      classificationType = "",
      customDateError,
      dateType,
      dateTypeSelected,
      filterPairs = {},
      fromMonth = "",
      searchText = "",
      showCustomResponsiveFilterBar,
      showCustomResponsiveFilterBarDate,
      toMonth = "",
      unitSubcategoryName = "",
      variables,
      year = "",
      balanceVariables
    } = this.state;
    let today = new Date();
    let dateTo = getDateFromGraphQLDateString(variables.input.dateTo);
    let { router } = this.props;
    return (
      <Page
        title={translate("label.budget.details")}
        renderPrintOptionsTooltip={() => {
          let rptDateFrom = getDateFromGraphQLDateString(variables.input.dateFrom);
          let rptDateTo = getDateFromGraphQLDateString(variables.input.dateTo);

          return (
            <PrintOptionsTooltip
              beginMonth={getTwoDigitMonth(rptDateFrom)}
              endMonth={getTwoDigitMonth(rptDateTo)}
              reportYear={rptDateTo.getFullYear()}
              orgId={this.props.unit.orgId}
              subcategoryId={variables.input.subcategoryId}
              unitSubcategoryId={variables.input.unitSubcategoryId}
            />
          );
        }}
      >
        <Query query={lcrfBudgetDetails} variables={variables} notifyOnNetworkStatusChange fetchPolicy={"no-cache"}>
          {({ loading, data }) => {
            let { lcrfBudgetDetails = [] } = data;

            let monthOptions = getMonthOptions();

            return loading ? (
              <Spinner delay={0.5} />
            ) : (
              <Table
                data={this._formatData(lcrfBudgetDetails)}
                defaultSortType="string"
                defaultSortKey="sortOrder"
                defaultSortAsc={true}
                filterPairs={filterPairs}
              >
                {({ rows, sort, loading, filter, expand, isMobile, isTablet, clear }) => {
                  let unitSubactegoryIdsByName = this._getUnitSubactegoryIdsByName(lcrfBudgetDetails);
                  return (
                    <Fragment>
                      {isMobile ? (
                        <>
                          <ResponsiveBalanceWidgetWrapper>
                            <Query
                              query={lcrfBudgetBalance}
                              variables={balanceVariables}
                              notifyOnNetworkStatusChange
                              fetchPolicy={"no-cache"}
                            >
                              {({ loading, data }) => {
                                let { lcrfBudgetBalance = {} } = data;
                                return (
                                  !loading &&
                                  data && (
                                    <BalanceWidget
                                      date={dateTo > today.getTime() ? today : dateTo}
                                      balance={lcrfBudgetBalance.balance}
                                      assignedBudget={lcrfBudgetBalance.assignedBudget}
                                      currencyCode={getCurrencyCode(
                                        this.props.unit.internalAccounts,
                                        lcrfBudgetBalance.internalAccountId
                                      )}
                                      title={lcrfBudgetBalance.name}
                                    />
                                  )
                                );
                              }}
                            </Query>
                          </ResponsiveBalanceWidgetWrapper>
                          {lcrfBudgetDetails.length > 0 && (
                            <ResponsiveFilterBarHeader
                              onClick={() => {
                                this.setState({ showCustomResponsiveFilterBar: !showCustomResponsiveFilterBar });
                              }}
                            >
                              <Cell width="93%" wordWrap={false}>
                                <div style={{ paddingBottom: "2px" }}>
                                  {translate("label.filters")}&nbsp;{this._renderFiltersBadge()}
                                </div>
                              </Cell>
                              <Cell width="7%">
                                <Icon name="chevronDown" rotateDeg={180} expand={showCustomResponsiveFilterBar} />
                              </Cell>
                            </ResponsiveFilterBarHeader>
                          )}
                          {showCustomResponsiveFilterBar && lcrfBudgetDetails.length > 0 && (
                            <>
                              <StyledResponsiveFilterBar>
                                <ResponsiveFilterBarSearchRow>
                                  <Cell width="100%">
                                    <ResponsiveFilterBarSearch
                                      innerRef={this.searchTextRef}
                                      onChange={e => {
                                        this.setState({
                                          filterPairs: filter(e.currentTarget.value),
                                          searchText: e.currentTarget.value
                                        });
                                      }}
                                      placeholder={translate("label.search")}
                                      type="text"
                                      value={searchText}
                                    />
                                  </Cell>
                                </ResponsiveFilterBarSearchRow>
                                <ResponsiveFilterBarRow>
                                  <Cell width="100%%" key={`responsive-dropdown-filter-unit-subcategory-and-type`}>
                                    <ResponsiveFilterBarDropdownWrapper style={{ flex: "1" }}>
                                      <Dropdown
                                        placeholder="label.all.unit.cats"
                                        onChange={unitSubcategoryName => {
                                          let unitSubcategoryId = unitSubactegoryIdsByName[unitSubcategoryName];
                                          if (!unitSubcategoryId) {
                                            unitSubcategoryId = undefined;
                                          }
                                          let onlyNullUnitSubcategory =
                                            unitSubcategoryId === undefined && unitSubcategoryName !== "";
                                          this._updateBalanceVariables({
                                            input: { unitSubcategoryId, onlyNullUnitSubcategory }
                                          });
                                          this.setState({
                                            unitSubcategoryName,
                                            filterPairs: filter(unitSubcategoryName, "unitSubcategoryName")
                                          });
                                        }}
                                        data={extractFilterOptions(lcrfBudgetDetails, "unitSubcategoryName")}
                                        value={unitSubcategoryName}
                                      />
                                    </ResponsiveFilterBarDropdownWrapper>
                                    <ResponsiveFilterBarDropdownWrapper style={{ flex: "1", marginLeft: "10px" }}>
                                      <Dropdown
                                        placeholder="label.type"
                                        onChange={classificationType => {
                                          this.setState({
                                            classificationType,
                                            filterPairs: filter(classificationType, "classificationType")
                                          });
                                        }}
                                        data={extractFilterOptions(lcrfBudgetDetails, "classificationType")}
                                        value={classificationType}
                                      />
                                    </ResponsiveFilterBarDropdownWrapper>
                                  </Cell>
                                </ResponsiveFilterBarRow>
                                <ResponsiveFilterBarRowBorder />
                                <ResponsiveFilterBarDatePickerRow>
                                  <Cell width="100%">
                                    <ResponsiveFilterBarDropdownWrapper style={{ flex: "1" }}>
                                      <Dropdown
                                        active={dateTypeSelected}
                                        data={datePickerDropdownOptions}
                                        excludePlaceholder={true}
                                        onChange={dateType => {
                                          this.setState({ dateTypeSelected: dateType });
                                          router.push({
                                            pathname: router.pathname,
                                            query: {
                                              ...router.query,
                                              dateType: dateType
                                            }
                                          });
                                          if (dateType !== "label.custom.date" && showCustomResponsiveFilterBarDate) {
                                            this.setState({ showCustomDate: false });
                                          }

                                          // Date type fields require updated variables for GraphQL:
                                          switch (dateType) {
                                            case "label.previous.year":
                                              this._updateVariables(previousYearClicked());
                                              this.setState({
                                                dateType: "previous",
                                                showCustomResponsiveFilterBarDate: false
                                              });
                                              break;
                                            case "label.custom.date":
                                              this.setState({
                                                dateType: "custom",
                                                showCustomResponsiveFilterBarDate: true
                                              });
                                              break;
                                            case "label.current.year":
                                            default:
                                              this._updateVariables(currentYearClicked());
                                              this.setState({
                                                dateType: "current",
                                                showCustomResponsiveFilterBarDate: false
                                              });
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
                                          onChange={year => {
                                            this.setState({ year });
                                          }}
                                          value={year}
                                        />
                                      </ResponsiveFilterBarDropdownWrapper>
                                    )}
                                  </Cell>
                                </ResponsiveFilterBarDatePickerRow>
                                {/*Need another row for the from month and to month (designs are a bit wonky):*/}
                                {this.state.showCustomResponsiveFilterBarDate && (
                                  <ResponsiveFilterBarDatePickerRow>
                                    <Cell width="100%">
                                      <ResponsiveFilterBarDropdownWrapper style={{ flex: "1" }}>
                                        <Dropdown
                                          placeholder="label.from.month"
                                          data={monthOptions}
                                          onChange={fromMonth => {
                                            this.setState({ fromMonth });
                                          }}
                                          value={fromMonth}
                                        />
                                      </ResponsiveFilterBarDropdownWrapper>
                                      <ResponsiveFilterBarDropdownWrapper style={{ flex: "1", marginLeft: "10px" }}>
                                        <Dropdown
                                          placeholder="label.to.month"
                                          data={monthOptions}
                                          onChange={toMonth => {
                                            this.setState({ toMonth });
                                          }}
                                          value={toMonth}
                                        />
                                      </ResponsiveFilterBarDropdownWrapper>
                                    </Cell>
                                  </ResponsiveFilterBarDatePickerRow>
                                )}
                                <ResponsiveFilterBarButtonsRow>
                                  {dateType === "custom" && (
                                    <Apply
                                      onClick={() => {
                                        this._validateCustomDate();
                                      }}
                                    />
                                  )}
                                  <ResponsiveFilterBarClear
                                    onClick={() => {
                                      this._clear(clear);
                                    }}
                                  />
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
                          <MobileHeader />
                          {rows.length > 0 ? (
                            rows.map((row, index) => {
                              return (
                                <MobileRow row={row} index={index} key={`transaction-details-mobile-key-${index}`} />
                              );
                            })
                          ) : (
                            <React.Fragment>{translate("text.no.results.for.search")}</React.Fragment>
                          )}
                        </>
                      ) : (
                        <>
                          <Query
                            query={lcrfBudgetBalance}
                            variables={balanceVariables}
                            notifyOnNetworkStatusChange
                            fetchPolicy={"no-cache"}
                          >
                            {({ loading, data }) => {
                              let { lcrfBudgetBalance = {} } = data;
                              return (
                                !loading &&
                                data && (
                                  <BalanceWidget
                                    date={dateTo > today.getTime() ? today : dateTo}
                                    balance={lcrfBudgetBalance.balance}
                                    assignedBudget={lcrfBudgetBalance.assignedBudget}
                                    currencyCode={getCurrencyCode(
                                      this.props.unit.internalAccounts,
                                      lcrfBudgetBalance.internalAccountId
                                    )}
                                    title={lcrfBudgetBalance.name}
                                  />
                                )
                              );
                            }}
                          </Query>

                          <>
                            <FilterBar>
                              <Search
                                innerRef={this.searchTextRef}
                                onChange={e => {
                                  this.setState({
                                    filterPairs: filter(e.currentTarget.value),
                                    searchText: e.currentTarget.value
                                  });
                                }}
                                placeholder={translate("label.search")}
                                value={searchText}
                              />
                              <DateButtons
                                active={this.state.dateTypeSelected}
                                onClick={dateType => {
                                  this.setState({ dateTypeSelected: dateType });
                                  router.push({
                                    pathname: router.pathname,
                                    query: {
                                      ...router.query,
                                      dateType: dateType
                                    }
                                  });
                                  if (dateType === "custom") {
                                    this.setState({ showCustomDate: true });
                                  } else {
                                    this.setState({ dateType, showCustomDate: false });
                                  }

                                  // Date type fields require updated variables for GraphQL:
                                  switch (dateType) {
                                    case "previous":
                                      this._updateVariables(previousYearClicked());
                                      break;
                                    case "custom":
                                      this.state.showCustomDate
                                        ? this._updateVariables(applyCustomDateSubmitted(state))
                                        : this.setState({
                                            showCustomDate: true
                                          });
                                      break;
                                    case "current":
                                    default:
                                      this._updateVariables(currentYearClicked());
                                  }
                                }}
                              />
                              <Dropdown
                                placeholder="label.all.unit.cats"
                                onChange={unitSubcategoryName => {
                                  let unitSubcategoryId = unitSubactegoryIdsByName[unitSubcategoryName];
                                  if (!unitSubcategoryId) {
                                    unitSubcategoryId = undefined;
                                  }
                                  let onlyNullUnitSubcategory =
                                    unitSubcategoryId === undefined && unitSubcategoryName !== "";
                                  this._updateBalanceVariables({
                                    input: { unitSubcategoryId, onlyNullUnitSubcategory }
                                  });
                                  this.setState({
                                    unitSubcategoryName,
                                    filterPairs: filter(unitSubcategoryName, "unitSubcategoryName")
                                  });
                                }}
                                data={extractFilterOptions(lcrfBudgetDetails, "unitSubcategoryName")}
                                value={unitSubcategoryName}
                              />
                              <Dropdown
                                placeholder="label.type"
                                onChange={classificationType => {
                                  this.setState({
                                    classificationType,
                                    filterPairs: filter(classificationType, "classificationType")
                                  });
                                }}
                                data={extractFilterOptions(lcrfBudgetDetails, "classificationType")}
                                value={classificationType}
                              />
                              <Clear onClick={() => this._clear(clear)} />
                            </FilterBar>
                            {/*Custom date picker*/}
                            {this.state.showCustomDate && (
                              <>
                                <DatePicker>
                                  <Dropdown
                                    placeholder="label.year"
                                    data={retentionYearsOptions(this.props.internalAccount.retentionYears)}
                                    onChange={year => this.setState({ year })}
                                    value={year}
                                  />
                                  <Dropdown
                                    placeholder="label.from.month"
                                    data={monthOptions}
                                    onChange={fromMonth => this.setState({ fromMonth })}
                                    value={fromMonth}
                                  />
                                  <Dropdown
                                    placeholder="label.to.month"
                                    data={monthOptions}
                                    onChange={toMonth => this.setState({ toMonth })}
                                    value={toMonth}
                                  />
                                  <Apply
                                    onClick={() => {
                                      this.setState({ dateType: "custom" });
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
                          <DesktopHeader />
                          {rows.length > 0 ? (
                            rows.map((row, index) => {
                              return (
                                <DesktopRow
                                  row={row}
                                  index={index}
                                  currencyCode={getCurrencyCodeFromData(
                                    this.props.unit.internalAccounts,
                                    lcrfBudgetDetails
                                  )}
                                  key={`transaction-details-key-${index}`}
                                />
                              );
                            })
                          ) : (
                            <React.Fragment>{translate("text.no.results.for.search")}</React.Fragment>
                          )}
                          <TotalRow
                            total={this._getTotal(rows)}
                            currencyCode={getCurrencyCodeFromData(this.props.unit.internalAccounts, lcrfBudgetDetails)}
                          />
                        </>
                      )}
                    </Fragment>
                  );
                }}
              </Table>
            );
          }}
        </Query>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    unit: state.security.unit,
    internalAccount: state.security.internalAccount
  };
}

export default connect(mapStateToProps)(withRouter(BudgetTransactionDetails));

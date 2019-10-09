import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import { Clear, DateButtons, FilterBar, Search } from "./";
import { Dropdown } from "../Dropdown";
import more_story_data from "../../components/Dropdown/more_story_data";
import styled from "styled-components";
import { extractFilterOptions, extractFlattenedFilterOptions } from "../../utils/filter-utils";
import { Cell, Header, HeaderCell, Table } from "../Table";
import { roundPercentSpent } from "../../utils/formatters";
import { DesktopRow, MobileRow, TabletRow } from "../Budget/BudgetSummary";
import { Icon } from "../Icon";
import { flatten } from "../../utils/filter-utils";

const Container = styled.div`
  padding: 20px;
`;

const SubcategoryDropdownWrapper = styled.div`
  display: inline;
  margin-right: 10px;
`;

let StyledHeader = styled(Header)`
  padding: 10px;
`;

const IconWrapper = styled.div`
  margin-right: 5px;
`;

class StoryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.searchTextRef = React.createRef();
    this.state = {
      subcategory: {},
      subcategoryName: "",
      unitSubcatgoryName: "",
      flattenedData: []
    };
  }

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
    parentIndex
  ) => {
    let expandCallback = (expand, row) => {
      if (expand && row) {
        expand(row.subcategoryId, "subcategoryId");
      }
    };

    const balance =
      row.budgetAssignedAmount + row.previousActivityAmount + row.incomeAmount + row.expenseAmount + row.transferAmount;
    const percentSpent =
      row.budgetAssignedAmount === 0
        ? "-"
        : roundPercentSpent(((row.budgetAssignedAmount - balance) / row.budgetAssignedAmount) * 100);

    if (isMobile) {
      return (
        <MobileRow
          percentSpent={percentSpent}
          balance={balance}
          expand={expand}
          expandCallback={expandCallback}
          row={row}
          index={index}
          parentIndex={parentIndex}
          key={`budget-overview-mobile-row-${index}`}
          isLine={isLine}
          categoryIndent={categoryIndent}
        />
      );
    } else if (isTablet) {
      return (
        <TabletRow
          percentSpent={percentSpent}
          balance={balance}
          expand={expand}
          expandCallback={expandCallback}
          row={row}
          index={index}
          parentIndex={parentIndex}
          key={`budget-overview-tablet-row-${index}`}
          isLine={isLine}
          categoryIndent={categoryIndent}
        />
      );
    } else {
      return (
        <DesktopRow
          percentSpent={percentSpent}
          key={`budget-overview-desktop-row-${index}`}
          balance={balance}
          expand={expand}
          expandCallback={expandCallback}
          row={row}
          index={index}
          parentIndex={parentIndex}
          isLine={isLine}
          categoryIndent={categoryIndent}
        />
      );
    }
  };

  /**
   * Render headers (header row)
   *
   * @param expand callback
   * @param rows to base expand off of
   * @param isMobile
   * @param isTablet
   * @private
   */
  _renderHeaders = (expand, rows = [], isMobile = false, isTablet = false) => {
    // MOBILE
    if (isMobile) {
      return (
        <StyledHeader>
          <Cell width="7%">
            <Icon name="triangleRight" />
          </Cell>
          <HeaderCell width="66.5%">CATEGORY</HeaderCell>
          <HeaderCell justifyContent="flex-end" width="26.5%">
            BALANCE
          </HeaderCell>
        </StyledHeader>
      );
    }
    // TABLET
    else if (isTablet) {
      return (
        <StyledHeader>
          <Cell width="10%">
            <Icon name="triangleRight" />
          </Cell>
          <HeaderCell width="30%">CATEGORY</HeaderCell>
          <HeaderCell justifyContent="flex-end" width="20%">
            BUDGET
          </HeaderCell>
          <HeaderCell justifyContent="flex-end" width="20%">
            BALANCE
          </HeaderCell>
          <HeaderCell justifyContent="flex-end" width="20%">
            SPENT %
          </HeaderCell>
        </StyledHeader>
      );
    }
    // DESKTOP
    else {
      return (
        <StyledHeader>
          <Cell width="2.5%">
            <Icon name="triangleRight" />
          </Cell>
          <HeaderCell width="12.5%">CATEGORY</HeaderCell>
          <HeaderCell justifyContent="flex-end" width="12.5%">
            BUDGET
          </HeaderCell>
          <HeaderCell justifyContent="flex-end" width="12.5%">
            <IconWrapper>
              <Icon name={"infoIcon"} fontFamily={"fontFamilyGideon"} fontSize={13} />
            </IconWrapper>
            PREVIOUS
          </HeaderCell>
          <HeaderCell justifyContent="flex-end" width="12.5%">
            INCOME
          </HeaderCell>
          <HeaderCell justifyContent="flex-end" width="12.5%">
            EXPENSES
          </HeaderCell>
          <HeaderCell justifyContent="flex-end" width="12.5%">
            TRANSFERS
          </HeaderCell>
          <HeaderCell justifyContent="flex-end" width="12.5%">
            BALANCE
          </HeaderCell>
          <HeaderCell justifyContent="flex-end" width="10%">
            SPENT %
          </HeaderCell>
        </StyledHeader>
      );
    }
  };

  _clear = clear => {
    // Clear out the search text (use innerRef since this is a styled component):
    this.searchTextRef.current.value = "";
    this.setState({
      unitSubcategoryName: "",
      subcategoryName: ""
    });
    clear();
  };

  render() {
    let { flattenedData = [], subcategoryName = "", unitSubcategoryName = "" } = this.state;
    let data = unitSubcategoryName && flattenedData.length > 1 ? flattenedData : more_story_data;

    return (
      <Table data={data} defaultSortType="string" defaultSortKey="sortOrder" defaultSortAsc={true}>
        {({ rows, sort, loading, filter, filterPairs, expand, isMobile, isTablet, clear }) => {
          // category can either represent a subcategory or unit subcategory block
          let category =
            unitSubcategoryName && flattenedData.length > 0
              ? flattenedData.filter(d => d.subcategoryName === subcategoryName)
              : rows.find(d => d.subcategoryName === subcategoryName);

          return (
            <>
              <FilterBar>
                <Search
                  innerRef={this.searchTextRef}
                  placeholder="Search"
                  onChange={e => {
                    filter(e.currentTarget.value);
                  }}
                />
                <DateButtons
                  onClick={value => {
                    console.log(value);
                  }}
                />
                <>
                  <SubcategoryDropdownWrapper>
                    <Dropdown
                      placeholder="All Categories"
                      onChange={subcategoryName => {
                        this.setState({ subcategoryName });
                        filter(subcategoryName);
                      }}
                      value={subcategoryName}
                      data={extractFilterOptions(more_story_data, "subcategoryName")}
                    />
                  </SubcategoryDropdownWrapper>
                  {/*If we're dealing with the unit subcategory then the data is already flattened (no lines). See the data prop for unit subcategories.*/}
                  {((category && category.lines && category.lines.length > 0) || unitSubcategoryName) && (
                    <Dropdown
                      placeholder="All Unit Subcategories"
                      onChange={unitSubcategoryName => {
                        this.setState({ unitSubcategoryName });
                        if (unitSubcategoryName && flattenedData.length === 0) {
                          this.setState({ flattenedData: flatten(more_story_data) });
                        }
                        filter(unitSubcategoryName);
                      }}
                      data={
                        unitSubcategoryName
                          ? extractFlattenedFilterOptions(category, "unitSubcategoryName")
                          : extractFilterOptions(category.lines, "unitSubcategoryName")
                      }
                      value={unitSubcategoryName}
                    />
                  )}
                </>
                <Clear onClick={() => this._clear(clear)} />
              </FilterBar>
              {this._renderHeaders(expand, more_story_data, isMobile, isTablet)}
              {rows.map((r, index) => {
                return (
                  <React.Fragment key={`${index}`}>
                    {/* Main non-header row (parent): */}
                    {this._renderRow(r, index, false, expand, "8px", isMobile, isTablet)}
                    {/* Expanded non-header line (child) row(s) if any: */}
                    {r.expand &&
                      r.lines &&
                      r.lines.length > 0 &&
                      r.lines.map((l, i) => {
                        return this._renderRow(l, i, true, false, "20px", isMobile, isTablet, index);
                      })}
                  </React.Fragment>
                );
              })}
            </>
          );
        }}
      </Table>
    );
  }
}

storiesOf("FilterBar", module)
  .addDecorator(withKnobs)
  .add("FilterBar (Desktop) with Table", () => (
    <Container>
      <StoryComponent />
    </Container>
  ));

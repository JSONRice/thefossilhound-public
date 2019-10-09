import React, { Component } from "react";
import styled from "styled-components";
import { Table } from "../Table";
import data from "./story_test_data.js";
import { HeaderCell } from "../HeaderCell";

let Cell = styled.div`
  padding: 4px 8px;
`;

let DateCell = styled.div`
  display: inline-block;
  white-space: nowrap;
  padding: 4px 20px 8px 4px;
`;

let MobileDateCell = styled.div`
  padding: 4px 20px 8px 4px;
`;

let Header = styled.div`
  display: flex;
  margin: 10px 0;
  border-top: 1px solid ${({ theme }) => theme.containers.borderDarkColor};
  border-bottom: 1px solid ${({ theme }) => theme.containers.borderDarkColor};
`;

let Row = styled.div`
  display: flex;
  background-color: ${props =>
    props.id % 2 === 0
      ? ({ theme }) => theme.containers.rowOdd
      : "transparent"};
`;

let Rows = styled.div`
  width: 100%;
`;

let Filter = styled.div`
  display: flex;
  & * {
    margin-left: 10px;
    margin-top: 10px;
  }
`;

let Container = styled.div`
  padding: 0 50px 50px 50px;
`;

let DesktopRow = styled.div`
  display: grid;
  grid-template-columns: 90px 90px 110px auto;
`;

let MobileRowWrapper = styled.div`
  display: grid;
  grid-template-columns: 100%;
`;

let MobileRow = styled.div`
  display: flex;

  justify-content: space-around;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.containers.borderDarkColor};
`;

/***
 * Only used in the storybook
 */
class SecondStoryPage extends Component {
  state = {
    data: data,
    filterText: "",
    filterKey: "",
    verseSortAsc: false,
    sectionSortAsc: false
  };

  /**
   * Strip off the time stamp from the supplied date
   * TODO: just use the date formatter service (create a service for that and import)
   *
   * @param date
   * @private
   */
  _getFormattedDate = date => {
    if (date) {
      let parsed = date.split("T");
      return parsed.length > 1 ? parsed[0] : date;
    }
    return null;
  };

  render() {
    let { data } = this.state;

    return (
      <Container>
        <div>
          <h4>Doctrine and Covenants Sections 1 through 21</h4>
        </div>
        <div>
          <p>
            Storybook of advanced filtering along with ascending and descending
            sorts.
          </p>
        </div>
        <Table data={data}>
          {({ rows, sort, loading, filter, expand, isMobile }) => {
            return (
              <React.Fragment>
                <Filter>
                  <div>
                    <input
                      type="text"
                      placeholder={"Filter text..."}
                      onChange={e => filter(e.currentTarget.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="filterCriteria">Verse:</label>
                    <select
                      id="filterCriteria"
                      onChange={e => filter(e.currentTarget.value, "verse")}
                    >
                      <option value="">All</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="filterCriteria">Word (in text):</label>
                    <select
                      id="filterCriteria"
                      onChange={e => filter(e.currentTarget.value, "text")}
                    >
                      <option value="">All</option>
                      <option value="virtue">virtue</option>
                      <option value="devil">devil</option>
                      <option value="yea">yea</option>
                      <option value="Joseph Smith">Joseph Smith</option>
                      <option value="Joseph">Joseph</option>
                      <option value="Lord">Lord</option>
                      <option value="Jesus">Jesus</option>
                    </select>
                  </div>
                </Filter>
                <Header>
                  <HeaderCell
                    sortAsc={true}
                    sortKey="section"
                    sortFunction={sort}
                  >
                    section
                  </HeaderCell>
                  <HeaderCell
                    sortAsc={true}
                    sortKey="verse"
                    sortFunction={sort}
                  >
                    verse
                  </HeaderCell>
                  <span style={{ paddingLeft: "20px" }} />
                  <HeaderCell
                    sortAsc={true}
                    sortDataType="date"
                    sortKey="date"
                    sortFunction={sort}
                  >
                    date
                  </HeaderCell>
                  <span style={{ paddingLeft: "55px" }} />
                  <HeaderCell>text</HeaderCell>
                </Header>
                <Rows>
                  {rows.map((r, index) => (
                    <React.Fragment key={`${r.section}-${r.verse}`}>
                      <Row id={index} onClick={() => expand(r.id)}>
                        <DesktopRow>
                          <Cell style={{ marginRight: "70px" }}>
                            {r.section}
                          </Cell>
                          <Cell style={{ marginRight: "70px" }}>{r.verse}</Cell>
                          <DateCell>{this._getFormattedDate(r.date)}</DateCell>
                          <Cell>{r.text}</Cell>
                        </DesktopRow>
                      </Row>
                      {r.expand && <Row>This is expanded for {r.name}</Row>}
                    </React.Fragment>
                  ))}
                </Rows>
              </React.Fragment>
            );
          }}
        </Table>
      </Container>
    );
  }
}

export default SecondStoryPage;

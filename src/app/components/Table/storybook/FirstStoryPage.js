import React, { Component } from "react";
import styled from "styled-components";
import { Table } from "../Table";
import data from "./story_test_data.js";

let Row = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.color.textPrimaryDark};
`;

let Cell = styled.div`
    padding: 4px 8px;
    // border-right: 1px solid ${({ theme }) => theme.color.textPrimaryDark};
`;

let Header = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.color.textPrimaryDark};
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

const TableWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.textPrimaryDark};
  border-right: 1px solid ${({ theme }) => theme.color.textPrimaryDark};
  border-left: 1px solid ${({ theme }) => theme.color.textPrimaryDark};
  border-radius: 5px;
`;

/***
 * Only used in the storybook
 */
class FirstStoryPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    data: data,
    filterText: "",
    filterKey: ""
  };

  /**
   * Expand a row callback
   *
   * @param id
   */
  expand = id => {
    let results = this.state.data.map(d => {
      if (d.id === id) d.expand = !d.expand;
      return d;
    });

    this.setState({
      data: results
    });
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
            The Table component is a bare bones component that simply provides table based API for sorting, filtering,
            searching, etc. The developer is responsible for supplying a list of data items which is nothing more than
            an array of objects. Each object element represents a row and every tuple (key-value pair) in the object
            represents a single cell. The table simply renders the rows and maintains the data set (sorted, filtered,
            etc.).
          </p>
        </div>
        <TableWrapper>
          <Table data={data}>
            {({ rows, sort, loading, filter }) => {
              return (
                <React.Fragment>
                  <Filter>
                    <div>
                      <input type="text" placeholder={"Filter text..."} onChange={e => filter(e.currentTarget.value)} />
                    </div>
                    <div>
                      <label htmlFor="filterCriteria">Verse:</label>
                      <select id="filterCriteria" onChange={e => filter(e.currentTarget.value, "verse")}>
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
                  </Filter>
                  <Header>
                    <Cell>section</Cell>
                    <Cell>verse</Cell>
                    <Cell>reference</Cell>
                    <Cell>text</Cell>
                  </Header>
                  {rows.map(r => (
                    <React.Fragment key={`${r.section}-${r.verse}`}>
                      <Row onClick={() => this.expand(r.id)}>
                        <Cell style={{ paddingRight: "45px" }}>{r.section}</Cell>
                        <Cell style={{ paddingRight: "40px" }}>{r.verse}</Cell>
                        <Cell style={{ paddingRight: "40px" }}>{r.reference}</Cell>
                        <Cell style={{ paddingRight: "40px" }}>{r.text}</Cell>
                      </Row>
                      {r.expand && <Row>This is expanded for {r.name}</Row>}
                      {/*<DesktopRow row={r} />*/}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              );
            }}
          </Table>
        </TableWrapper>
      </Container>
    );
  }
}

export default FirstStoryPage;

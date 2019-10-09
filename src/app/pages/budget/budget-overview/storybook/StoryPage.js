import React, { Component } from "react";
import styled from "styled-components";
import { Table } from "../../../../components/Table/Table";
import { HeaderCell } from "../../../../components/Table/HeaderCell";
import { formatDate } from "../../../../utils/formatters";
import { LocalLink } from "../../../../components/LocalLink";
import Amount from "../../../../components/Amount/Amount";

let Cell = styled.div`
  display: flex;
  flex: 1;
  padding: 4px 8px;
  word-wrap: break-word;
  width: 0;
  ${props =>
    props.width &&
    `
      min-width: ${props.width};
      max-width: ${props.width};
    `}
`;

let Header = styled.div`
  display: flex;
  margin: 10px 0;
  border-top: 1px solid ${({ theme }) => theme.containers.borderDarkColor};
  border-bottom: 1px solid ${({ theme }) => theme.containers.borderDarkColor};
`;

let Row = styled.div`
  display: flex;
  background-color: ${props => (props.id % 2 === 0 ? ({ theme }) => theme.containers.rowOdd : "transparent")};
`;

let Container = styled.div`
  padding: 0 50px 50px 50px;
`;

let DesktopRow = styled.div`
  display: flex;
  background-color: ${props => (props.id % 2 === 0 ? ({ theme }) => theme.containers.rowOdd : "transparent")};
`;

const test_data = [
  {
    date: "10-31-2018",
    ref: 1234,
    category: "Young Men",
    description: "FedEx Copy/Print",
    type: "Expense",
    amount: "-10.00"
  },
  {
    date: "10-31-2018",
    ref: 1234,
    category: "Young Men",
    description: "Donation",
    type: "Income",
    amount: "10.00"
  },
  {
    date: "10-31-2018",
    ref: 1234,
    category: "Young Men",
    description: "Something",
    type: "Transfer",
    amount: "10.00"
  },
  {
    date: "10-31-2018",
    ref: 1234,
    category: "Young Men",
    description: "T-shirts for Webelos Adventure Day",
    type: "Expense",
    amount: "-10.00"
  },
  {
    date: "10-31-2018",
    ref: 1234,
    category: "Young Men",
    description: "Scout Camp Patrol Flags",
    type: "Expense",
    amount: "-10.00"
  }
];

const ingest = (data, key) => {
  // Reduce the multi-dimensional data object (map)
  return data.reduce((acc, curr) => {
    !acc[curr[key]] && (acc[curr[key]] = curr[key]);

    let lines = curr.lines.reduce((acc, curr) => {
      !acc[curr[key]] && (acc[curr[key]] = curr[key]);
      return acc;
    }, {});

    // Merge the flattened lines back into the accumulated object
    return {
      ...acc,
      ...lines
    };
  }, {});
};

/***
 * Only used in the storybook
 */
class StoryPage extends Component {
  constructor(props) {
    super(props);
    // const rows = data.map(row => {
    //   if (row.lines && Array.isArray(row.lines)) {
    //     return row.lines;
    //   }
    // }).flat();

    this.state = {
      data: test_data,
      filterText: "",
      filterKey: "",
      verseSortAsc: false,
      sectionSortAsc: false
    };
  }

  render() {
    let { data } = this.state;

    return (
      <Container>
        <Table data={data} defaultSortType="string" defaultSortKey="verse" defaultSortAsc={true}>
          {({ rows, sort, loading, filter, expand }) => {
            return (
              <React.Fragment>
                <Header>
                  <HeaderCell width="15%">DATE</HeaderCell>
                  <HeaderCell width="15%">REFERENCE #</HeaderCell>
                  <HeaderCell width="15%">CATEGORY</HeaderCell>
                  <HeaderCell width="25%">DESCRIPTION</HeaderCell>
                  <HeaderCell width="15%">TYPE</HeaderCell>
                  <HeaderCell width="15%">AMOUNT</HeaderCell>
                </Header>
                {rows.map((r, index) => (
                  <React.Fragment key={`${r.ref}-${index}`}>
                    <DesktopRow id={index} onClick={() => expand(r.ref)}>
                      <Cell width="15%">{formatDate(r.date)}</Cell>
                      <Cell width="15%">
                        <LocalLink href={"#"}>{r.ref}</LocalLink>
                      </Cell>
                      <Cell width="15%">{r.category}</Cell>
                      <Cell width="25%">{r.description}</Cell>
                      <Cell width="16%">{r.type}</Cell>
                      <Cell width="14%">
                        <Amount fontSize={16} amount={r.amount} showCurrencySymbol={true} />
                      </Cell>
                    </DesktopRow>
                    {r.expand && <Row>This is expanded for ref: {r.ref}</Row>}
                  </React.Fragment>
                ))}
              </React.Fragment>
            );
          }}
        </Table>
      </Container>
    );
  }
}

export default StoryPage;

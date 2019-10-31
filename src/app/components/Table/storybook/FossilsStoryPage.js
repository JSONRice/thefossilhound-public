import React, { Component } from "react";
import styled from "styled-components";
import { Table } from "../Table";
import { HeaderCell } from "../HeaderCell";
import { LocalLink } from "../../LocalLink";
import { formatDate } from "../../../utils/formatters";
import { ColumnConfiguration } from "../../../utils/column-configuration";
import { TableHeaderConstants } from "../../../utils/table-header-constants";

let Cell = styled.div`
  padding: 4px 8px;
`;

let DateCell = styled.div`
  display: inline-block;
  white-space: nowrap;
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
  background-color: ${props => (props.id % 2 === 0 ? ({ theme }) => theme.containers.rowOdd : "transparent")};
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

let fossilsMainDirectory = [
  {
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Chondrichthyes",
    link: "/collections/chondrichthyes"
  },
  {
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Malacostraca",
    link: "/collections/malacostraca"
  },
  {
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Trilobita",
    link: "/collections/trilobita"
  }
];

// Add an index to each element (for ordering):
fossilsMainDirectory = fossilsMainDirectory.map((fossilRecord, index) => {
  return {
    ...fossilRecord,
    index
  };
});

/***
 * Only used in the storybook
 */
class FossilsStoryPage extends Component {
  state = {
    data: fossilsMainDirectory,
    filterText: "",
    filterKey: ""
  };

  render() {
    let { data } = this.state;

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };

    // Table Configuration
    let columns = new ColumnConfiguration({
      desktop: [...TableHeaderConstants.desktop],
      tablet: [...TableHeaderConstants.tablet],
      mobile: [...TableHeaderConstants.mobile]
    });

    return (
      <Container>
        <div>
          <h4>Fossil Dictionary</h4>
        </div>
        <div>
          <p>Storybook that will act as a prototype for showcasing fossils in the collections directory.</p>
        </div>
        <Table
          data={data}
          defaultSortType="string"
          defaultSortKey="class"
          defaultSortAsc={true}
          columnConfiguration={columns.desktop}
          tabletOverrideColumnConfiguration={columns.tablet}
          mobileOverrideColumnConfiguration={columns.mobile}
        >
          {({ filter, filterPairs }) => <h1>Fossils Archive</h1>}
        </Table>
      </Container>
    );
  }
}

export default FossilsStoryPage;

import React from "react";
import styled from "styled-components";
import { Page } from "../../components/Page";
import { ColumnConfiguration } from "../../utils/column-configuration";
import { TableHeaderConstants } from "../../utils/table-header-constants";
import { Table } from "../../components/Table";

let Filter = styled.div`
  display: flex;

  > *:not(:first-child) {
    margin-left: 10px;
  }
`;

let Container = styled.div`
  padding: 0 0 50px 0;
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

class CollectionsContent extends React.PureComponent {
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
          <p>Use this table to navigate to the other pages that contain interesting information about fossils.</p>
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
          {({ filter, clear }) => {
            return (
              <>
                <Filter>
                  <div>
                    <input
                      type="text"
                      placeholder="Search..."
                      onChange={e => filter(e.currentTarget.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="filterCriteria">Class:&nbsp;</label>
                    <select
                      id="filterCriteria"
                      onChange={e => filter(e.currentTarget.value, "class")}
                    >
                      <option value="">All</option>
                      <option value="chondrichthyes">Chondrichthyes</option>
                      <option value="malacostraca">Malacostraca</option>
                      <option value="trilobita">Trilobita</option>
                    </select>
                  </div>
                </Filter>
              </>
            );
          }}
        </Table>
      </Container>
    );
  }
}

const Collections = () => {
  return (
    <Page title="Collections">
      <CollectionsContent />
    </Page>
  );
};

export default Collections;

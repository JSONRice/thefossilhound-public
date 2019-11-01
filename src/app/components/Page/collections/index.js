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
  padding: 0 50px 50px 50px;
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
        TODO: Implement table
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

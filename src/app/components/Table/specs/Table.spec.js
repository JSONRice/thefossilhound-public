import React from "react";
import { shallow, mount, render } from "enzyme";
import { Table } from "../Table";
import data from "../storybook/story_test_data.js";
import { ColumnConfiguration } from "../../../utils/column-configuration";
import { TableHeaderConstants } from "../../../utils/table-header-constants";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";
import theme from "../../../styles/theme";

describe("Table", () => {
  // Table Configuration
  let columns = new ColumnConfiguration({
    desktop: [...TableHeaderConstants.desktop],
    tablet: [...TableHeaderConstants.tablet],
    mobile: [...TableHeaderConstants.mobile]
  });

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

  it("renders children when passed in", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Table
          data={fossilsMainDirectory}
          defaultSortType="string"
          defaultSortKey="class"
          defaultSortAsc={true}
          columnConfiguration={columns.desktop}
          tabletOverrideColumnConfiguration={columns.tablet}
          mobileOverrideColumnConfiguration={columns.mobile}
        >
          {({ filter }) => {
            return (
              <>
                <h1>Spec</h1>
              </>
            );
          }}
        </Table>
      </ThemeProvider>
    );
    console.log(wrapper.props())
    expect(wrapper.children().props().data).toEqual(fossilsMainDirectory);
  });

  it("renders correctly and snapshots", () => {
    const component = (
      <ThemeProvider theme={theme}>
        <Table
          data={fossilsMainDirectory}
          defaultSortType="string"
          defaultSortKey="class"
          defaultSortAsc={true}
          columnConfiguration={columns.desktop}
          tabletOverrideColumnConfiguration={columns.tablet}
          mobileOverrideColumnConfiguration={columns.mobile}
        >
          {({ filter }) => {
            return (
              <>
                <h1>Hello Spec</h1>
              </>
            );
          }}
        </Table>
      </ThemeProvider>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();

    // On the first run of this test, Jest will generate a snapshot file automatically.
  });
});

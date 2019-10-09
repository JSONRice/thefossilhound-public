import { storiesOf } from "@storybook/react";
import React from "react";
import { Dropdown } from "./Dropdown";
import mock from "./story_data";
import more_story_data from "./more_story_data";
import styled from "styled-components";
import { extractFilterOptions } from "../../utils/filter-utils";

const Span = styled.span`
  padding-right: 15px;
`;

const Container = styled.div`
  padding: 10px;
`;

const SubcategoryDropdownWrapper = styled.div`
  display: inline;
  margin-right: 10px;
`;

class StoryDropdownWithData extends React.Component {
  state = {
    menuValue: undefined
  };

  selectOption = value => this.setState({ menuVal: value });

  render() {
    let { menuVal } = this.state;

    return (
      <React.Fragment>
        <Dropdown onChange={value => this.selectOption(value)} data={extractFilterOptions(mock, "source")} />
        <div>
          Menu value: <b>{menuVal}</b>
        </div>
      </React.Fragment>
    );
  }
}

class CategoryDropdowns extends React.Component {
  state = {
    subcategoryName: "",
    unitSubcatgoryName: ""
  };

  render() {
    let subcategory = more_story_data.find(d => d.subcategoryName === this.state.subcategoryName);

    return (
      <Container>
        <Span>Some dropdowns from a big data set (see console.log):</Span>
        <SubcategoryDropdownWrapper>
          <Dropdown
            onChange={subcategoryName => {
              this.setState({ subcategoryName });
            }}
            data={extractFilterOptions(more_story_data, "subcategoryName")}
          />
        </SubcategoryDropdownWrapper>
        {subcategory && subcategory.lines && subcategory.lines.length > 0 && (
          <Dropdown
            onChange={unitSubcategoryName => {
              this.setState({ unitSubcategoryName });
            }}
            data={extractFilterOptions(subcategory.lines, "unitSubcategoryName")}
          />
        )}
      </Container>
    );
  }
}

storiesOf("Dropdown", module)
  .add("Default", () => (
    <Container>
      <Span>Here is a basic dropdown:</Span>
      <Dropdown data={[{ key: 1, value: "Test" }, { key: 2, value: "Foo" }, { key: 3, value: "Bar" }]} />
    </Container>
  ))
  .add("With data and callback", () => (
    <Container>
      <Span>
        Here is a dropdown derived from a data set with a callback to set the selected value on the parent DOM:
      </Span>
      <StoryDropdownWithData />
    </Container>
  ))
  .add("Subcategory and Unit Subcategory side-by-side", () => {
    return <CategoryDropdowns />;
  });

import React from "react";
import styled from "styled-components";
// import { ChevronDown, ChevronUp } from "@churchofjesuschrist/eden-icons";
import { Icon } from "../Icon";

let Cell = styled.div`
  display: flex;
  flex: 1;
  word-wrap: break-word;
  text-transform: uppercase;
  width: 0;
  padding-left: ${props => props.indent};
  justify-content: ${props => (props.justifyContent ? `${props.justifyContent} !important` : "flex-start")};
  ${props =>
    props.width &&
    `
      min-width: ${props.width};
      max-width: ${props.width};
    `}
`;

export class HeaderCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortAsc: this.props.sortAsc
    };
  }

  renderSortIcon = () => {
    const { sortFunction } = this.props;
    const { sortAsc } = this.state;

    if (sortFunction) {
      return sortAsc ? <Icon name="triangleBottom" /> : <Icon name="triangleTop" />;
    }
  };

  render() {
    let { sortAsc = false } = this.state;
    let { sortKey = "", sortFunction, sortDataType = "string", width = "16.66%" } = this.props;
    let { children, justifyContent, indent } = this.props;

    return (
      <Cell
        width={width}
        justifyContent={justifyContent}
        indent={indent}
        onClick={() => {
          if (sortFunction) {
            sortFunction(sortKey, sortDataType, sortAsc);
            this.setState({ sortAsc: !sortAsc });
          }
        }}
      >
        {this.renderSortIcon(sortAsc)}
        {children}
      </Cell>
    );
  }
}

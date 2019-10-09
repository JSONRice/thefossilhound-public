import React, { Component } from "react";
import styled from "styled-components";
import { LocalLink } from "../LocalLink";
import BreadcrumbService from "../../services/breadcrumb-service";

let BreadcrumbWrapper = styled.div`
  display: flex;
  margin: 0 0 0 -3px;
`;

class Breadcrumb extends Component {
  popBreadcrumb() {
    let breadCrumbService = new BreadcrumbService();
    breadCrumbService.pop();
  }

  render() {
    const { items } = this.props;

    if (!items || items.length < 2) {
      return null;
    }

    // Getting the 2nd to last item since the current page will be pushed onto the stack already
    const item = items[items.length - 2];

    return (
      <BreadcrumbWrapper>
        <LocalLink href={item.url} onClick={this.popBreadcrumb}>
          {`« Back to ${item.title}`}
        </LocalLink>
      </BreadcrumbWrapper>
    );
  }
}

export default Breadcrumb;

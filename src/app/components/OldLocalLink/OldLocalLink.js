import { Component } from "react";
import React from "react";
import { buildOldUrl } from "../../utils/url";

class OldLocalLink extends Component {
  render() {
    let { children, href, hasAccess, hook, newTab = false } = this.props;
    let target = newTab ? "_blank" : "_self";
    if (hasAccess) {
      return (
        <a href={buildOldUrl(href, hook)} target={target}>
          {children}
        </a>
      );
    }
    return <span>{children}</span>;
  }
}

export default OldLocalLink;

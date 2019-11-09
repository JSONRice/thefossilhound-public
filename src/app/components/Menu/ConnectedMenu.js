import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu } from "./Menu";

class ConnectedMenu extends Component {
  render() {
    const { items } = this.props;
    return <Menu items={items} />;
  }
}

function mapStateToProps(state) {
  return {
    items: state.menu.items
  };
}

export default connect(mapStateToProps)(ConnectedMenu);

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import PropTypes from "prop-types";
import styled from "styled-components";

import Tab from "./Tab";
import { updateTab } from "../../actions/tabs-action";

const TabList = styled.ol`
  margin: 0;
  padding: 0;
  border-bottom: 0;
  position: relative;
  bottom: -1px;
`;

const NavbarTabs = styled.nav`
  border-bottom: 1px solid #ccc;
  margin: 20px 0 15px;
  ${({ theme }) => theme.fontSize(13)};
`;

class Tabs extends Component {
  constructor(props) {
    super(props);

    let {
      defaultActiveKey,
      router: {
        query: { tab }
      },
      updateTab
    } = props;

    this.onClickTabItem(tab || defaultActiveKey || this.props.children[0].props.keyId);
  }

  onClickTabItem = keyId => {
    let { router, updateTab } = this.props;
    updateTab(keyId);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, tab: keyId }
    });
  };

  render() {
    const {
      onClickTabItem,
      props: { children, activeKey }
    } = this;

    return (
      <div>
        <NavbarTabs>
          <TabList>
            {children.map(child => {
              const { label, keyId } = child.props;
              const isActive = activeKey === keyId;

              return <Tab key={keyId} isActive={isActive} keyId={keyId} label={label} onClick={onClickTabItem} />;
            })}
          </TabList>
        </NavbarTabs>
        <div>
          {children.map(child => {
            return child.props.keyId === activeKey ? child.props.children : undefined;
          })}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateTab
};

function mapStateToProps(state, ownProps) {
  return {
    activeKey: state.tabs.activeKey
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Tabs));

Tabs.propTypes = {
  defaultActiveKey: PropTypes.string
};

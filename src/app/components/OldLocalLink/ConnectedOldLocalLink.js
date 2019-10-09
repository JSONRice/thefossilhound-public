import React, { Component } from "react";
import { connect } from "react-redux";
import OldLocalLink from "./OldLocalLink";

class ConnectedOldLocalLink extends Component {
  addOrgAndInternalAccountToHook = hook => {
    if (!hook) {
      hook = {};
    }
    if (!hook.hasOwnProperty("orgId") && this.props.unit) {
      hook.orgId = this.props.unit.orgId;
    }
    if (!hook.hasOwnProperty("internalAccountId") && this.props.internalAccount) {
      hook.internalAccountId = this.props.internalAccount.internalAccountId;
    }

    return hook;
  };

  render() {
    let { children, href, hasAccess, hook, newTab = false } = this.props;

    return (
      <OldLocalLink
        hasAccess={hasAccess}
        href={href}
        children={children}
        newTab={newTab}
        hook={this.addOrgAndInternalAccountToHook(hook)}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    unit: state.security.unit,
    internalAccount: state.security.internalAccount
  };
}

export default connect(mapStateToProps)(ConnectedOldLocalLink);

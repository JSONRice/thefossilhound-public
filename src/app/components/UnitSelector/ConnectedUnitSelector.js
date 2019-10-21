import React, { Component } from "react";
import { connect } from "react-redux";
import UnitSelector from "./UnitSelector";

class ConnectedUnitSelector extends Component {
  render() {
    let { unit, accessibleUnits, updateUnit } = this.props;
    return <UnitSelector unit={unit} accessibleUnits={accessibleUnits} updateUnit={updateUnit} />;
  }
}

function mapStateToProps(state) {
  return {
    unit: state.security.unit,
    accessibleUnits: state.security.accessibleUnits
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUnit: unit => null
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedUnitSelector);

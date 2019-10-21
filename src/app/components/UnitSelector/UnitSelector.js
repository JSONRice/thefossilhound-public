import React, { Component } from "react";
import styled from "styled-components";
import theme from "../../styles/theme.js";

const StyledUnitSelector = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const List = styled.ul`
  list-style: none;
  font-family: ${({ theme }) => theme.font.fontFamilySans};
  ${({ theme }) => theme.fontSize(12)};
  font-weight: 500;
  letter-spacing: -0.25px;
  padding-inline-start: unset;
`;

const Item = styled.li`
  @media (min-width: 769px) {
    display: inline;
  }
`;

const UnitDropdown = styled.ul`
  border: 1px solid ${theme.color.gray400};
  position: absolute;
  right: 15%;
  background-color: ${theme.color.white100};
  border-radius: 4px;
  list-style: none;
  padding: 16px;
  min-width: max-content;
  z-index: 1;
`;

const UnitDropDownOption = styled.li`
  &:hover {
    background-color: ${theme.color.white600};
  }
  &:first-child {
    border-bottom: 1px solid ${theme.color.white600};
  }
  background-color: ${props => (props.isCurrentUnit ? theme.color.gray550 : "transparent")};
  padding: 10px 10px 10px 10px;
  cursor: pointer;
`;

const CurrentUnitSelected = styled.span`
  color: ${theme.color.blue800};
  cursor: pointer;
`;

const MutedSpan = styled.span`
  color: ${theme.color.white400};
`;

const Arrow = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  border: 4px solid transparent;
  border-top-color: ${theme.color.blue800};
  margin: 0 0 -2px 4px;
`;

class UnitSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false
    };
  }

  toggleShowDropdown = () => {
    this.setState({ showDropdown: !this.state.showDropdown });
  };

  getUnitName = unit => {
    return unit.orgName;
  };

  getUnitNumber = unit => {
    return " (" + unit.unitNumber.toString() + ")";
  };

  unitSelected = unit => {
    this.props.updateUnit(unit);
    this.toggleShowDropdown();
  };

  render() {
    let { unit, accessibleUnits } = this.props;
    if (!unit) {
      return null;
    }
    let parentName = unit.parentOrgName ? unit.parentOrgName : null;
    let parentNumber = unit.parentOrgName ? " (" + unit.parentUnitNumber.toString() + ") | " : null;
    let unitName = this.getUnitName(unit);
    let unitNumber = this.getUnitNumber(unit);

    if (accessibleUnits.length > 1) {
      return (
        <StyledUnitSelector>
          <List>
            <Item>
              {parentName}
              <MutedSpan>{parentNumber}</MutedSpan>
            </Item>
            <Item>
              <CurrentUnitSelected onClick={this.toggleShowDropdown}>
                {unitName} <MutedSpan>{unitNumber}</MutedSpan>
                <Arrow />
              </CurrentUnitSelected>
              {this.state.showDropdown && (
                <UnitDropdown>
                  {accessibleUnits.map((accessibleUnit, i) => {
                    let accessibleUnitNumber = this.getUnitNumber(accessibleUnit);
                    return (
                      <UnitDropDownOption
                        key={`unit-dropdown-option-${i}`}
                        isCurrentUnit={unitNumber === accessibleUnitNumber}
                        onClick={() => this.unitSelected(accessibleUnit)}
                      >
                        {this.getUnitName(accessibleUnit)}
                        <MutedSpan>{accessibleUnitNumber}</MutedSpan>
                      </UnitDropDownOption>
                    );
                  })}
                </UnitDropdown>
              )}
            </Item>
          </List>
        </StyledUnitSelector>
      );
    } else {
      return (
        <StyledUnitSelector>
          <List>
            <Item>
              {parentName}
              <MutedSpan>{parentNumber}</MutedSpan>
            </Item>
            <Item>
              {unitName}
              <MutedSpan>{unitNumber}</MutedSpan>
            </Item>
          </List>
        </StyledUnitSelector>
      );
    }
  }
}

export default UnitSelector;

import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../../styles/theme.js";

const Item = styled.li`
  display: inline-block;
  list-style: none;
  position: relative;

  padding: 8px 12px;
  border: 1px solid ${theme.color.gray500};
  margin: 0 1px;

  background-color: ${props =>
    props.isActive ? theme.color.white100 : theme.color.gray100};
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid
    ${props => (props.isActive ? theme.color.white100 : theme.color.gray500)};
  color: ${props =>
    props.isActive ? theme.color.textPrimary : theme.color.inactiveTab};

  &:hover {
    cursor: pointer;
    background-color: ${props =>
      props.isActive ? theme.color.white100 : theme.color.gray400};
  }
`;

class Tab extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    keyId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func
  };

  onClick = () => {
    const { keyId, onClick } = this.props;
    onClick && onClick(keyId);
  };

  render() {
    const {
      onClick,
      props: { isActive, keyId, label }
    } = this;

    return (
      <Item key={keyId} onClick={onClick} isActive={isActive}>
        {label}
      </Item>
    );
  }
}

export default Tab;

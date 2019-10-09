import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

//   background-color: ${({ theme }) => theme.color.gray800};
const StyledBadge = styled.span`
  color: ${props => ({ theme }) => theme.color[props.color]};
  font-weight: 400;
  padding: 0 8px;
  text-align: center;
  background-color: ${props => ({ theme }) => theme.color[props.backgroundColor]};
  text-decoration: none;
  position: relative;
  display: inline-block;
  border-radius: 10px;
  transition: all ease 0.4s;

  :hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

export const Badge = ({ backgroundColor, children, color }) => (
  <StyledBadge backgroundColor={backgroundColor} color={color}>
    {children}
  </StyledBadge>
);

Badge.propTypes = {
  color: PropTypes.string,
  textColor: PropTypes.string
};

Badge.defaultProps = {
  color: "white100",
  backgroundColor: "blue900"
};

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../../styles/theme";

// The Glyphicons Halflings library is utilized for Icons and must come before the icon content
const StyledIcon = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: ${props => props.flexDirection};

  ::before {
    color: ${props => props.color};
    ${props => ({ theme }) => theme.fontSize(props.fontSize)};
    line-height: 18px;
    font-family: ${props => ({ theme }) => theme.font[props.fontFamily]};
    ${({ name }) => `${theme.icon(name)}`};
    transform: ${props => props.expand && `rotate(${props.rotateDeg}deg)`};
  }
`;

export const Icon = ({
  children,
  color,
  expand,
  flexDirection,
  fontFamily,
  fontSize,
  hideChildren,
  name,
  onClick,
  rotateDeg
}) => {
  return (
    <StyledIcon
      name={name}
      color={color}
      expand={expand}
      fontSize={fontSize}
      fontFamily={fontFamily}
      onClick={onClick}
      flexDirection={flexDirection}
      rotateDeg={rotateDeg}
    >
      <>{!hideChildren && children}</>
    </StyledIcon>
  );
};

Icon.propTypes = {
  color: PropTypes.string,
  expand: PropTypes.bool,
  flexDirection: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  hideChildren: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  rotateDeg: PropTypes.number
};

Icon.defaultProps = {
  color: "#0091bc",
  expand: false,
  flexDirection: "row",
  fontFamily: "fontFamilyGlyphiconsHalflings",
  fontSize: 10,
  hideChildren: false,
  rotateDeg: 90
};

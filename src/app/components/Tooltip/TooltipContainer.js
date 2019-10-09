import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const CONTAINER_ARROW_SIZE = "12px";
const CONTAINER_ARROW_BUFFER = "2px";
const CONTAINER_ARROW_SIZE_MINUS_BUFFER = `(${CONTAINER_ARROW_SIZE} - ${CONTAINER_ARROW_BUFFER})`;

const PLACEMENT_STYLE_PROPS = {
  isontop: ({ placement }) => (placement && placement.includes("top") ? "true" : undefined),
  isonbottom: ({ placement }) => (placement && placement.includes("bottom") ? "true" : undefined),
  isonleft: ({ placement }) => (placement && placement.includes("left") ? "true" : undefined),
  isonright: ({ placement }) => (placement && placement.includes("right") ? "true" : undefined)
};

const CONTAINER_MARGIN_CALC = `calc${CONTAINER_ARROW_SIZE_MINUS_BUFFER}`;

export const CONTAINER_MARGIN_STYLES = css`
  margin-top: ${({ isonbottom }) => isonbottom && CONTAINER_MARGIN_CALC};
  margin-bottom: ${({ isontop }) => isontop && CONTAINER_MARGIN_CALC};
  margin-left: ${({ isonright }) => isonright && CONTAINER_MARGIN_CALC};
  margin-right: ${({ isonleft }) => isonleft && CONTAINER_MARGIN_CALC};
`;

const StyledContainer = styled.div.attrs(PLACEMENT_STYLE_PROPS)`
  ${CONTAINER_MARGIN_STYLES};

  ${({ theme }) => theme.fontSize(13)};

  position: relative;
  z-index: 2;
  max-width: 300px;
  background: ${({ theme }) => theme.app.bgColor};
  border: none;
  border-radius: ${({ theme }) => theme.defaults.borderRadius};
  color: ${({ theme }) => theme.color.textPrimary};
  font-weight: 400;
  white-space: pre-line;
`;

const StyledContainerShadow = styled.div.attrs(PLACEMENT_STYLE_PROPS)`
  ${CONTAINER_MARGIN_STYLES};

  position: absolute;
  display: block;
  top: 0;
  left: 0;
  z-index: 0;
  width: calc(
    100% - ${({ isonleft, isonright }) => (isonleft || isonright ? CONTAINER_ARROW_SIZE_MINUS_BUFFER : "0px")}
  );
  height: calc(
    100% - ${({ isontop, isonbottom }) => (isontop || isonbottom ? CONTAINER_ARROW_SIZE_MINUS_BUFFER : "0px")}
  );

  &::before {
    content: " ";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    box-shadow: ${({ theme }) => theme.defaults.boxShadow};
    border-radius: ${({ theme }) => theme.defaults.borderRadius};
  }
`;

const StyledContainerArrow = styled.div.attrs({
  ...PLACEMENT_STYLE_PROPS,
  bordercolor: ({ theme }) => theme.app.bgColor
})`
  width: calc(2 * ${CONTAINER_ARROW_SIZE});
  height: calc(2 * ${CONTAINER_ARROW_SIZE});
  z-index: 1;
  filter: drop-shadow(${({ theme }) => theme.defaults.dropShadow});

  &,
  &::before {
    position: absolute;
    top: ${({ isonbottom }) => isonbottom && "0"};
    bottom: ${({ isontop }) => isontop && "0"};
    left: ${({ isonright }) => isonright && "0"};
    right: ${({ isonleft }) => isonleft && "0"};
  }

  &::before {
    content: " ";
    border: solid transparent;
    border-top-color: ${({ isontop, bordercolor }) => isontop && bordercolor};
    border-bottom-color: ${({ isonbottom, bordercolor }) => isonbottom && bordercolor};
    border-left-color: ${({ isonleft, bordercolor }) => isonleft && bordercolor};
    border-right-color: ${({ isonright, bordercolor }) => isonright && bordercolor};
    border-width: ${CONTAINER_ARROW_SIZE};
    border-top-width: ${({ isonbottom }) => isonbottom && "0"};
    border-bottom-width: ${({ isontop }) => isontop && "0"};
    border-left-width: ${({ isonright }) => isonright && "0"};
    border-right-width: ${({ isonleft }) => isonleft && "0"};
  }
`;

export const TooltipContainer = ({ domRef, style, placement, arrowProps, children }) => {
  return (
    <div ref={domRef} style={style}>
      <StyledContainer placement={placement}>{children}</StyledContainer>
      <StyledContainerShadow placement={placement} />
      <StyledContainerArrow placement={placement} innerRef={arrowProps.ref} style={arrowProps.style} />
    </div>
  );
};

TooltipContainer.propTypes = {
  domRef: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  placement: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  arrowProps: PropTypes.object.isRequired
};

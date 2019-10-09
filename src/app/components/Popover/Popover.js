import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Arrow = styled.div`
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.gray500};
`;

const ArrowUp = styled(Arrow)`
  position: absolute;
  bottom: ${prop => (prop.title ? "-125px" : "-18px")};
  left: 0;
  right: 0;

  :after,
  :before {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  :after {
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #ffffff;
    border-width: 5px;
    margin-left: -5px;
  }

  :before {
    border-color: rgba(0, 0, 0, 0);
    border-bottom-color: ${({ theme }) => theme.color.gray500};
    border-width: 6px;
    margin-left: -6px;
  }
`;

const ArrowDown = styled(Arrow)`
  position: absolute;
  left: 0;
  right: 0;

  :after,
  :before {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  :after {
    border-color: rgba(255, 255, 255, 0);
    border-top-color: #ffffff;
    border-width: 5px;
    margin-left: -5px;
  }

  :before {
    border-color: rgba(0, 0, 0, 0);
    border-top-color: ${({ theme }) => theme.color.gray500};
    border-width: 6px;
    margin-left: -6px;
  }
`;

const ArrowLeft = styled(Arrow)`
  position: absolute;

  :after,
  :before {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  :after {
    border-color: rgba(255, 255, 255, 0);
    border-right-color: #ffffff;
    border-width: 5px;
    margin-top: -5px;
  }

  :before {
    border-color: rgba(0, 0, 0, 0);
    border-right-color: ${({ theme }) => theme.color.gray500};
    border-width: 6px;
    margin-top: -6px;
  }
`;

const StyledPopover = styled.div`
  padding: 9px 14px;
  height: min-content;
  word-break: break-word;
  font: 12px "Open Sans", "Zoram ldslat", "noto sans", Helvetica, Arial, sans-serif;
  background-color: ${props => props.backgroundColor};
`;

const PopoverTitle = styled(StyledPopover)`
  background-color: #e9e9e9;
  width: 100%;
  ${({ theme }) => theme.fontSize(16)};
`;

const NoArrowStyledPopover = styled(StyledPopover)`
  position: relative;
  z-index: 10000;
  background-color: #e9e9e9;
`;

const PopoverContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Popover = ({
  backgroundColor = "transparent",
  includeArrow = true,
  arrowOrientation = "left",
  children,
  title = ""
}) => {
  const _render = (includeArrow, arrowOrientation) => {
    if (includeArrow) {
      switch (arrowOrientation) {
        case "down":
          return (
            <ArrowDown title={title}>
              <StyledPopover backgroundColor={backgroundColor}>{children}</StyledPopover>
            </ArrowDown>
          );
        case "up":
          return (
            <ArrowUp title={title}>
              {title && <PopoverTitle>{title}</PopoverTitle>}
              <StyledPopover backgroundColor={backgroundColor}>{children}</StyledPopover>
            </ArrowUp>
          );
        case "left":
        default:
          return (
            <ArrowLeft>
              <StyledPopover backgroundColor={backgroundColor}>{children}</StyledPopover>
            </ArrowLeft>
          );
      }
    } else {
      return <NoArrowStyledPopover backgroundColor={backgroundColor}>{children}</NoArrowStyledPopover>;
    }
  };

  return (
    <PopoverContainer backgroundColor={backgroundColor}>{_render(includeArrow, arrowOrientation)}</PopoverContainer>
  );
};

Popover.propTypes = {
  arrowOrientation: PropTypes.oneOf(["up", "down", "left", "right"]),
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
  includeArrow: PropTypes.bool
};

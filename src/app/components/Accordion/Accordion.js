import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon";
import styled from "styled-components";

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: ${props => props.justifyContent};
  background-color: ${props => props.theme.color[props.color]};
  ${props => props.theme.fontSize(14)};
`;

const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelWrapper = styled.div`
  padding: 10px;
`;

export const Accordion = ({
  children,
  color,
  closed,
  hasIcon,
  header,
  headerBackgroundColor,
  iconColor,
  iconFlexDirection,
  iconExpand,
  iconFontFamily,
  iconRotateDeg,
  iconName,
  iconSize,
  justifyContent,
  label,
  onClick
}) => {
  const [localClosed, setLocalClosed] = useState(closed);

  return (
    <AccordionContainer color={color} justifyContent={justifyContent}>
      <div onClick={() => setLocalClosed(!localClosed)}>
        {hasIcon ? (
          <>
            <LabelWrapper>
              <Icon
                fontSize={iconSize}
                name={iconName}
                color={iconColor}
                flexDirection={iconFlexDirection}
                expand={iconExpand}
              />
            </LabelWrapper>
            {!localClosed && <ChildrenContainer>{children}</ChildrenContainer>}
          </>
        ) : (
          <>
            <LabelWrapper>
              <div>{label}</div>
            </LabelWrapper>
            {!localClosed && <ChildrenContainer>{children}</ChildrenContainer>}
          </>
        )}
      </div>
    </AccordionContainer>
  );
};

Accordion.propTypes = {
  color: PropTypes.string,
  closed: PropTypes.bool,
  hasIcon: PropTypes.bool,
  header: PropTypes.node,
  headerBackgroundColor: PropTypes.string,
  iconName: PropTypes.string,
  iconExpand: PropTypes.bool,
  iconFontFamily: PropTypes.string,
  iconRotateDeg: PropTypes.number,
  iconSize: PropTypes.number,
  justifyContent: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func
};

Accordion.defaultProps = {
  closed: true,
  hasIcon: false,
  iconExpand: false,
  iconFontFamily: "fontFamilyGlyphiconsHalflings",
  justifyContent: "flex-start"
};

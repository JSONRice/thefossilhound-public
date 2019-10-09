import React from "react";
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

/**
 * Accordion is nearly a Higher Order Component (HOC) in the fact that it encapsulates an Icon and when that
 * Icon is clicked an onClick callback provided should toggle the closed state.
 */
export class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: props.closed
    };
  }

  render() {
    let {
      props: {
        children,
        hasIcon,
        iconColor,
        iconFlexDirection,
        iconExpand,
        iconName,
        iconSize,
        label,
        color,
        justifyContent
      },
      state: { closed }
    } = this;

    return (
      <AccordionContainer color={color} justifyContent={justifyContent}>
        <div onClick={() => this.setState({ closed: !closed })}>
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
              {!closed && <ChildrenContainer>{children}</ChildrenContainer>}
            </>
          ) : (
            <>
              <LabelWrapper>
                <div>{label}</div>
              </LabelWrapper>
              {!closed && <ChildrenContainer>{children}</ChildrenContainer>}
            </>
          )}
        </div>
      </AccordionContainer>
    );
  }
}

Accordion.propTypes = {
  color: PropTypes.string,
  closed: PropTypes.bool,
  justifyContent: PropTypes.string,
  hasIcon: PropTypes.bool,
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  iconExpand: PropTypes.bool,
  iconSize: PropTypes.number,
  label: PropTypes.string
};

Accordion.defaultProps = {
  closed: true,
  hasIcon: false,
  iconExpand: false,
  justifyContent: "flex-start"
};

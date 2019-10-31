import React from "react";
import PropTypes from "prop-types";
import { pickGlobalHtmlAttributePropsService } from "../../services/pick-global-html-attribute-props-service";
import theme from "../../styles/theme";

import styled from "styled-components";

const StyledWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  ${theme.fontSize(64)};
`;

const StyledSVG = styled.svg`
  width: 2em;
  height: 2em;
`;

// Pointer (reference) to the setTimeout function
let timeoutFunc;

export class Spinner extends React.PureComponent {
  state = {
    hidden: this.props.delay > 0,
    timeout: () => {
      let self = this;
      timeoutFunc = setTimeout(() => {
        self.show();
      }, self.props.delay);
    }
  };

  componentDidMount() {
    this.state.timeout();
  }

  /**
   * In case the setTimeout hasn't finished running make sure to clear it.
   */
  componentWillUnmount() {
    clearTimeout(timeoutFunc);
  }

  show = () => this.setState({ hidden: false });

  static propTypes = {
    delay: PropTypes.number,
    fill: PropTypes.string,
    size: PropTypes.oneOf(["font-size", "large"]),
    spinnerClassName: PropTypes.string
  };

  static defaultProps = {
    delay: 1000
  };

  render() {
    let { fill = "#000", size = "font-size", spinnerClassName, ...props } = this.props;
    const { hidden } = this.state;

    return (
      !hidden && (
        <StyledWrapper {...pickGlobalHtmlAttributePropsService(props)} size={size} aria-hidden="true">
          <StyledSVG
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            className="uil-default"
          >
            <rect x="0" y="0" width="100" height="100" fill="none" className="bk" />
            <rect
              x="46.5"
              y="40"
              width="7"
              height="20"
              rx="5"
              ry="5"
              fill={fill}
              transform="rotate(0 50 50) translate(0 -30)"
            >
              <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite" />
            </rect>
            <rect
              x="46.5"
              y="40"
              width="7"
              height="20"
              rx="5"
              ry="5"
              fill={fill}
              transform="rotate(30 50 50) translate(0 -30)"
            >
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur="1s"
                begin="0.08333333333333333s"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              x="46.5"
              y="40"
              width="7"
              height="20"
              rx="5"
              ry="5"
              fill={fill}
              transform="rotate(60 50 50) translate(0 -30)"
            >
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur="1s"
                begin="0.16666666666666666s"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              x="46.5"
              y="40"
              width="7"
              height="20"
              rx="5"
              ry="5"
              fill={fill}
              transform="rotate(90 50 50) translate(0 -30)"
            >
              <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.25s" repeatCount="indefinite" />
            </rect>
            <rect
              x="46.5"
              y="40"
              width="7"
              height="20"
              rx="5"
              ry="5"
              fill={fill}
              transform="rotate(120 50 50) translate(0 -30)"
            >
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur="1s"
                begin="0.3333333333333333s"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              x="46.5"
              y="40"
              width="7"
              height="20"
              rx="5"
              ry="5"
              fill={fill}
              transform="rotate(150 50 50) translate(0 -30)"
            >
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur="1s"
                begin="0.4166666666666667s"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              x="46.5"
              y="40"
              width="7"
              height="20"
              rx="5"
              ry="5"
              fill={fill}
              transform="rotate(180 50 50) translate(0 -30)"
            >
              <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5s" repeatCount="indefinite" />
            </rect>
            <rect
              x="46.5"
              y="40"
              width="7"
              height="20"
              rx="5"
              ry="5"
              fill={fill}
              transform="rotate(210 50 50) translate(0 -30)"
            >
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur="1s"
                begin="0.5833333333333334s"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              x="46.5"
              y="40"
              width="7"
              height="20"
              rx="5"
              ry="5"
              fill={fill}
              transform="rotate(240 50 50) translate(0 -30)"
            >
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur="1s"
                begin="0.6666666666666666s"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              x="46.5"
              y="40"
              width="7"
              height="20"
              rx="5"
              ry="5"
              fill={fill}
              transform="rotate(270 50 50) translate(0 -30)"
            >
              <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.75s" repeatCount="indefinite" />
            </rect>
            <rect
              x="46.5"
              y="40"
              width="7"
              height="20"
              rx="5"
              ry="5"
              fill={fill}
              transform="rotate(300 50 50) translate(0 -30)"
            >
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur="1s"
                begin="0.8333333333333334s"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              x="46.5"
              y="40"
              width="7"
              height="20"
              rx="5"
              ry="5"
              fill={fill}
              transform="rotate(330 50 50) translate(0 -30)"
            >
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur="1s"
                begin="0.9166666666666666s"
                repeatCount="indefinite"
              />
            </rect>
          </StyledSVG>
        </StyledWrapper>
      )
    );
  }
}

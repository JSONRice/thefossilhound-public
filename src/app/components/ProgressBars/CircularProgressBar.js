import { Component } from "react";
import styled from "styled-components";
import theme from "../../styles/theme.js";
import React from "react";

const BackgroundCircle = styled.circle`
  fill: none;
  stroke: ${theme.color.blue1150};
`;

const Progress = styled.circle`
  fill: none;
  stroke-linecap: round;
`;

const Percent = styled.text`
  font-family: ${theme.font.fontFamilySans};
  ${props => (props.size > 3 ? theme.fontSize(24) : theme.fontSize(28))};
`;

const Text = styled.text`
  font-family: ${theme.font.fontFamilySans};
  ${theme.fontSize(12)};
`;

const StyledSvg = styled.svg`
  ${props => (props.warning ? `fill: ${theme.color.red1100}` : `fill: ${theme.color.black900}`)};
`;

class CircularProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // sqSize is the size of the enclosing square
    let { balance, percentage, sqSize, strokeWidth, text } = this.props;
    let isNumber = typeof percentage === "number";
    let percentText = isNumber ? text : "";
    let warning = !isNumber || balance < 0;

    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (sqSize - strokeWidth) / 2;
    // Enclose circle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    let percent = !isNumber || percentage > 100 ? 100 : percentage;
    const dashOffset = dashArray - (dashArray * percent) / 100;

    return (
      <StyledSvg warning={warning} width={sqSize} height={sqSize} viewBox={viewBox}>
        <BackgroundCircle
          className="circle-background"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <Progress
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            stroke: (!isNumber && percentage === "!") || balance < 0 ? theme.color.red1100 : theme.color.blue1650
          }}
        />
        <Percent x="50%" y="50%" dy=".3em" textAnchor="middle" size={percentage.toString().length}>
          {percentage > 9999 ? "9999%" : isNumber ? `${percentage}%` : `${percentage}`}
        </Percent>
        <Text className="circle-text" x="50%" y="70%" dy=".3em" textAnchor="middle" fill={theme.color.black900}>
          {percentText}
        </Text>
      </StyledSvg>
    );
  }
}

CircularProgressBar.defaultProps = {
  sqSize: 105,
  percentage: 25,
  strokeWidth: 11,
  text: "label.spent"
};

export default CircularProgressBar;

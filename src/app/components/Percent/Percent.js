import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

const StyledPercent = styled.div`
  color: ${props => (props.balance < 0 ? theme.color.red1100 : "inherit")};
`;

/***
 * Percent component
 *
 * @param balance
 * @param percent
 * @returns {*}
 * @constructor
 */
export const Percent = ({ percent = 0, balance = 0 }) => {
  /**
   * If the percentage value is a dash don't do anything.
   *
   * If the percentage value is greater than one hundred apply red to the font.
   * Prepend percentage values with a '%' character.
   *
   * @param percent
   * @returns {string}
   * @private
   */
  const _formatPercent = (percent = "-") => (percent === "-" ? percent : `${percent}%`);

  return <StyledPercent balance={balance}>{_formatPercent(percent)}</StyledPercent>;
};

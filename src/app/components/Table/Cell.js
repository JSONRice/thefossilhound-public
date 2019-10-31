import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

let StyledCell = styled.div`
  display: flex;
  flex: 1;
  ${props => props.wordWrap && `word-wrap: break-word`};
  width: 0;
  padding-left: ${props => props.indent};
  justify-content: ${props => (props.justifyContent ? props.justifyContent : "flex-start")};
  ${props => props.width && `min-width: ${props.width};`}
`;

export const Cell = ({ children, justifyContent, onClick, indent, width, wordWrap }) => {
  return (
    <StyledCell width={width} justifyContent={justifyContent} onClick={onClick} indent={indent} wordWrap={wordWrap}>
      {children}
    </StyledCell>
  );
};

Cell.propTypes = {
  children: PropTypes.node.isRequired,
  justifyContent: PropTypes.string,
  onClick: PropTypes.func,
  indent: PropTypes.string,
  width: PropTypes.string,
  wordWrap: PropTypes.bool
};

Cell.defaultProps = {
  width: "16.66%",
  wordWrap: true
};

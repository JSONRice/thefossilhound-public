import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: ${props => {
    if (props.column) {
      return "column";
    }
    return "row";
  }};
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : "flex-start"};
`;

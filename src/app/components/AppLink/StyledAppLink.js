import styled from "styled-components";

export const StyledAppLink = styled.span`
  * {
    color: ${props => (props.noColor ? props.theme.color.black900 : props.theme.color.blue800)};
    text-decoration: none;
  }

  a:hover {
    color: ${props => (props.noColor ? props.theme.color.black900 : props.theme.color.blue2100)};
  }

  &:not(:last-child) {
    margin-right: 1em;
  }
`;

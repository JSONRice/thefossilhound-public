import styled from "styled-components";

/**
 * Search field for filter bar
 *
 * @type {StyledComponentClass<React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>, any, P>}
 */
export const Search = styled.input`
  height: 29px;
  border: 1px solid ${({ theme }) => theme.color.gray500};
  border-radius: 13px;
  color: ${({ theme }) => theme.color.black700};
  padding-left: 7px;
`;

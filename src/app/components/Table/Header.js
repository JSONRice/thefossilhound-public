import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.containers.borderDarkColor};
  border-bottom: 1px solid ${({ theme }) => theme.containers.borderDarkColor};
  text-transform: uppercase;
`;

import styled from "styled-components";

// A card is just a super row (collection of rows)
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.font.fontFamilySans};
  ${({ theme }) => theme.fontSize(12)};
  line-height: 20px;
  :nth-child(even) {
    background-color: ${({ theme }) => theme.containers.responsiveRowEven};
  }
`;

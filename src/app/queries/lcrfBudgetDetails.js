import gql from "graphql-tag";

export const lcrfBudgetDetails = gql`
  query lcrfBudgetDetails($input: LcrfBudgetDetailCriteria!) {
    lcrfBudgetDetails(input: $input) {
      internalAccountId
      transactionId
      postedDate
      reference
      transactionTypeId
      classificationType
      subcategoryName
      subcategoryId
      subcategorySortOrder
      unitSubcategoryId
      unitSubcategoryName
      description
      amount
    }
  }
`;

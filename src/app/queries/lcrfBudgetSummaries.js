import gql from "graphql-tag";

export const LCRF_BUDGET_SUMMARIES_QUERY = gql`
  query lcrfBudgetSummaries($input: LcrfBudgetSummaryCriteria!) {
    lcrfBudgetSummaries(input: $input) {
      internalAccountId
      subcategoryId
      subcategoryName
      unitSubcategoryId
      unitSubcategoryName
      sortOrder
      budgetAssignedAmount
      previousActivityAmount
      incomeAmount
      expenseAmount
      transferAmount
      lines {
        internalAccountId
        subcategoryId
        subcategoryName
        unitSubcategoryId
        unitSubcategoryName
        sortOrder
        budgetAssignedAmount
        previousActivityAmount
        incomeAmount
        expenseAmount
        transferAmount
      }
    }
  }
`;

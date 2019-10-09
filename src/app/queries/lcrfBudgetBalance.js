import gql from "graphql-tag";

export const lcrfBudgetBalance = gql`
  query lcrfBudgetBalance($input: LcrfBudgetBalanceCriteria!) {
    lcrfBudgetBalance(input: $input) {
      internalAccountId
      name
      balance
      assignedBudget
    }
  }
`;

import gql from "graphql-tag";

export const getBanks = gql`
  query getBanks($input: BankCriteria) {
    getBanks(input: $input) {
      id
      approvalStatus
      name
      status
      country
      location
      numActiveExternalAccounts
    }
  }
`;

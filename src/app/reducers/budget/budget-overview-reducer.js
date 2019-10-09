import { getGraphQLDate } from "../../services/date-formatter-service";
import { applyCustomDateSubmitted, currentYearClicked, previousYearClicked } from "../../utils/budget-utils";

export const BS_UPDATE_FILTER_FIELD = "BS_UPDATE_FILTER_FIELD";
export const BS_CLEAR = "BS_CLEAR";

const currentYear = new Date().getFullYear();
const currentYearFromDate = new Date(currentYear, 0, 1);
const currentYearToDate = new Date(currentYear, 11, 31);

const initialState = {
  variables: {
    input: {
      dateFrom: getGraphQLDate(currentYearFromDate),
      dateTo: getGraphQLDate(currentYearToDate)
    }
  },
  dateType: "current",
  fromMonth: "",
  subcategoryId: null,
  subcategoryName: "",
  toMonth: "",
  unitSubcategoryId: null,
  unitSubcategoryName: "",
  year: ""
};

// Subscriber (Reducer)
const budgetSummary = (state = initialState, action) => {
  switch (action.type) {
    case BS_UPDATE_FILTER_FIELD:
      let results = {
        ...state,
        ...action.field
      };

      // Date type fields require updated variables for GraphQL:
      switch (action.field.dateType) {
        case "previous":
          results.variables = previousYearClicked();
          break;
        case "current":
          results.variables = currentYearClicked();
          break;
        case "custom":
          results.variables = applyCustomDateSubmitted(state);
          break;
      }

      return results;
    case BS_CLEAR:
      return {
        subcategoryId: 0,
        subcategoryName: "",
        unitSubcategoryId: 0,
        unitSubcategoryName: "",
        variables: initialState.variables
      };
    default:
      return state;
  }
};

export default budgetSummary;

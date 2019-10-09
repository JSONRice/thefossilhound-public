import { BS_UPDATE_FILTER_FIELD, BS_CLEAR } from "../../reducers/budget/budget-overview-reducer";

// Publishers (dispatched actions):

// Current & previous year along with custom dates. Any field in the filter bar.
export const updateFilterField = field => {
  return {
    type: BS_UPDATE_FILTER_FIELD,
    field
  };
};

export const clear = () => {
  return {
    type: BS_CLEAR
  };
};

import { combineReducers } from "redux";

import budgetSummary from "./budget/budget-overview-reducer";
import security from "./security-reducer";
import menu from "./menu-reducer";
import tabs from "./tabs-reducer";

export default combineReducers({
  budgetSummary,
  security,
  menu,
  tabs
});

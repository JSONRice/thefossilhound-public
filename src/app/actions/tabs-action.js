import { UPDATE_TAB } from "../reducers/tabs-reducer";

export function updateTab(activeKey) {
  return {
    type: UPDATE_TAB,
    activeKey
  };
}

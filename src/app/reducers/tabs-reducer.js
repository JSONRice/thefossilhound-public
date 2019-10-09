export const UPDATE_TAB = "UPDATE_TAB";

const initialState = {};

const tabs = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TAB:
      return { ...state, activeKey: action.activeKey };
    default:
      return state;
  }
};

export default tabs;

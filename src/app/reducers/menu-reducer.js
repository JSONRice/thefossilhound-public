export const UPDATE_MENU = "UPDATE_MENU";

const initialState = {};

const menu = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MENU:
      return { ...state, items: action.items };
    default:
      return state;
  }
};

export default menu;

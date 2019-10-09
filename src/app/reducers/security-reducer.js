export const UPDATE_ACCESS_MAP = "UPDATE_ACCESS_MAP";
export const UPDATE_ACCESSIBLE_UNITS = "UPDATE_ACCESSIBLE_UNITS";
export const UPDATE_UNIT = "UPDATE_UNIT";
export const UPDATE_INTERNAL_ACCOUNT = "UPDATE_INTERNAL_ACCOUNT";

const initialState = {};

const security = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACCESS_MAP:
      return { ...state, accessMaps: action.accessMaps };
    case UPDATE_ACCESSIBLE_UNITS:
      return { ...state, accessibleUnits: action.accessibleUnits };
    case UPDATE_UNIT:
      return { ...state, unit: action.unit };
    case UPDATE_INTERNAL_ACCOUNT:
      return { ...state, internalAccount: action.internalAccount };
    default:
      return state;
  }
};

export default security;

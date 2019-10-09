import { expressGet } from "../utils/rest";
import { UPDATE_MENU } from "../reducers/menu-reducer";
import logger from "../../server/utils/logger";


export function getMenu(orgId) {
  return dispatch => {
    let url = ''; // `${credentials.endpoint}/menu?orgId=${orgId}`;
    logger.info(`getMenu url: ${url}`);
    expressGet(url).then(data => {
      dispatch(updateMenu(data));
    });
  };
}

export function updateMenu(items) {
  return {
    type: UPDATE_MENU,
    items
  };
}

import { GET } from "./http-utils";
import logger from "../../server/utils/logger";

let user = {
  cubsUser: undefined,
  hasProxySupport: false,
  hasAccess: false, // CUBS access
  locale: "en-US"
};

export function loadInitializationData() {
  // return new Promise((resolve, reject) => {
  //   GET(`${credentials.endpoint}/initializationData`)
  //     .then(data => {
  //       user = data;
  //       resolve(data);
  //     })
  //     .catch(e => {
  //       logger.error(`loadInitializationData GET initializationData failure: ${e}`);
  //       reject(e);
  //     });
  // });
}

export function getLocale() {
  return user.locale;
}

export function getFeaturePaths() {
  return user.featurePaths;
}

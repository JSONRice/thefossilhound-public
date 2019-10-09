import { getOrCreateStore } from "../lib/withReduxStore";
import { getFeaturePaths } from "../utils/initialization";

export function getUnit(units, orgId) {
  if (!units) {
    return null;
  }
  if (orgId) {
    return units.find(unit => {
      return unit.orgId === parseInt(orgId);
    });
  }
  // if not found by orgId then return first unit
  return units[0];
}

export function getInternalAccount(internalAccounts, internalAccountId) {
  if (!internalAccounts) {
    return null;
  }
  if (internalAccountId) {
    return internalAccounts.find(internalAccount => {
      return internalAccount.internalAccountId === parseInt(internalAccountId);
    });
  }
  // if not found by orgId then return first internal account
  return internalAccounts[0];
}

export function hasAccess(feature) {
  const store = getOrCreateStore();
  const state = store.getState();
  const featurePaths = getFeaturePaths();
  let { accessMaps, internalAccount, unit } = state.security;
  if (featurePaths) {
    let actualPath = featurePaths[feature];
    if (actualPath) {
      if (internalAccount) {
        return accessMaps[
          "internalAccountId-" + internalAccount.internalAccountId
        ][actualPath];
      } else if (unit && accessMaps["orgId-" + unit.orgId]) {
        return accessMaps["orgId-" + unit.orgId][actualPath];
      }
    }
  }
  return false;
}

export function hasAnyAccess(feature) {
  const store = getOrCreateStore();
  const state = store.getState();
  let { accessMaps } = state.security;
  const featurePaths = getFeaturePaths();
  let anyHaveAccess = false;
  if (accessMaps && featurePaths) {
    let actualPath = featurePaths[feature];
    if (actualPath) {
      let values = Object.keys(accessMaps).map(e => accessMaps[e]);
      values.forEach(accessMap => {
        if (accessMap && accessMap[actualPath]) {
          return (anyHaveAccess = true);
        }
      });
    }
  }
  return anyHaveAccess || hasAccess(feature);
}

export function getCurrencyCode(internalAccounts, internalAccountId) {
  let internalAccount = getInternalAccount(internalAccounts, internalAccountId);
  return internalAccount ? internalAccount.isoCurrencyCode : undefined;
}

/**
 * Validate that we have some data and then pull out the internal account id from that data set and use that to
 * acquire the currency code.
 */
export const getCurrencyCodeFromData = (internalAccounts, data) => {
  if (data && Array.isArray(data) && data.length > 0) {
    return getCurrencyCode(internalAccounts, data[0].internalAccountId);
  }
  return undefined;
};

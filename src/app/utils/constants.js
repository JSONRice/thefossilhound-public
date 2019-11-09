import theme from "../styles/theme";

export const responseStatus = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
};

export const tabletBreakPoint = `(min-width: ${theme.media.mobileMax + 1}px)`;
export const desktopBreakPoint = `(min-width: ${theme.media.tabletMax + 1}px)`;
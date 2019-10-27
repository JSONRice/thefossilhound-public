// No base url since NextJS handles all the routing.
// In other words the href can include the full path or a relative path.
export const buildUrl = (href, hooks = {}) => {
  let url = `${href}`;
  if (Object.keys(hooks).length > 0) {
    Object.keys(hooks).forEach((key, index) => {
      url = index === 0 ? `${url}?` : `${url}&`;
      url = `${url}${key}=${hooks[key]}`;
    });
  }
  return url;
};

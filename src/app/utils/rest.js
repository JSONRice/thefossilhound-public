import Router from "next/dist/lib/router";

export const expressGet = url => {
  return fetch(url, { credentials: "include" })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw res;
    })
    .catch(err => {
      console.log(err);
      const href = `/_error?statusCode=${err.status}`;
      const as = "/_error";
      Router.push(href, as, {
        shallow: true,
        query: { statusCode: err.status }
      });
    });
};

export const expressGetBlob = url => {
  return fetch(url, { credentials: "include" })
    .then(res => {
      if (res.ok) {
        return res.blob();
      }
      throw res;
    })
    .catch(err => {
      console.log(err);
      const href = `/_error?statusCode=${err.status}`;
      const as = "/_error";
      Router.push(href, as, {
        shallow: true,
        query: { statusCode: err.status }
      });
    });
};

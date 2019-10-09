export const GET = async endpoint => {
  try {
    let res = await fetch(endpoint, {
      method: "GET",
      credentials: "include"
    });
    return await res.json();
  } catch (e) {
    return Promise.reject(`HTTP GET failed with error: ${e}`);
  }
};

export const POST = async (endpoint, body = {}) => {
  try {
    let res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "include"
    });
    return await res.json();
  } catch (e) {
    return Promise.reject(`HTTP POST failed with error: ${e}`);
  }
};

export const DELETE = async endpoint => {
  try {
    let res = await fetch(endpoint, {
      method: "DELETE",
      credentials: "include"
    });
    return await res.json();
  } catch (e) {
    return Promise.reject(`HTTP POST failed with error: ${e}`);
  }
};

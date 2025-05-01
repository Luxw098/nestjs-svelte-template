export const LocalData = {
  timestamp: "",
  username: "",
  channels: [{ channel: "", history: "" }]
};

export const getLocalData = async () => {
  const local_data = localstorage.getItem("local_data");
  return local_data ? JSON.parse(local_data) : null;
};

export const setLocalData = async (data) => {
  const local_data = JSON.stringify(data);
  localstorage.setItem("local_data", local_data);
  return local_data;
};

export const getCookies = async () => {
  const cookieString = document.cookie;
  const cookieArray = cookieString.split(';');
  return cookieArray.reduce((cookieObject, cookie) => {
    const [key, value] = cookie.trim().split('=');
    cookieObject[key] = value;
    return cookieObject;
  }, {});
};

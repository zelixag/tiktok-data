import http from '../utils/http';
import Cookies from 'js-cookie';
import setHttp from "../utils/setHttp";
const constants = {
  API_ORIGIN: "/api",
};

export async function login(username?: string, password?: string) {
  // if(Cookies.get('LOGIN-TOKEN-FORSNS')) return
  const res = await http.postForm(`${constants.API_ORIGIN}/v1/access/token`, {
    appId: 10000,
    timeStamp: 1629103627,
    username: username || "15311093065",
    password: password|| "d8c3a6488774387f20764386c1ab7861",
  });
  const cookieOption = {
    expires: 365
  };
  if (res) {
    Cookies.set('LOGIN-TOKEN-FORSNS', res.token, cookieOption);
    setHttp();
  }
  return res;
}

import http from '../utils/http';
import Cookies from 'js-cookie';
import setHttp from "../utils/setHttp";
import constants from '../utils/constants';
import { getUrl } from '../utils/getUrl';

export async function login(username?: string, password?: string) {
  const res = await http.postForm(getUrl(`/v1/access/token`), {
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

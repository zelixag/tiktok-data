import http from '../utils/http';
import Cookies from 'js-cookie';
import setHttp from "../utils/setHttp";
import constants from '../utils/constants';
import { getUrl } from '../utils/getUrl';
import md5 from 'js-md5';

export async function login(username: string, password: string) {
  console.log(md5(password))
  // "15311093065"
  // "wangyun1"
  const res = await http.postForm(getUrl(`/v1/access/token`), {
    appId: 10000,
    timeStamp: 1629103627,
    username: username,
    password: md5(password)
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

import http from './http';
import Cookies from 'js-cookie';
import { getSSOToken, SSOLoginPlatformType } from "tezign-foundation-common/lib/utils/auth";

/**
 * 初始化`commons.js/http`
 */
export default () => {
  const token = getSSOToken(SSOLoginPlatformType.Vms);
  if (token) {
    http.defaults.headers['Cookie'] = `${token};domain='.chanmama.com';path=/;`;
  }
};

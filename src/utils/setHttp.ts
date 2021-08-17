import http from './http';
import Cookies from 'js-cookie';

/**
 * 初始化`commons.js/http`
 */
export default () => {
  const token = Cookies.get('LOGIN-TOKEN-FORSNS')
  if (token) {
    http.defaults.headers['Cookie'] = `${token};domain='.chanmama.com';path=/;`;
  }
};

import constants from "./constants";

/**
 * 拼接代理URL
 * @param url 
 * @returns 
 */
export function getUrl(url: string) {
  if (url.indexOf('http') === 0) return url;
  return `${constants.API_ORIGIN}${url}`;
}

/**
 * 将参数拼接成get请求的方式
 * @param url get请求的链接
 * @param data get请求的数据
 * @returns getUrl方法，get请求的完整链接
 */
export function getUrlWithParams(url: string, data: Partial<{ [key: string]: string | number | boolean }> = {}) {
  let paramsStr = Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key] || '')}`)
    .join('&');
  if (paramsStr) paramsStr = `?${paramsStr}`;

  return getUrl(`${url}${paramsStr}`);
}
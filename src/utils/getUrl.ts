
const constants = {
  API_ORIGIN: import.meta.env.MODE === 'development' ? "/api" : '/api',
};
export function getUrl(url: string) {
  if (url.indexOf('http') === 0) return url;
  return `${constants.API_ORIGIN}${url}`;
}

export function getUrlWithParams(url: string, data: Partial<{ [key: string]: string | number | boolean }> = {}) {
  let paramsStr = Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key] || '')}`)
    .join('&');
  if (paramsStr) paramsStr = `?${paramsStr}`;

  return getUrl(`${url}${paramsStr}`);
}
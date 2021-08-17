
const constants = {
  API_ORIGIN: import.meta.env.MODE === 'development' ? "/api" : 'https://api-service.chanmama.com',
};
export default function getUrl(url: string) {
  if (url.indexOf('http') === 0) return url;
  return `${constants.API_ORIGIN}${url}`;
}

const constants = {
  API_ORIGIN: "/api",
};
export default function getUrl(url: string) {
  if (url.indexOf('http') === 0) return url;
  return `${constants.API_ORIGIN}${url}`;
}
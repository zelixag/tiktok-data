

import http from '../utils/http';
import {getUrlWithParams} from "../utils/getUrl";

export async function getAwemeList(params: any) {
  return http.get(getUrlWithParams(`/v1/home/aweme/search`, params), params);
}
export async function getAwemeProductList(params: any) {
  return http.get(getUrlWithParams(`/v1/aweme/detail/getProductInfo`, params), params);
}
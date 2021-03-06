

import http from '../utils/http';
import {getUrl} from "../utils/getUrl";

export async function getProductList(params: any) {
  return http.post(getUrl(`/v1/product/search`), params);
}
export async function getProductCategory(type: string) {
  return http.get(getUrl(`/v1/product/category?type=${type}`), {});
}

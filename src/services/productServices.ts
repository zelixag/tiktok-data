

import http from '../utils/http';
import getUrl from "../utils/getUrl";

const constants = {
  API_ORIGIN: "/api",
};

export async function getProductList(params: any) {
  return http.post(getUrl(`/v1/product/search`), params);
}

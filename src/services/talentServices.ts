

import http from '../utils/http';
import {getUrlWithParams} from "../utils/getUrl";

export async function getTalentList(params: any) {
  return http.get(getUrlWithParams(`/v1/home/author/search`, params), params);
}

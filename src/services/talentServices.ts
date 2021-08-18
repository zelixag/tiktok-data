

import http from '../utils/http';
import {getUrl, getUrlWithParams} from "../utils/getUrl";

export async function getTalentList(params: any) {
  return http.get(getUrlWithParams(`/v1/home/author/search`, params), params);
}
export async function getStarCategory() {
  return http.get(getUrl('/v1/common/starCategory'), {});
}



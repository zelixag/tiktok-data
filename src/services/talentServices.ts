

import http from '../utils/http';
import {getUrl, getUrlWithParams} from "../utils/getUrl";

/**
 *
 * @returns 获取达人信息列表
 */
export async function getTalentList(params: any) {
  return http.get(getUrlWithParams(`/v1/home/author/search`, params), params);
}
/**
 *
 * @returns 获取达人类型Options
 */
export async function getStarCategory() {
  return http.get(getUrl('/v1/common/starCategory'), {});
}



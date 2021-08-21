

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
/**
 *
 * @returns 获取达人详情
 * @params author_id 达人id
 */
export async function getTalentInfo(author_id: string) {
  return http.get(getUrl(`/v1/author/detail/info?author_id=${author_id}`), {});
}
/**
 *
 * @returns 获取达人详情
 * @params author_id 达人id
 */
export async function getTalentLiveOverview(author_id: any) {
  return http.get(getUrl(`/v1/author/detail/liveOverview?author_id=${author_id}`), {});
}
/**
 *
 * @returns 获取达人详情
 * @params author_id 达人id
 */
export async function getAwemeOverview(author_id: string) {
  return http.get(getUrl(`/v1/author/detail/awemeOverview?author_id=${author_id}`), {});
}
/**
 *
 * @returns 获取达人带货商品列表
 * @params author_id 达人id
 */
export async function productAnalysis(params: any) {
  return http.get(getUrlWithParams(`/v1/author/detail/productAnalysis`, params), params);
}



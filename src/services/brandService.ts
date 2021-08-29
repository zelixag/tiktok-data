import http from '../utils/http';
import {getUrl, getUrlWithParams} from "../utils/getUrl";

/**
 *
 * @returns 获取品牌信息列表
 */
export async function getBrandList(params: any) {
  return http.get(getUrlWithParams(`/v1/home/brand/search`, params), params);
}
/**
 *
 * @returns 获取品牌达人信息列表
 */
export async function getBrandTalentList(params: any) {
  return http.get(getUrlWithParams(`/v1/brand/detail/authors`, params), params);
}
/**
 *
 * @returns 获取品牌达人直播信息列表
 */
export async function getBrandTalentRoomsList(params: any) {
  return http.get(getUrlWithParams(`/v1/brand/detail/author/rooms`, params), params);
}
/**
 *
 * @returns 获取品牌达人视频信息列表
 */
export async function getBrandTalentAwemesList(params: any) {
  return http.get(getUrlWithParams(`/v1/brand/detail/author/awemes`, params), params);
}
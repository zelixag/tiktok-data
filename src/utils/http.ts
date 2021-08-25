import fetch from "isomorphic-fetch";
import Cookies from "js-cookie";
import merge from "lodash/merge";
import { login } from "../services/userServices";
import json2formData from "./json2formData";
import parseObjectToUrlParams from "./parseObjectToUrlParams";

let events = {};

/**
 * http 方法
 * @param {string} url - 请求地址
 * @param {object} options - 请求参数
 * @param {string} options.method - 方法类型
 * @param {json} options.body - 请求内容
 * @param {object} options.headers - 请求头
 * @return {Promise} Http 返回结果.
 * @memberof http
 */
function http(url: string, options: any) {
  const { original, params } = options || {};
  if (params) url += "?" + parseObjectToUrlParams(params);
  return fetch(url, options).then(function (response: {
    status: number;
    json: () => Promise<any>;
  }) {
    if (original) return response;

    // 业务数据正常返回
    return response.json().then(function (res) {
      if (res.errCode) {
        Cookies.set('LOGIN-TOKEN-FORSNS', '', {});
      }
      return res.data;
    });
  });
}

http.defaults = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Cookie: ''
  },
};

/**
 * http.get 方法
 * @function http.get
 * @param {string} url - 请求地址
 * @param {object} options - 请求参数
 * @param {object} options.headers - 请求头
 * @return {Promise} Http 返回结果.
 * @memberof http
 */
http.get = function (url: string, options: any) {
  options = options || {};
  options.method = "GET";
  options = merge({}, http.defaults, options);
  return http(url, options);
};

/**
 * http.post 方法
 * @function http.post
 * @param {string} url - 请求地址
 * @param {object} data - 请求内容
 * @param {object} options - 请求参数
 * @param {object} options.headers - 请求头
 * @return {Promise} Http 返回结果.
 * @memberof http
 */
http.post = function (url: string, data: any, options?: any) {
  options = options || {};
  options.body = JSON.stringify(data);
  options.method = "POST";
  options = merge({}, http.defaults, options);
  return http(url, options);
};

// 特殊请求
http.postForm = function (url: string, data: any, options?: any) {
  options = options || {};
  options.body = json2formData(data);
  options.headers = options.headers
    ? {
        ...options.headers,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      }
    : { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" };
  options.method = "POST";
  options = merge({}, http.defaults, options);
  return http(url, options);
};

/**
 * @namespace http
 */
export default http;

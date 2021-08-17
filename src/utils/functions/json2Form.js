/** @module json2Form */

/**
 * 将json数据转换为form表单
 * eg:{name:'hehe',age:12}  ==>  name=hehe&age=12
 * @param {obj} a json对象
 * @return {string}
 */

export default function json2Form(a,prefix='') {
  var s = [], rbracket = /\[\]$/,
    isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }, add = function (k, v) {
      v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
      s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
    };

  var buildParams = function (prefix, obj) {
    var i, len, key;

    if (prefix) {
      if (isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
          if (rbracket.test(prefix)) {
            add(prefix, obj[i]);
          } else {
            buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i]);
          }
        }
      } else if (obj && String(obj) === '[object Object]') {
        for (key in obj) {
          buildParams(prefix + '[' + key + ']', obj[key]);
        }
      } else {
        add(prefix, obj);
      }
    } else if (isArray(obj)) {
      for (i = 0, len = obj.length; i < len; i++) {
        add(obj[i].name, obj[i].value);
      }
    } else {
      for (key in obj) {
        buildParams(key, obj[key]);
      }
    }
    return s;
  };

  return buildParams(prefix, a).join('&').replace(/%20/g, '+');
};
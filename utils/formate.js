import { arrayLen, isRealArray, isObject } from "./comment";

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      date = parseInt(time);
    }
    if (typeof time === "number" && time.toString().length === 10) {
      date = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return timeStr;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  let t;
  if (String(time).length === 10) {
    t = parseInt(time) * 1000;
  } else {
    t = Number(time);
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(t, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  const path = url == null ? window.location.href : url;
  const search = path.substring(path.lastIndexOf("?") + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--;
  }
  return s;
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return "";
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return "";
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    })
  ).join("&");
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, " ") +
      '"}'
  );
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement("div");
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  let res = target;
  if (typeof res !== "object") {
    res = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === "object") {
      res[property] = objectMerge(res[property], sourceProperty);
    } else {
      res[property] = sourceProperty;
    }
  });
  return res;
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += String(className);
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === "start") {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
  }
}
/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr));
}

// 获取所有地址栏参数
export const getAllQuery = () => {
  return getAllQueryString(window.location.href);
};
// 根据地址获取所有地址栏参数
export const getAllQueryString = (src) => {
  const query = {};
  const str = src.substr(src.indexOf("?") + 1, src.length);
  const arr = str.split("&");
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i].indexOf("=");
    if (num > 0) {
      query[arr[i].substring(0, num)] = arr[i].substr(num + 1);
    }
  }
  return query;
};
// 获取地址栏单个已知参数
export const getQueryString = (name) => {
  return getQueryStringByUrl(name, window.location.href);
};
// 根据地址获取参数
export const getQueryStringByUrl = (name, str) => {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  const r = str.substr(str.indexOf("?") + 1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
// coin 是符号， arr 是数组， type 是加载前面还是后面 true 为前，false为后
// 把数组转化为以点隔开的字符串   默认是后面点
export const toPoint = (arr, coin = ",", type = false) => {
  let str = "";
  if (arrayLen(arr) > 0) {
    arr.forEach((it, i) => {
      // 放在前面的时候第一个不放
      // 放在后面的时候最后一个不放
      if ((type && i === 0) || (!type && i === arr.length - 1)) {
        str += it;
      } else {
        str += type ? coin + it : it + coin;
      }
    });
  }
  return str;
};

const deepSetObj = (obj, arr) => {
  for (const it in obj) {
    if (isObject(obj[it])) {
      deepSetObj(obj[it], arr);
    } else {
      arr.push(it + "=" + obj[it]);
    }
  }
};

// 循环对象，并吧有值的键值对写在地址的后边
export const jointUrl = (baseUrl, obj) => {
  if (obj) {
    const arr = [];
    deepSetObj(obj, arr);
    return isRealArray(arr) ? baseUrl + "?" + toPoint(arr, "&") : baseUrl;
  } else {
    return baseUrl;
  }
};

// 循环对象，并吧有值的键值对写在地址的后边
export const jointUrl2 = (baseUrl, obj) => {
  if (obj) {
    const arr = [];
    for (const it in obj) {
      if (isObject(obj[it])) {
        for (const key in obj[it]) {
          const element = obj[it][key];
          arr.push(it + "." + key + "=" + element);
        }
      } else {
        arr.push(it + "=" + obj[it]);
      }
    }
    return isRealArray(arr) ? baseUrl + "?" + toPoint(arr, "&") : baseUrl;
  } else {
    return baseUrl;
  }
};

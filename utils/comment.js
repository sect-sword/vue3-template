// import axios from '@/libs/api.request'
// import * as api from '@/libs/util'
// import * as user from '@/store/module/user'

// 检测是否是数组 返回布尔值
export function isArray(arg) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
// 检测是否是长度大于0的数组
export const isRealArray = (arr) => {
  return arr instanceof Array && arr.length > 0;
};

export function isString(str) {
  if (typeof str === "string" || str instanceof String) {
    return true;
  }
  return false;
}

// 检测是否是数组 不是则返回-1 是则返回长度
export const arrayLen = (arr) => {
  return isArray(arr) ? arr.length : -1;
};

// 检测对象是不是空对象
export const isEmptyObj = (obj) => {
  return Object.keys(obj).length <= 0;
};

// 检测是不是正整数
export const isNumber = (val) => {
  const regPos = /^\d+(\.\d+)?$/; // 非负浮点数
  const regNeg =
    /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; // 负浮点数

  return regPos.test(val) || regNeg.test(val);
};
// 检测对象是否是函数
export const isFunction = (fn) => {
  return typeof fn === "function";
};

// 判读是否非window对象
export const isWindow = (obj) => {
  return obj !== null && obj === obj.window;
};
// 判断参数是不是null
export const isNull = (ele) => {
  return ele === null;
};

// 判断参数是不是空，排除0
export const isNone = (some) => {
  return some === 0 ? true : Boolean(some);
};

// 对象深拷贝
export const deepClone = (obj) => {
  const objClone = isArray(obj) ? [] : {};

  if (obj && typeof obj === "object") {
    for (const key in obj) {
      if (isProperty(obj, key)) {
        // 判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          // 如果不是，简单复制
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
};
// 获取一个元素的样式
export const getCss = (obj, attribute) => {
  if (obj.currentStyle) {
    return obj.currentStyle[attribute];
  } else {
    return window.getComputedStyle(obj, null)[attribute];
  }
};
// 获取当前时间的前几天或后几天
export const GetDateSomeDay = (AddDayCount) => {
  const dd = new Date();

  dd.setDate(dd.getDate() + AddDayCount);
  const y = dd.getFullYear();
  const m =
    dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();

  return y + "-" + m + "-" + d;
};

// 获取对象内某个key的值 不存在key则返回 none
export const getVlaueByKey = (obj, key) => {
  return isProperty(obj, key) ? obj[key] : false;
};

// 获取对象内值等于目标的键值对的 键
export const getKeyByVlaue = (obj, value) => {
  const values = Object.values(obj);

  if (values.includes(value)) {
    let resKey = false;

    for (const key in obj) {
      if (isProperty(obj, key) && obj[key] === value) {
        resKey = key;
        break;
      }
    }
    return resKey;
  } else {
    return false;
  }
};

// 检测某个对象时候含有某个key
export const isProperty = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

// 获取数组对象内某个kye的值是否等于传入的值，有则返回对象，没有则返回 null
export const getObjInArr = (arr, key, val) => {
  if (!arr || arr.length === 0) return false;
  let rs = null;

  arr.forEach((item) => {
    if (isProperty(item, key) && item[key] === val) {
      rs = item;
    }
  });
  return rs;
};

// 获取某个字符串在指定字符串中出现的位置(多个)
export const multipleIndexOf = (subStr, str) => {
  const positions = [];

  let pos = str.indexOf(subStr);

  while (pos > -1) {
    positions.push(pos);
    pos = str.indexOf(subStr, pos + 1);
  }
  return positions;
};

export const downloadFileByBlob = (blobUrl, filename) => {
  const eleLink = document.createElement("a");

  eleLink.download = filename;
  eleLink.style.display = "none";
  eleLink.href = blobUrl;
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};

// 对象拷贝，相对于Object做合并，此方法只拷贝目标对象有的属性的值
export const objCloneHasAtrr = (current, souce) => {
  for (const key in current) {
    if (isProperty(souce, key)) {
      current[key] = souce[key];
    }
  }
  return current;
};

// reverse String
export const reverseStr = (str) => {
  return str.split("").reverse().join("");
};

// 对象去重
export const objectDeWeight = (oldArr) => {
  const result = [];
  const obj = {};

  for (let i = 0; i < oldArr.length; i++) {
    if (!obj[oldArr[i].key]) {
      result.push(oldArr[i]);
      obj[oldArr[i].key] = true;
    }
  }
  return result;
};

// 判断所传参数是否是null或undefined 如果不是null 循环添加到数组
export const getDataAreUndefined = (x) => {
  let res = "";

  if (x === "" || x === undefined) {
    res = null;
  } else {
    const arr = [];

    for (let i = 0; i < x.length; i++) {
      arr.push("'" + x[i] + "'");
    }
    res = arr;
  }
  return res;
};

// 获取字符串的长度  中文计2
export const getRealLen = (str) => {
  return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
};

// 判断返回number  正负数添加正负号
export const checkNum = (num) => {
  if (isNaN(num)) return "--";
  if (num > 0) {
    return "+" + addPercentage(num);
  }
  if (num < 0) {
    return "-" + addPercentage(num.toString().replace(/-/g, ""));
  }
  return addPercentage(num);
};

// 获取字符串的长度
export const getTagLen = (fz, item) => {
  const span = document.createElement("span");
  const result = {};

  result.width = span.offsetWidth;
  // result.height = span.offsetWidth;
  span.style.fontSize = fz;
  span.style.visibility = "hidden";
  document.body.appendChild(span);
  if (typeof span.textContent !== "undefined") span.textContent = item;
  else span.innerText = item;
  result.width = span.offsetWidth - result.width;
  // result.height = span.offsetHeight - result.height;
  span.parentNode.removeChild(span);

  return result.width;
};
// 获取字符串的长度，canvas方法
export const getCharSizeByCanvas = (char, style = {}) => {
  const canvas = document.createElement("canvas");

  canvas.style.positon = "ablsolute";
  const ctx = canvas.getContext("2d");
  const { fontSize = 12, fontFamily = "Arial" } = style;

  document.body.appendChild(canvas);
  ctx.font = `${fontSize}px ${fontFamily}`;
  document.body.removeChild(canvas);
  const text = ctx.measureText(char); // TextMetrics object

  ctx.fillText(char, 50, 50);
  const result = {
    height: fontSize,
    width: text.width,
  };

  return result;
};

// 获取对象的第一个key及value
export const getFirstKeyAndVaule = (obj) => {
  const keys = Object.keys(obj);
  const key = keys.length === 0 ? "" : keys[0];

  return [key, key ? obj[key] : ""];
};

// 根据key和value获取数组内 key=value的对象
export const getObjByProp = (list, checker) => {
  const key = Object.keys(checker)[0];
  const __val = checker[key];

  let res = null;

  list.forEach((item) => {
    if (item[key] === __val) {
      res = item;
    }
  });
  return res;
};

// 获取数组中的重复项
export const getArrayRepeat = (arr) => {
  const noRepear = [];
  const repeat = [];

  arr.forEach((ele) => {
    if (noRepear.indexOf(ele) === -1) {
      noRepear.push(ele);
    } else {
      repeat.push(ele);
    }
  });
  return repeat;
};
// 删除千位字符
export const deletePercentage = (num) => {
  // 删除千位符
  if (String(num).trim() === "") {
    return "";
  }
  return String(num).replace(/,/gi, "");
};

// 添加千位字符
export const addPercentage = (num) => {
  let center = "";
  if (num === undefined) return;
  center = num.toString().replace(/\$|,/g, "");
  const sign = num.indexOf("-") > 0 ? "-" : "";

  let cents = num.indexOf(".") > 0 ? num.substr(num.indexOf(".")) : "";

  cents = cents.length > 1 ? cents : "";
  center = num.indexOf(".") > 0 ? num.substring(0, num.indexOf(".")) : num;
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    center =
      num.substring(0, num.length - (4 * i + 3)) +
      "," +
      num.substring(num.length - (4 * i + 3));
  }
  return sign + center + cents;
};

// 小数点补两位
export const returnFloat = (_value) => {
  let value = Math.round(parseFloat(_value) * 100) / 100;
  const xsd = value.toString().split(".");

  if (xsd.length === 1) {
    value = _value.toString() + ".00";
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = _value.toString() + "0";
    }
  }
  return value;
};

// 把对象的null置为0
export const turnObjNullToZero = (obj) => {
  if (obj instanceof Object) {
    for (const key in obj) {
      if (isNull(obj[key])) {
        obj[key] = 0;
      }
    }
  }
};

export const turnObjectToArray = (obj) => {
  const res = [];

  for (const key in obj) {
    if (isProperty(obj, key)) {
      res.push({
        label: key,
        value: obj[key],
      });
    }
  }
  return res;
};

const getAttr = (id, arr, attr, child) => {
  let res = null;

  arr.forEach((it) => {
    if (it[attr] === id) res = it;
    if (getType(it[child]) === "[object Array]") {
      const val = getAttr(id, it[child], attr, child);

      if (val) res = val;
    }
  });
  return res;
};

export const getType = (target) => {
  return toString.call(target);
};

// 通过key 找到树形对象中的对应对象，
// id为匹配的key的值，target是获取对象的对象，attr是key的名称，child 是对象在目标对象中的tree字段
export const getObjByAttr = (id, target, attr, child) => {
  let arr = [];
  const type = getType(target);

  if (type === "[object Object]") {
    if (id === target[attr]) {
      return target;
    }
    arr = target[child];
  } else if (type === "[object Array]") {
    arr = target;
  }
  return getAttr(id, arr, attr, child);
};

// 把json的null置为0
export const turnNullToZero = (json) => {
  if (json instanceof Array) {
    json.forEach((item) => {
      turnObjNullToZero(item);
    });
  }
};

// 获取数组对象中对象的某个值的集合
export const getArrByKey = (data, pops) => {
  if (!data) return;
  const getArrByKeyRetArr = [];
  const argPops = pops || "value";

  data.forEach((item) => {
    if (isProperty(item, argPops)) {
      getArrByKeyRetArr.push(item[argPops]);
    }
  });
  return getArrByKeyRetArr;
};

// 获取数据中某个key的值的和
export const getTotal = (data, pops) => {
  if (!data) return;
  const key = pops || "value";

  let getTotalRes = 0;

  data.forEach((item) => {
    if (!isNaN(Number(item[key]))) getTotalRes += Number(item[key]);
  });
  return getTotalRes;
};

export const typeOf = (obj) => {
  const class2type = {};
  const typeList =
    "Boolean Number String Function Array Date RegExp Object Error Symbol";
  typeList.split(" ").forEach(function (name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });

  if (obj == null) {
    return String(obj);
  }
  return typeof obj === "object" || typeof obj === "function"
    ? class2type[toString.call(obj)] || "object"
    : typeof obj;
};

// 判断一个对象是不是素对象
export const isPlainObject = (obj) => {
  if (typeof obj !== "object" || obj.nodeType || isWindow(obj)) {
    return false;
  }
  try {
    if (obj.constructor && obj.constructor.prototype === Object.prototype) {
      return true;
    }
  } catch (e) {
    return false;
  }
};

// 防抖
export function debounce(func, wait, immediate) {
  let timeout, result;

  const debounced = function () {
    const context = this;
    const args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      const callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

// 检测某个对象是否为空，每个key都是空值
export const isEmpty = (obj) => {
  let _v = true;

  for (const key in obj) {
    if (obj[key]) {
      if (typeof obj[key] === "object" && obj[key] instanceof Array) {
        obj[key].length > 0 ? (_v = false) : (_v = true);
      } else if (typeof obj[key] === "object") {
        isEmpty();
      } else if (
        obj[key] != null &&
        obj[key] !== undefined &&
        obj[key] !== "null" &&
        obj[key] !== "undefined"
      ) {
        _v = false;
      }
    }
  }
  return _v;
};

export const extend = (...args) => {
  let options;

  let name;

  let src;

  let copy;

  let copyIsArray;

  let clone;

  let target = args[0] || {};

  let i = 1;
  const length = args.length;

  let deep = false;

  if (typeof target === "boolean") {
    deep = target;
    target = args[1] || {};
    i = 2;
  }
  if (typeof target !== "object" && !this.isFunction(target)) {
    target = {};
  }
  if (length === i) {
    target = this;
    --i;
  }
  for (; i < length; i++) {
    if ((options = args[i]) != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];
        if (target === copy) {
          continue;
        }
        if (
          deep &&
          copy &&
          (isPlainObject(copy) || (copyIsArray = isArray(copy)))
        ) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }
          target[name] = extend(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
};

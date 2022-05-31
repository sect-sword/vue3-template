import axios from "axios";
import router from "@/router";
import { getToken } from "@/utils/auth";
// import Msg from "@/utils/message";
import { extend } from "@/utils/comment";

class HttpRequest {
  constructor(baseUrl = baseUrl) {
    const host = window.location.host;

    this.host = host;

    this.baseUrl = baseUrl;
    this.queue = {};
  }
  getInsideConfig() {
    const settings = {
      baseUrl: this.baseUrl,
      service: process.env.VUE_APP_BASE_SERVICE,
      timeout: 3 * 60 * 1000,
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        "Content-Type": "application/json;charset=UTF-8",
        // "path": window.location.pathname + window.location.search,
        Authorization: getToken("Authorization"),
      },
    };
    return settings;
  }
  destroy(url) {
    delete this.queue[url];
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        this.queue[url] = true;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      (response) => {
        const res = response.data;
        if (res instanceof Blob) {
          return res;
        }
        this.destroy(url);
        const status = res.code;
        if (Number(status) === 20000) {
          return res;
        } else {
          // Msg("error", res.msg || "error");
          // router.push({name: '401'})
          return Promise.reject(res);
        }
      },
      (error) => {
        this.destroy(url);
        // const errorInfo = error.response
        if (401 === error.response.status || 403 === error.response.status) {
          //判断如果是和后端约定好的无权限状态码，则控制浏览器跳转到重定向地址
          // window.location = error.response.data;
          router.push({
            name: "login",
            query: {
              redirect: window.location.pathname + window.location.search,
            },
          });
          // 用户没有登录
        }
        return Promise.reject(error);
      }
    );
  }

  resetUrl(_url) {
    const regExp = /(api\/pedestal)|(api\/)/;

    const isDev = process.env.NODE_ENV === "development";

    const url = isDev ? _url.replace(regExp, "") : _url;

    return url;
  }

  resetOptions(options) {
    const baseConfig = this.getInsideConfig();
    const params = extend(true, {}, baseConfig, options);
    const _url = (params.baseUrl || "") + (params.service || "") + params.path;

    params.url = this.resetUrl(_url);

    return params;
  }
  request(options) {
    const params = this.resetOptions(options);
    const instance = axios.create();
    this.interceptors(instance, params.url);
    return instance(params);
  }
  submit(options) {
    const params = this.resetOptions(options);
    const instance = axios.create();
    // delete params.headers;
    // params.headers = {};
    // params.headers["Authorization"] = getToken("Authorization");
    // params.headers["withCredentials"] = true;
    return instance(params);
  }
}
export default HttpRequest;

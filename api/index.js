import http from "@/utils/http";
import { jointUrl, jointUrl2 } from "@/utils/formate";

export default (name, type, ...args) => {
  return Api[name].call(this, type, ...args);
};

const add = (name, data) => {
  return http.request({
    path: `${name}`,
    data,
    method: "post",
  });
};

const update = (name, data) => {
  return http.request({
    path: `${name}`,
    data,
    method: "put",
  });
};

const get = (name, id) => {
  const path = id ? `${name}/${id}` : `${name}`;
  return http.request({
    path,
    method: "get",
  });
};

const getCode = (name, code) => {
  return http.request({
    path: `${name}/identifier/${code}`,
    method: "get",
  });
};

const list = (name, ...args) => {
  return http.request({
    path: `${name}${jointUrl("", args)}`,
    method: "get",
  });
};

const page = (name, data) => {
  return http.request({
    path: `${name}/page${jointUrl2("", data)}`,
    method: "get",
  });
};

const remove = (name, id) => {
  return http.request({
    path: `${name}/${id}`,
    method: "delete",
  });
};

const down = (name) => {
  return http.request({
    path: name,
    method: "get",
    responseType: "blob",
  });
};

const file = (name, data) => {
  return http.submit({
    path: name,
    data: data,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
      withCredentials: true,
    },
  });
};

export const Api = {
  list,
  page,
  get,
  add,
  update,
  delete: remove,
  getCode,
  down,
  file,
};

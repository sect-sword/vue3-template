import HttpRequest from "@/utils/request";
const baseUrl = process.env.ESP_GATEWAY_HOST || process.env.VUE_APP_BASE_API;
// const baseUrl =
//   process.env.NODE_ENV === "development"
//     ? "/api/esp-performance/"
//     : process.env.ESP_GATEWAY_HOST || process.env.VUE_APP_BASE_API;

const http = new HttpRequest(baseUrl);
export default http;

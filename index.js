import axios from "axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const { confirm } = Modal;
//
// Promise.config({
//   cancellation: true,
// });

// overwrite native Promise implementation with Bluebird's
// window.Promise = Promise;

// eslint-disable-next-line import/no-anonymous-default-export
const MainClient = ({
  headers = {},
  API_ROOT,
  routes,
  getAccessToken,
  emptyState,
}) => {
  const service = axios.create({
    baseURL: API_ROOT, // url of the api
    headers: {
      Authorization: getAccessToken() ? "Bearer ".concat(getAccessToken()) : "",
      ...headers,
    },
  });
  service.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorResponse = error.response;
      if (process.env.NODE_ENV === "production") {
        switch (errorResponse.status) {
          case 404:
            window.location.pathname = routes.notFound.pathname;
            break;
          case 403:
            window.location.pathname = "/not-permitted";
            break;
          default:
            break;
        }
      }
      if (errorResponse.status === 401) {
        emptyState();
        window.location.href = "/sign-in";
      }
      if (errorResponse) {
        confirm({
          title:
            errorResponse?.data?.message?.[0]?.messages?.[0]?.message ||
            (typeof errorResponse?.data?.message === "string" &&
              errorResponse?.data?.message) ||
            "Something went wrong",
          icon: ExclamationCircleOutlined(),
          className: "error-popup",
        });
      }
      throw error;
    }
  );
  return service;
};

export default MainClient;

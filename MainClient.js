const axios = require("axios");

//
// Promise.config({
//   cancellation: true,
// });

// overwrite native Promise implementation with Bluebird's
// window.Promise = Promise;

// eslint-disable-next-line import/no-anonymous-default-export
const MainClient = ({ headers, accessToken, statusHandler }) => {
  const service = axios.create({
    baseURL: process.env.API_ROOT, // url of the api
    headers: {
      Authorization: accessToken ? "Bearer ".concat(accessToken) : "",
      ...headers,
    },
  });

  service.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorResponse = error.response;

      if (errorResponse?.status) {
        let statusFound = false;
        Object.keys(statusHandler).map((item) => {
          if (errorResponse?.status === Number(item.slice(2))) {
            statusHandler?.[item]?.();
            statusFound = true;
          }
        });
        if (!statusFound) {
          statusHandler?.defaultErrHandler();
        }
      }

      throw error;
    }
  );
  return service;
};

export default MainClient;

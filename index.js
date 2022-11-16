import MainClient from "./MainClient.js";

const APIProvider = ({ headers = {}, accessToken, statusHandler }) => {
  const client = MainClient({ headers, accessToken, statusHandler });

  const customApi = (url) => ({
    getMany: (params) => client.get(url, { params }),
    getOne: ({ id, ...params }) => client.get(`${url}/${id}`, { params }),
    update: (params) => client.put(`${url}/${params.id}`, params.values),
    add: (data) => client.post(url, data),
    delete: (params) => client.delete(`${url}/${params.id}`, { params }),
  });

  return function (url, type) {
    return type?.length
      ? type.map((item) => customApi(url)?.[item])
      : Object.values(customApi(url));
  };
};

export default APIProvider;

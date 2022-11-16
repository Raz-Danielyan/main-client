import MainClient from "./MainClient";

const APIProvider = ({ headers = {}, accessToken, statusHandler }) => {
  const client = MainClient({ headers, accessToken, statusHandler });

  const customApi = (url) => ({
    getMany: client().get(url, { params }),
    getOne: client().get(`${url}/${id}`, { params }),
    update: client().put(`${url}/${params.id}`, params.values),
    add: client().post(url, data),
    delete: client().delete(`${url}/${params.id}`, { params }),
  });

  return function (url, type) {
    return type?.length
      ? type.map((item) => customApi(url)?.[item])
      : Object.values(customApi(url));
  };
};

export default APIProvider;

import axios from "axios";
const apiCall = (options) => {
  return axios(options)
    .then((response) => {
      return response;
    })
    .catch((res) => {
      return res.response;
    });
};

export { apiCall };

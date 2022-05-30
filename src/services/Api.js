import axios from "axios";

// const baseURL = "https://nla-backend-1.herokuapp.com/";
const baseURL = "http://localhost:5000/";

export default (method, url, data, header) => {
  return axios({
    url: baseURL + url,
    method,
    data,
    headers: header,
  });
};

import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  console.log("interceptors");
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("interceptorss");
    toast.error("An unexpected error occured.");
    console.log("interceptorsss");
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  console.log("JWT", jwt);
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
  }
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};

export default http;

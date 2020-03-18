import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/scholarity/modules";

export const getModules = async () => {
  const response = await http.get(apiEndpoint);
  console.log("GET_MOVIES : ", response.data);
  return response.data;
};

export const deleteModule = async id => {
  console.log("deleting a module");
  const response = await http.delete(`${apiEndpoint}/${id}`);
  console.log("DELETE_Module : ", response);
};

export const getModule = async id => {
  const response = await http.get(`${apiEndpoint}/${id}`);
  console.log("GET_Module : ", response);

  return response.data;
};

export const saveModule = async module => {
  if (module.id) {
    const moduleObj = { ...module };
    delete moduleObj.id;
    const response = await http.put(apiEndpoint + "/" + module.id, moduleObj);
    console.log("SAVE module ", response);
    return response;
  }
  delete module.id;
  console.log(module);
  const response = await http.post(apiEndpoint, module);
  console.log("SAVE_UPDATE module ", response);
  return response;
};

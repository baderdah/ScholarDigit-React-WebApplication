import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/scholarity/departements";

export const getModules = async () => {
  const response = await http.get(apiEndpoint);
  console.log("GET_departments : ", response.data);
  return response.data;
};

export const deleteModule = async id => {
  console.log("deleting a departments");
  const response = await http.delete(`${apiEndpoint}/${id}`);
  console.log("DELETE_departments : ", response);
};

export const getModule = async id => {
  const response = await http.get(`${apiEndpoint}/${id}`);
  console.log("GET_departments : ", response);

  return response.data;
};

export const saveModule = async module => {
  console.log("SAVE", module);
  if (module.id) {
    const response = await http.put(apiEndpoint, module);
    console.log("SAVE_UPDATE departments ", response.data);
    return response.data;
  }
  delete module.id;
  console.log(module);
  const response = await http.post(apiEndpoint, module);
  console.log("SAVE departments ", response);
  return response;
};

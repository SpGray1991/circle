import "regenerator-runtime/runtime";
import axios from "axios";

export const setDataToDB = async (coords) => {
  return await axios.post(`http://localhost:5000/`, coords).then((response) => {
    return response.data;
  });
};

export const getDataToDB = async () => {
  return await axios.get(`http://localhost:5000/`).then((response) => {
    return response.data;
  });
};

import * as axios from "axios";

export const setDataToDB = async (location) => {
  return await axios
    .post(`http://localhost:5000/`, location)
    .then((response) => {
      return response.data;
    });
};

/* import request from "request";

export const coordinate = {
  async setDataToDB(location) {
    return await request.post("/", location).then((response) => {
      return response.data;
    });
  },
  async getDataToDB() {
    return await request.get(`/`).then((response) => {
      return response.data;
    });
  },
}; */

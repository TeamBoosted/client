import axios from "axios";
import { API_SERVER } from '../../config.js';

const getLastThreeService = async (id_token) => {
  try {
    let response = await axios.post(`${API_SERVER}/api/db/getLastThreeMedia`, {
      data: { id_token }
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default getLastThreeService;
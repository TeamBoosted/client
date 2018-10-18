import axios from "axios";
import { API_SERVER } from '../../config.js';

const addMediumService = async (movie, user) => {
  try {
    let res = await axios.post(`${API_SERVER}/api/db/addMedium`, {
      data: { movie, user }
    });
    return res;
  } catch (err) {
    console.log(err)
  }
};

export default addMediumService;
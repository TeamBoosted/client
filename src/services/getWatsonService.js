import axios from "axios";
import { API_SERVER } from '../../config.js';

const getWatsonService = async userInfo => {
  try {
    let response = await axios({
      method: "post",
      url: `${API_SERVER}/api/watson/getPersonality`,
      data: userInfo
    });
    return response;
  } catch (err) {
    console.log("error getting watson \n", err);
  }
};

export default getWatsonService;

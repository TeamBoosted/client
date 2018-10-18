import axios from "axios";
import { API_SERVER } from '../../config.js';

const getAllMedia = async token_id => {
  // console.log("in the service for getting userINfo. TOKEN ID IS:", token_id);
  try {
    let response = await axios.get(
      `${API_SERVER}/api/db/getAllMedia/${token_id}`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default getAllMedia;

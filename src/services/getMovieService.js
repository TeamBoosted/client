import axios from "axios";
import { API_SERVER } from '../../config.js';

const getMovieService = async (input) => {
  try {
    let response = await axios.get(`${API_SERVER}/api/info/movies/${input}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default getMovieService;
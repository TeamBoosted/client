import axios from "axios";
import { API_SERVER } from '../../config.js';

const getBookService = async (input) => {
  try {
    let response = await axios.get(`${API_SERVER}/api/info/books/${input}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default getBookService;
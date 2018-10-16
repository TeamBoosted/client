import axios from "axios";

const getBookService = async (input) => {
  try {
    let response = await axios.get(`http://localhost:80/api/info/books/${input}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default getBookService;
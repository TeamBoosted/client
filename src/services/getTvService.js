import axios from "axios";

const getTvService = async (input) => {
  try {
    let response = await axios.get(`/api/info/tv/${input}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default getTvService;
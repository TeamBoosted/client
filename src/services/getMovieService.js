import axios from "axios";

const getMovieService = async (input) => {
  try {
    let response = await axios.get(`/api/info/movies/${input}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default getMovieService;
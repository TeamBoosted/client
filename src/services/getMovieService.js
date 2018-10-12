import axios from "axios";

const getMovieService = async (input) => {
  try {
    let response = await axios.get(`http://localhost:80/api/info/movies/${input}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default getMovieService;
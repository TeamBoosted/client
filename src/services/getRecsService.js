import axios from "axios";

const getRecsService = async (movie) => {
  try {
    let response = await axios.get(`http://localhost:80/api/rec/movies/${movie.moviedb_id}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default getRecsService;
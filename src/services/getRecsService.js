import axios from "axios";

const getRecsService = async (movie) => {
  try {
    let response;
    if (movie.type === "movie") {
      response = await axios.get(`http://localhost:80/api/rec/movies/${movie.moviedb_id}`);
    } else {
      response = await axios.get(`http://localhost:80/api/rec/tv/${movie.moviedb_id}`)
    }
    console.log('Here is the recc:',response)
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default getRecsService;

//`https://api.themoviedb.org/3/tv/${tv_id}/recommendations`;
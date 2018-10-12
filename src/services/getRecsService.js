import axios from "axios";

const getRecsService = (movie, cb) => {
  axios
    .get(`http://localhost:80/api/rec/movies/${movie.moviedb_id}`)
    .then(response => {
      if (cb) cb(response)
    })
    .catch(console.log);
};

export default getRecsService;
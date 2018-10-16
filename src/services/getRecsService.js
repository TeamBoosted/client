import axios from "axios";

const getRecsService = async (medium) => {
  try {
    let response;
    if (medium.type === "movie") {
      response = await axios.get(`http://localhost:80/api/rec/movies/${medium.moviedb_id}`);
    } else {
      response = await axios.get(`http://localhost:80/api/rec/tv/${medium.moviedb_id}`)
    }
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getRecsByGenreService = async (medium) => {
  const { genre_id } = medium;
  try {
    let movie, tv, book;
    movie = await axios.get(`http://localhost:80/api/rec/movies/genre/${genre_id[0]}`);
    tv = await axios.get(`http://localhost:80/api/rec/tv/genre/${genre_id[0]}`);
    book = await axios.get(`http://localhost:80/api/db/getBookRecsByGenre/${genre_id[0]}`)
    return [...movie.data, ...tv.data, ...book.data];
  } catch (err) {
    throw (err);
  }
}

export default getRecsService
// export { getRecsService, getRecsByGenreService };
// export getRecsByGenreService;
//`https://api.themoviedb.org/3/tv/${tv_id}/recommendations`;

import axios from "axios";

const getRecsService = async (medium) => {
  try {
    let response;
    if (medium.type === "movie") {
      response = await axios.get(`http://localhost:80/api/rec/movies/${medium.moviedb_id}`);
    } else {
      response = await axios.get(`http://localhost:80/api/rec/tv/${medium.moviedb_id}`)
    }
    console.log('Here is the recc:', response)
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getRecsByGenreService = async (medium) => {
  const { genre_id } = medium;
  try {
    let movie, tv, book;
    if (medium.type === "movie" || medium.type === "tv") {
      movie = await axios.get(`http://localhost:80/api/rec/movies/genre/${genre_id[0]}`);
      tv = await axios.get(`http://localhost:80/api/rec/tv/genre/${genre_id[0]}`);
      book = await axios.get(`http://localhost:80/api/db/getBookRecsByGenre/${genre_id[0]}`);
    } else if (medium.type === "book") {
      movie = await axios.get(`http://localhost:80/api/rec/movies/genre/${medium.book_genre.genreId}`);
      tv = await axios.get(`http://localhost:80/api/rec/tv/genre/${medium.book_genre.genreId}`);
      book = await axios.get(`http://localhost:80/api/db/getBookRecsByGenre/${medium.book_genre.genreId}`);
    }
    let arr = [...movie.data, ...tv.data];
    if (book !== null) {
      arr.concat(book.data);
    }
    return arr;
  } catch (err) {
    throw (err);
  }
}

export default getRecsService
// export { getRecsService, getRecsByGenreService };
// export getRecsByGenreService;
//`https://api.themoviedb.org/3/tv/${tv_id}/recommendations`;

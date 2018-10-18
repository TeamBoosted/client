import axios from "axios";

const getRecsService = async (medium) => {
  try {
    let response;
    if (medium.type === "movie") {
      response = await axios.get(`/api/rec/movies/${medium.moviedb_id}`);
    } else {
      response = await axios.get(`/api/rec/tv/${medium.moviedb_id}`)
    }
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getRecsByGenreService = async (medium) => {
  const key = medium.moviedb_id || medium.goodReads_id;
  const genre_id = medium.type === 'book' ? medium.book_genre.genreId : medium.genre_id[0];
  try {
    let movie, tv, book;
    movie = await axios.get(`/api/rec/movies/genre/${genre_id}`);
    tv = await axios.get(`/api/rec/tv/genre/${genre_id}`);
    book = await axios.get(`/api/db/getBookRecsByGenre/${genre_id}`);
    let arr = [...movie.data, ...tv.data];
    const data = {
      movie: medium,
      user: localStorage.id_token
    }
    axios.post('/api/db/addMedium', { data });
    book.data.forEach(rec => {
      if (rec) {
        arr.push(rec);
      }
    })

    axios.post('/api/redis/caching', { key, value: arr });
    return arr;
  } catch (err) {
    console.log(err);
  }
}

export default getRecsService

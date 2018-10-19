import axios from "axios";
import { API_SERVER } from '../../config.js';

const getRecsService = async (medium) => {
  try {
    let response;
    if (medium.type === "movie") {
      response = await axios.get(`${API_SERVER}/api/rec/movies/${medium.moviedb_id}`);
    } else {
      response = await axios.get(`${API_SERVER}/api/rec/tv/${medium.moviedb_id}`)
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
    movie = await axios.get(`${API_SERVER}/api/rec/movies/genre/${genre_id}`);
    tv = await axios.get(`${API_SERVER}/api/rec/tv/genre/${genre_id}`);
    book = await axios.get(`${API_SERVER}/api/db/getBookRecsByGenre/${genre_id}`);
    let arr = [...movie.data, ...tv.data];
    const data = {
      movie: medium,
      user: localStorage.id_token
    }
    axios.post(`${API_SERVER}/api/db/addMedium`, { data });
    if (book.data && book.data.length > 0) {
      book.data.forEach(rec => {
        if (rec) {
          arr.push(rec);
        }
      });
    }

    axios.post(`${API_SERVER}/api/redis/caching`, { key, value: arr });
    return arr;
  } catch (err) {
    console.log(err);
  }
}

export default getRecsService

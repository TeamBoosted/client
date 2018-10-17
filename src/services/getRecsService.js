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
  const { genre_id, moviedb_id } = medium;
  try {
    const key = moviedb_id
    let movie, tv, book, value, save;
    const data = {
      movie: medium,
      user: localStorage.id_token
    }
    save = await axios.post('http://localhost:80/api/db/addMedium', { data });
    console.log('I\'m saving now', save); 
    movie = await axios.get(`http://localhost:80/api/rec/movies/genre/${genre_id[0]}`);
    tv = await axios.get(`http://localhost:80/api/rec/tv/genre/${genre_id[0]}`);
    book = await axios.get(`http://localhost:80/api/db/getBookRecsByGenre/${genre_id[0]}`);
    value = [...movie.data, ...tv.data, ...book.data];
    // const params = {
    //   key,
    //   value
    // }
    axios.post('http://localhost:80/api/redis/caching', { key, value });
    
    // saved = await axios.post(``)
    return value;
  } catch (err) {
    console.log(err);
  }
}

export default getRecsService
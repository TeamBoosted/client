import axios from "axios";
import { API_SERVER } from '../../config.js';
export const shuffle = (arr) => {
  let curIdx = arr.length;
  let randomIdx, temp;
  while (curIdx !== 0) {
    randomIdx = Math.floor(Math.random() * curIdx);
    curIdx -= 1;
    temp = arr[curIdx];
    arr[curIdx] = arr[randomIdx];
    arr[randomIdx] = temp;
  }
  return arr;
}
const limit = (arr, n) => {
  const limitted = [];
  if(arr.length <= n) {
    limitted.push(...arr);
  }
  for(let i = 0; i < n; i++) {
    limitted.push(arr[i]);
  }
  return limitted;
}

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

export const getRecsByGenreService = async (medium, watson = false) => {
  const key = medium.moviedb_id || medium.goodReads_id;
  const genre_id = medium.type === 'book' ? medium.book_genre.genreId : medium.genre_id[0];
  let movie, tv, book;
  try {
    movie = await axios.get(`${API_SERVER}/api/rec/movies/genre/${genre_id}`);
    tv = await axios.get(`${API_SERVER}/api/rec/tv/genre/${genre_id}`);
    book = await axios.get(`${API_SERVER}/api/db/getBookRecsByGenre/${genre_id}`);
    const data = {
      movie: medium,
      user: localStorage.id_token
    }
    axios.post(`${API_SERVER}/api/db/addMedium`, { data });
    const limitMovie = limit(movie.data, 5);
    const limitTv = limit(tv.data, 5);
    const arr = [...limitMovie, ...limitTv];
    if (book.data && book.data.length > 0) {
      let n = 0;
      while(n < 5) {
        arr.push(book.data[n]);
        n++;
      } 
    }
    axios.post(`${API_SERVER}/api/redis/caching`, {key,value: arr});
    const shuffled = shuffle(arr);
    return shuffled;
    
  } catch (err) {
    console.log(err);
  }
}



export default getRecsService

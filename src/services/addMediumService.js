import axios from "axios";

const addMediumService = (movie, user, cb) => {
  return axios.post(`http://localhost:80/api/db/addMedium`, {
    data: {
      movie,
      user
    }
  })
    .then(res => {
      if (cb) cb(res);
    })
    .catch(console.log);
};

export default addMediumService;
import axios from "axios";

const addMediumService = (movie, user) => {
  return axios.post(`http://localhost:80/api/db/addMedium`, {
    data: {
      movie,
      user
    }
  }).catch(console.log);
};

export default addMediumService;
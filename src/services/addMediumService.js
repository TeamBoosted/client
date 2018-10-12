import axios from "axios";

const addMediumService = async (movie, user) => {
  try {
    let res = await axios.post(`http://localhost:80/api/db/addMedium`, {
      data: { movie, user }
    });
    return res;
  } catch (err) {
    console.log(err)
  }
};

export default addMediumService;
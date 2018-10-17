import axios from "axios";

const getLastThreeService = async (id_token) => {
  try {
    let response = await axios.post("http://localhost:80/api/db/getLastThreeMedia", {
      data: { id_token }
    });
    console.log('This is the response from threeService', response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default getLastThreeService;
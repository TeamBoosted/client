import axios from "axios";

const getLastThreeService = async (id_token) => {
  try {
    let response = await axios.post("http://localhost:80/api/db/getLastThreeMedia", {
      data: { id_token }
    });
    return response;
    console.log('HEREIS THE RESPONSE ON REFRESH client side:',response)
  } catch (err) {
    console.log(err);
  }
};

export default getLastThreeService;
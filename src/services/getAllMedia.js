import axios from "axios";

const getAllMedia = async token_id => {
  console.log("in the service for getting userINfo. TOKEN ID IS:", token_id);
  try {
    let response = await axios.get(
      `http://localhost:80/api/db/getAllMedia/${token_id}`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default getAllMedia;

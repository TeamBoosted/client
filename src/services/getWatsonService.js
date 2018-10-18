import axios from "axios";

const getWatsonService = async userInfo => {
  try {
    let response = await axios({
      method: "post",
      url: "/api/watson/getPersonality",
      data: userInfo
    });
    return response;
  } catch (err) {
    console.log("error getting watson \n", err);
  }
};

export default getWatsonService;

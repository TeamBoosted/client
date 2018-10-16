import axios from "axios";

const getWatsonService = async userInfo => {
  console.log(
    "\nHERE I AM IN THE WATSON SERVICE!\n here is userinfo",
    userInfo
  );

  try {
    let response = await axios({
      method: "post",
      url: "http://localhost:80/api/watson/getPersonality",
      data: userInfo
    });
    console.log("here is my response:", response);
    return response;
  } catch (err) {
    console.log("error getting watson \n", err);
  }
};

export default getWatsonService;

axios({
  method: "post",
  url: "/user/12345",
  data: {
    firstName: "Fred",
    lastName: "Flintstone"
  }
});

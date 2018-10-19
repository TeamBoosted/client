<template>
  <div>
  
    <template v-if="this.showChart === false" >
      <p class="is-size-4">Welcome to your tailored profile! </p>
      <p class="is-size-4">Here you can find your favorited works of art, as well as those you found interesting</p>
      <UserFavorites />

      <div class="column is-full" id="watsonbutton">
      <p class="is-size-4">We also offer a personality analysis based off of your favorite works of art!</p>     
             <a 
            class="button is-primary"
            @click="getPersonality()"
            >
            Get Your Artistic Personality
            </a>
      </div>
    </template>
    

 

    <div class="columns">
      <div class="column is-full">
        <template v-if="showChart" >
    <p class="is-size-4">Here is your Big-5 personality analysis based off of your artistic interest!</p>  
          <personality-chart 
          :data="this.chartData" 
          :options="{responsive: true, maintainAspectRatio: false,}"
          :width="800"
          :height="800"
          />
        </template>
      </div> 
    </div>

    <div v-if="this.showChart">
  
    <WatsonRecs 
    :personalityInfo="this.personalityInfo"
    />
  </div>


    

    
    
  </div>
</template>

<script>
import getWatsonService from "../../services/getWatsonService.js";
import PersonalityChart from "./PersonalityChart";
import getAllMedia from "../../services/getAllMedia.js";
import UserFavorites from "./UserFavorites";
import WatsonRecs from "./WatsonRecs";

export default {
  name: "Profile",
  components: {
    PersonalityChart,
    UserFavorites,
    WatsonRecs
  },
  data() {
    return {
      userInfo: {
        userInfo: ""
      },
      showChart: false,
      chartData: {},
      personalityInfo: {}
    };
  },
  methods: {
    getPersonality: async function() {
      // this is the function that will get the information about this user.
      //the information: synopsis of mediums that they like.
      let userInfo = await getAllMedia(localStorage.id_token);

      let synopsisString = "";
      userInfo.data.forEach(medium => {
        synopsisString += medium.synopsis;
      });

      this.userInfo.userInfo = synopsisString;

      console.log("getting personality");
      let watsonResponse = await getWatsonService(this.userInfo);

      let personalityNameArray = [];
      let personalityDataArray = [];
      let personalityInfo = {};
      watsonResponse.data.personality.forEach(personality => {
        personalityNameArray.push(personality.name),
          personalityDataArray.push(Math.floor(personality.percentile * 100));
        personalityInfo[personality.name] = Math.floor(
          personality.percentile * 100
        );
      });

      this.personalityInfo = personalityInfo;

      this.showChart = !this.showChart;
      this.chartData = {
        labels: personalityNameArray,
        datasets: [
          {
            label: "GitHub Commits",
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)"
            ],
            data: personalityDataArray
          }
        ]
      };
    },
    mounted() {
      this.getPersonality();
    }
  }
};
</script>

<style >
.columns {
  align-content: center;
}
#watsonbutton {
  margin-top: 10%;
}
</style>
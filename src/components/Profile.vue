<template>
  <div>
    <template v-if="this.showChart === false">
      <p>Welcome to your tailored profile! </p>
      <p>Here you can find your favorite works of art, as well as those you found interestings</p>
      <p>We also offer a personality analysis based off of your favorite works of art!</p>
    </template>

    <a 
      class="button-is-primary"
      @click="getPersonality"
    >
    Get Your Artistic Personality
    </a>

    <div class="columns">
      <div class="column is-full">
        <template v-if="showChart" >
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
      <a @click="getUserBreakdown" >Get Analysis!</a>
    </div>

    
    
  </div>
</template>

<script>
import getWatsonService from "../services/getWatsonService.js";
import PersonalityChart from "./PersonalityChart.vue";
import getAllMedia from "../services/getAllMedia.js";

export default {
  name: "Profile",
  components: {
    PersonalityChart
  },
  data() {
    return {
      userInfo: {
        userInfo:
          '""Ruthless silver miner, turned oil prospector, Daniel Plainview moves to oil-rich California. Using his adopted son to project a trustworthy, family-man image, Plainview cons local landowners into selling him their valuable properties for a pittance. However, local preacher Eli Sunday suspects Plainviews motives and intentions, starting a slow-burning feud that threatens both their lives."Jeffrey "The Dude" Lebowski, a Los Angeles slacker who only wants to bowl and drink white Russians, is mistaken for another Jeffrey Lebowski, a wheelchair-bound millionaire, and finds himself dragged into a strange series of events involving nihilists, adult film producers, ferrets, errant toes, and large sums of money."Three detectives in the corrupt and brutal L.A. police force of the 1950s use differing methods to uncover a conspiracy behind the shotgun slayings of the patrons at an all-night diner.""'
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
      console.log("userInfo object is:", userInfo);
      console.log("the state of userInfo:", this.userInfo);

      let synopsisString = "";
      userInfo.data.forEach(medium => {
        synopsisString += medium.synopsis;
      });

      this.userInfo.userInfo = synopsisString;

      let watsonResponse = await getWatsonService(this.userInfo);
      console.log(
        "i am in the watson response in client, here is watsonResponse",
        watsonResponse
      );

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
    getUserBreakdown: function() {
      // I have the obj that shows the relationships. I will be able to provide a breakdown and recommend 1-2 works per medium.
    }
  }
};
</script>

<style >
.columns {
  align-content: center;
}
</style>
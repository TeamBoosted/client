<template>
  <div>
    <p>Welcome to your tailored profile! </p>
    <p>Here you can find your favorite works of art, as well as those you found interestings</p>
    <p>We also offer a personality analysis based off of your favorite works of art!</p>
    <a 
      class="button-is-primary"
      @click="getPersonality"
    >
    Get Personality
    </a>
    <template v-if="showChart">
      <personality-chart 
      :data="this.chartData" 
      :chart-id="personality"
      :options="{responsive: false, maintainAspectRatio: false}"
      :width="800"
      :height="600"
      />
    </template>
    
  </div>
</template>

<script>
import getWatsonService from "../services/getWatsonService.js";
import PersonalityChart from "./PersonalityChart.vue";

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
      chartData: {}
    };
  },
  methods: {
    getPersonality: async function() {
      console.log("getting personality");
      let watsonResponse = await getWatsonService(this.userInfo);
      console.log(
        "i am in the watson response in client, here is watsonResponse",
        watsonResponse
      );
      this.showChart = !this.showChart;
      this.chartData = {
        labels: ["boooom", "watson"],
        datasets: [
          {
            label: "GitHub Commits",
            backgroundColor: "#f87979",
            data: [40, 20]
          }
        ]
      };
    }
  }
};
</script>

<style >
#personality {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
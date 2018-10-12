<template>
  <div id="app">
    <Header v-show="searched" />
    <img id="magGlass" alt="Vue logo" src="https://openclipart.org/download/273208/1487427183.svg">
    
    <template v-if="localStorage.moviesSaved > 2">
      <RateRecs
        v-bind:movies="recommendations"
        v-bind:getRecs="getRecs"
      />
      <a
        class="button is-light"
        v-if="authenticated"
        @click="logout()">
        Log Out
      </a>
    </template>

    <template v-if="authenticated && localStorage.moviesSaved < 3">
      <span v-if="searched">
        <LandingPage />
     </span>

      <SearchBar 
        v-on:searchedForMovie="toggleSearched()"
        v-bind:saveToDatabase="saveToDatabase"
        v-bind:getRecs="getRecs"
      />

       <a
        class="button is-light"
        v-if="authenticated"
        @click="logout()">
        Log Out
      </a>
    </template>

    <template v-if="!authenticated">
      <div>
       <a
        class="button is-light"
        v-if="!authenticated" 
        @click="login()">
        Log-in
      </a>   
      </div>   
    </template>
    
  </div>
</template>

<script>
import SearchBar from "./components/searchBar.vue";
import AuthService from "./auth/authServices.js";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import RateRecs from "./components/RateRecs";
import axios from "axios";
import addMediumService from "./services/addMediumService.js";
import getRecsService from "./services/getRecsService.js";
import getLastThreeService from "./services/getLastThreeService.js";
const auth = new AuthService();
const { login, logout, authenticated, authNotifier } = auth;

export default {
  name: "app",
  data() {
    authNotifier.on("authChange", authState => {
      this.authenticated = authState.authenticated;
    });
    auth.handleAuthentication();

    return {
      auth,
      authenticated,
      searched: true,
      localStorage: localStorage,
      recommendations: [],
      index: 0
    };
  },
  components: {
    SearchBar,
    Header,
    LandingPage,
    RateRecs
  },
  methods: {
    toggleSearched: function() {
      this.searched = !this.searched;
    },
    toggleLanding: function() {
      this.landingPage = !this.landingPage;
    },
    saveToDatabase: function(movie) {
      localStorage.moviesSaved++;
      addMediumService(movie, localStorage.id_token);
    },
    getRecs: async function(movie) {
      let response = await getRecsService(movie);
      const data = response.data;
      this.recommendations.push(...data);
      console.log("this.recommendations", this.recommendations);
      this.$forceUpdate();
    },
    login,
    logout
  },
  updated: async function() {
    if (
      localStorage.moviesSaved >= 3 &&
      this.recommendations.length < 1 &&
      this.authenticated
    ) {
      let response = await getLastThreeService(localStorage.id_token);
      const body = [];
      response.data.forEach(rec => {
        body.push(...rec);
      });
      this.recommendations = body;
    }
  }
};
</script>

<style >
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#magGlass {
  max-width: 75%;
  max-height: 75%;
}
</style>

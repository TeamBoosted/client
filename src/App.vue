<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item"
            @click="toggleProfile"  
          >
            Home
          </a>

          <a class="navbar-item">
            Documentation
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              More
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                About
              </a>
              <a class="navbar-item">
                Jobs
              </a>
              <a class="navbar-item">
                Contact
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a
                class="button is-primary"
                v-if="!authenticated" 
                @click="login()">
                Log-in
              </a>  
              <a
                class="button is-light"
                v-if="authenticated"
                @click="logout()">
                Log Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>  


    <template v-if="profile">
      <Profile />
    </template>
    <template v-else-if="!profile">
      
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

      
    </template>

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
import Profile from "./components/Profile";
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
      index: 0,
      profile: false,
    };
  },
  components: {
    SearchBar,
    Header,
    LandingPage,
    RateRecs,
    Profile
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
      console.log("movie IS THIS SO I CAN TELL WHAT TYPE IS:", movie);
      let response = await getRecsService(movie);
      const data = response.data;
      console.log("HERE IS THE TV OR MOVIE DATA", data);
      this.recommendations.push(...data);
      console.log("this.recommendations", this.recommendations);
      this.$forceUpdate();
    },
    toggleProfile: function () {
      console.log('HEY MAN I AM TOGGLING THE PROFILE',this.profile)
      this.profile = !this.profile;
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
      console.log('HEY MAN I AM UPDATED')
      let response = await getLastThreeService(localStorage.id_token);
      const body = [];
      response.data.forEach(rec => {
        if (rec !== null) {
          rec.forEach(obj => {
            body.push(obj);
          })
        }
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

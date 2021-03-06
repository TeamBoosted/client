<template>
  <div id="app" class="container">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <p id='nav-icon' class="is-size-5">My Media</p>
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
          <template v-if="homeOrRecs">
            <p class="is-size-5">Profile</p>
          </template>
            <template v-else>
              <p class="is-size-5">Recommendations</p>
            </template>
          </a>

        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a
                class="button is-primary is-size-5"
                v-if="!authenticated" 
                @click="login()">
                Log-in
              </a>  
              <a
                class="button is-light is-size-5"
                v-if="authenticated"
                @click="logout()">
                Log Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>  
<!-- ---------------------------------------END NAVBAR-------------------------------- -->

    <template v-if="profile">
      <Profile />
    </template>
    <template v-else-if="!profile">
    <template v-if="localStorage.moviesSaved < 3 || !localStorage.moviesSaved">
      <Header />
      <img id="magGlass" alt="Vue logo" src="https://openclipart.org/download/273208/1487427183.svg">
    </template>  
    
    <template v-if="localStorage.moviesSaved > 2">
      <RateRecs
        v-bind:movies="filteredRecs"
        v-bind:getRecs="getRecs"
        v-bind:getGenreRecs="getGenreRecs"
        v-bind:increment="increment"
        v-bind:index="index"
      />
      
      
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
import addMediumService from "./services/addMediumService.js";
import getRecsService, {
  getRecsByGenreService,
  shuffle
} from "./services/getRecsService.js";
import getLastThreeService from "./services/getLastThreeService.js";
import Profile from "./components/UserProfile/Profile.vue";
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
      homeOrRecs: true
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
      this.$forceUpdate();
    },
    getRecs: async function(movie) {
      let response = await getRecsService(movie);
      const data = response.data;
      this.recommendations.push(...data);
      shuffle(this.recommendation);
    },
    toggleProfile: function() {
      this.homeOrRecs = !this.homeOrRecs;
      this.profile = !this.profile;
    },
    getGenreRecs: async function(medium) {
      let response = await getRecsByGenreService(medium);
      if (response && response.length > 0) {
        this.recommendations.push(...response);
      }
    },
    increment: function() {
      if (this.index < this.filteredRecs.length - 1) {
        this.index = this.index + 1;
      }
    },
    login,
    logout
  },
  updated: async function() {
    if (
      localStorage.moviesSaved >= 3 &&
      this.recommendations.length <= 1 &&
      this.authenticated
    ) {
      try {
        let response = await getLastThreeService(localStorage.id_token);
        response.data.forEach(rec => {
          this.recommendations.push(...rec);
          shuffle(this.recommendations);
        });
      } catch (err) {
        console.log(err);
      }
    }
  },
  computed: {
    filteredRecs: function() {
      const cache = {};

      const unique = this.recommendations.filter(rec => {
        if (rec) {
          return cache[rec.title] ? false : (cache[rec.title] = true);
        }
      });
      return unique;
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
  margin-top: 30px;
  margin-bottom: 100px;
}

#magGlass {
  max-width: 28%;
  max-height: 28%;
}
</style>

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
      recommendations: []
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
      //posting movie to db
      console.log('this.saved', this.saved);
      axios
        .post(`http://localhost:80/api/db/addMedium`, {
          data: {
            movie,
            user: localStorage.id_token
          }
        })
        .then(function(response) {
          //getting reccs
          // get(`https://localhost:80/api/rec/movies/${this.movie.id}`)
          // .then(response => {
          //   if (!localStorage.reccommendations){
          //     localStorage.setItem('recommendations', response);
          //   }
          //   localStorage.recommendations.push(response);
          // })
          // this.$emit('Saved');
        })
        .catch(function(error) {
          console.log("saving movie to DB or getting movie recs failed", error);
        });
    },
    getRecs: function(movie) {
      axios
        .get(`http://localhost:80/api/rec/movies/${movie.moviedb_id}`)
        .then(response => {
          const data = response.data;
          this.recommendations.push(...data);
          console.log("this.recommendations", this.recommendations);
          this.$forceUpdate();
        })
        .catch(console.log);
    },
    login,
    logout
  },
  updated: function() {
    if (localStorage.moviesSaved >= 3 && this.recommendations.length < 1 && this.authenticated) {
     
      axios
        .post('http://localhost:80/api/db/getLastThreeMedia',{
          data: {
            id_token: localStorage.id_token
          }
        })
        .then(response => {
          const body = [];
          response.data.forEach(rec => {
            body.push(...rec);
          })
          this.recommendations = body;

        })

      // this.recommendations = ['HEY MAN IT IS ME']
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

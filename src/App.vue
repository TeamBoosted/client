<template>
  <div id="app">
    <Header v-show="searched" />
    <img id="magGlass" alt="Vue logo" src="https://openclipart.org/download/273208/1487427183.svg">
    
    <template v-if="this.localStorage.moviesSaved > 2">
      <RateRecs
        v-bind:movies="recommendations"
      />
      <button
        v-if="authenticated"
        @click="logout()">
        Log Out
      </button>
    </template>

    <template v-if="authenticated && this.localStorage.moviesSaved < 3">
      <span v-if="searched">
        <LandingPage />
     </span>

      <SearchBar 
        v-on:searchedForMovie="toggleSearched()"
        v-bind:saveToDatabase="saveToDatabase"
        v-bind:getRecs="getRecs"
      />

       <button
        v-if="authenticated"
        @click="logout()">
        Log Out
      </button>
    </template>

    <template v-if="!authenticated">
       <button
        v-if="!authenticated" 
        @click="login()">
        Log-in
      </button>      
    </template>
    
  </div>
</template>

<script>
import SearchBar from './components/searchBar.vue';
import AuthService  from './auth/authServices.js';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import RateRecs from './components/RateRecs';
import axios from 'axios';

const auth = new AuthService();
const { login, logout, authenticated, authNotifier} = auth;

export default {
  name: 'app',
   data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated;
    })
    auth.handleAuthentication();
    
    return {
      auth,
      authenticated,
      searched: true,
      localStorage: localStorage,
      recommendations: []
    }
  },
  components: {
    SearchBar,
    Header,
    LandingPage,
    RateRecs
  },
  methods: {
    toggleSearched: function () {
      this.searched = !this.searched;
    },
    toggleLanding: function () {
      this.landingPage = !this.landingPage;
    },
    saveToDatabase: function() {
      let currentThis = this;
      localStorage.moviesSaved++;
        //posting movie to db
        axios.post(`http://localhost:8081/db/addMedium`, {
          data: {
            movie: currentThis.movie,
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
          })
        .catch(function(error) {
          console.log('saving movie to DB or getting movie recs failed',error);
        });
    },
    getRecs: function(movie) {
      axios.get(`http://localhost:80/api/rec/movies/${movie.moviedb_id}`)
        .then(response => {
          const data = response.data;
          this.recommendations.push(...data);
          console.log('this.recommendations', this.recommendations);
        })
        .catch(console.log);
    },
    login,
    logout
  },
}
</script>

<style >
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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

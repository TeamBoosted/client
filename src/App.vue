<template>
  <div id="app">
    <Header v-show="searched" />
    <img id="magGlass" alt="Vue logo" src="https://openclipart.org/download/273208/1487427183.svg">
    
    <template v-if="this.localStorage.moviesSaved > 2">
      <RateRecs />
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

      <SearchBar v-on:searchedForMovie="toggleSearched()" />

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
import Header from './components/Header'
import LandingPage from './components/LandingPage'
import RateRecs from './components/RateRecs'


const auth = new AuthService();
const { login, logout, authenticated, authNotifier} = auth;

export default {
  name: 'app',
   data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    // console.log('Auth in app.vue', auth);
    auth.handleAuthentication();
    
    return {
      auth,
      authenticated,
      searched: true,
      localStorage: localStorage
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
      console.log(`am i getting into this.searched?`)
      this.searched = !this.searched
    },
    toggleLanding: function () {
      this.landingPage = !this.landingPage
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

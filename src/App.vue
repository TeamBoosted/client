<template>
  <div id="app">
    <Header v-show="searched" />
    <img alt="Vue logo" src="./assets/logo.png">
    <SearchBar />
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="toggleSearched() + testing()">testing</button>
    
    <button
    v-if="!authenticated" 
    @click="login()">
    Log-in
    </button>

    <button
    v-if="authenticated"
    @click="logout()">
    Log Out
    </button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import SearchBar from './components/searchBar.vue';
import AuthService  from './auth/authServices.js';
import Header from './components/Header'

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
      searched: true
    }
  },
  components: {
    HelloWorld,
    SearchBar,
    Header
  },
  methods: {
    testing: function () {
      console.log(`Is this working? ${SearchBar.name}`)
    },
    toggleSearched: function () {
      console.log(`am i getting into this.searched?`)
      this.searched = !this.searched
    },
    login,
    logout
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
   
    <SearchBar/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
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
      authenticated
    }
  },
  components: {
    HelloWorld,
    SearchBar
  },
  methods: {
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

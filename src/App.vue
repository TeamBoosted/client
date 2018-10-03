<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
   
    <SearchBar/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="testing">testing</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import SearchBar from './components/searchBar.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    SearchBar
  },
  methods: {
    testing: function () {
      console.log(`Is this working? ${SearchBar.name}`)
    }
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

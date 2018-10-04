<template>
  <div id="app">
    <Header v-show="searched" />
    <img alt="Vue logo" src="./assets/logo.png">
    <SearchBar />
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="toggleSearched() + testing()">testing</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import SearchBar from './components/searchBar.vue'
import Header from './components/Header'

export default {
  name: 'app',
  data () {
    return {
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

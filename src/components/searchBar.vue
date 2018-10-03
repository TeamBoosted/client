<template>
  <div>
    <input type="text" v-model="input">
    <button @click="searchForMovie">Search</button>
    <div v-if="movies.length > 0">
      <ul>
        <DropdownList 
        v-for="movie in movies"
        v-bind:key="movie.id"
        v-bind:movie="movie"
        v-bind:searchForMovie="searchForMovie"
        >
        </DropdownList>
      </ul>
    </div>
  </div>
</template>





<script>
import axios from 'axios';
import dummyData from '../assets/dummyData.js'
import DropdownList from './DropdownList'

export default {
  name: 'SearchBar',
  components: {
    DropdownList
  },
  props: {
    placeHolder: String
  },
  data: function () {
    
    return {
      input: "",
      movies: dummyData,
    }
  },
  
  methods: {
    searchForMovie: function () {
      //axios request here
      console.log(`I'm searching for`,this.input)

      axios.get(`http://localhost:80/api/info/movies/${this.input}`)
        .then(function (response) {
          console.log( `we made it to the server!`,response);
        })
        .catch(function (error) {
          console.log('client to SERVER failed',error);
      });
    },
    saveToDatabase: function () {
      console.log(`I'm searching the database!!!`)
    }
  }
}
</script>
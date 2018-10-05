<template>
  <div>
      <div class=“block”>
           <b-icon
               icon=“account”
               size=“is-small”>
           </b-icon>
      </div>
    <input type="text" v-model="input">
    <button @click="searchForMovie();  showSearchResults = true">Search</button>
    <div v-if="movies.length > 0" >
      <ul>
        <MovieRec 
        v-for="movie in movies"
        v-bind:key="movie.id"
        v-bind:movie="movie"
        v-on:toggleSearchResults="toggleSearchResults($event)"
        >
        </MovieRec >
      </ul>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
import dummyData from '../assets/dummyData.js'
import DropdownList from './DropdownList'
import MovieRec from './MovieRec'


export default {
  name: 'SearchBar',
  components: {
    MovieRec
  },
  props: ['search'],
  data: function () {
    
    return {
      input: "",
      movies: dummyData,
    }
  },
  
  methods: {
    searchForMovie: function () {
      //axios request here
      let currentThis = this;
      this.$emit("searchedForMovie");

      axios.get(`http://localhost:80/api/info/movies/${this.input}`)
        .then(function (response) {
          // console.log( `we made it to the server!`,response);
          currentThis.movies = response.data
        })
        .catch(function (error) {
          console.log('client to SERVER failed',error);
      });
    },
    saveToDatabase: function () {
      console.log(`I'm searching the database!!!`)
    },
    toggleSearchResults: function (chosenMovie) {
      console.log('Here is toggled movie!',chosenMovie)
      this.showSearchResults = !this.showSearchResults

      
    }
  }
}
</script>
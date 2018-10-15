<template>
  <div>
    <input type="radio" value="movie" v-model="mediumType">
    <label>Movie</label>
    <input type="radio" value="tv" v-model="mediumType">
    <label>TV</label>
    <input type="radio" value="books" v-model="mediumType">
    <label>Books</label>
    <input type="text" v-model="input">
    <a class="button is-light" @click="searchForMedium();  showSearchResults = true">Search</a>
    <div v-if="movies.length > 0"  >
      <ul>
        <DropdownList 
        v-show="showSearchResults"
        v-for="movie in movies"
        v-bind:key="movie.id"
        v-bind:movie="movie"
        v-on:toggleSearchResults="toggleSearchResults($event)"
        v-bind:saveToDatabase="saveToDatabase"
        v-bind:getRecs="getRecs"
        v-bind:mediumType="mediumType"
        >
        </DropdownList>
      </ul>
    </div>
  </div>
</template>

<script>
import dummyData from "../assets/dummyData.js";
import DropdownList from "./DropdownList";
import getMovieService from "../services/getMovieService.js";
import getTvService from "../services/getTvService.js";
import getBookService from "../services/getBookService.js";


export default {
  name: "SearchBar",
  components: {
    DropdownList
  },
  props: ["search", "saveToDatabase", "getRecs"],
  data() {
    return {
      input: "",
      mediumType: "movie",
      movies: [],
      showSearchResults: true
    };
  },

  methods: {
    searchForMedium: async function() {
      //axios request here
      this.$emit("searchedForMovie");
      if (this.mediumType === "movie") {
        let movieResponse = await getMovieService(this.input);
        this.movies = movieResponse.data;
      } else if (this.mediumType === "tv") {
        let tvResponse = await getTvService(this.input);
        this.movies = tvResponse.data;
      } else if (this.mediumType === 'books') {
        let bookResponse = await getBookService(this.input)
        this.movies = bookResponse.data
      }
    },

    toggleSearchResults: function(chosenMovie) {
      console.log("Here is toggled movie!", chosenMovie);
      this.showSearchResults = !this.showSearchResults;
    }
  }
};
</script>
l<template>
  <div id="userInput">
    <div class="columns">
      <label class="radio is-size-5">
        <input type="radio" value="movie" v-model="mediumType">
        Movie
      </label>
      <label class="radio is-size-5">
        <input type="radio" value="tv" v-model="mediumType">
        TV
      </label>
      <label class="radio is-size-5">
        <input type="radio" value="books" v-model="mediumType">
        Books
      </label>
    </div>
    <div class="field" >
      <div class="columns">
        <input class="input is-medium is-rounded" type="text" v-model="input" placeholder="Search Media">
        <a  class="button is-light is-rounded is-size-5" @click="searchForMedium();  showSearchResults = true">Search</a>
      </div>
    </div>
    <div class="field">
      <div class="control">
      </div>
    </div>
    <div v-if="movies.length > 0"  >
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
      } else if (this.mediumType === "books") {
        let bookResponse = await getBookService(this.input);
        this.movies = bookResponse.data;
      }
    },

    toggleSearchResults: function(chosenMovie) {
      this.showSearchResults = !this.showSearchResults;
    }
  }
};
</script>

<style>
#userInput {
  max-width: 55%;
  margin: auto;
}
</style>
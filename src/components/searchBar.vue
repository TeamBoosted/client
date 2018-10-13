<template>
  <div>
    <input type="radio" value="movie" v-model="mediumType">
    <label>Movie</label>
    <input type="radio" value="tv" v-model="mediumType">
    <label>TV</label>
    <input type="text" v-model="input">
<<<<<<< HEAD
    <a class="button is-light" @click="searchForMedium();  showSearchResults = true">Search</a>
=======
    <a class="button is-light" @click="searchForMovie();  showSearchResults = true">Search</a>
>>>>>>> 731fee371d859e61883f7605680a70ec4f0b4cb4
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
        >
        </DropdownList>
      </ul>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import dummyData from "../assets/dummyData.js";
import DropdownList from "./DropdownList";
import getMovieService from "../services/getMovieService.js";
import getTvService from "../services/getTvService.js";
=======
import axios from "axios";
import dummyData from "../assets/dummyData.js";
import DropdownList from "./DropdownList";
import getMovieService from "../services/getMovieService.js";
>>>>>>> 731fee371d859e61883f7605680a70ec4f0b4cb4

export default {
  name: "SearchBar",
  components: {
    DropdownList
  },
  props: ["search", "saveToDatabase", "getRecs"],
  data() {
    return {
      input: "",
<<<<<<< HEAD
      mediumType: "movie",
=======
>>>>>>> 731fee371d859e61883f7605680a70ec4f0b4cb4
      movies: [],
      showSearchResults: true
    };
  },

  methods: {
<<<<<<< HEAD
    searchForMedium: async function() {
      //axios request here
      this.$emit("searchedForMovie");
      if (this.mediumType === "movie") {
        let movieResponse = await getMovieService(this.input);
        this.movies = movieResponse.data;
      } else if (this.mediumType === "tv") {
        let tvResponse = await getTvService(this.input);
        this.movies = tvResponse.data;
      }
=======
    searchForMovie: async function() {
      //axios request here
      this.$emit("searchedForMovie");
      let response = await getMovieService(this.input);
      this.movies = response.data;
>>>>>>> 731fee371d859e61883f7605680a70ec4f0b4cb4
    },

    toggleSearchResults: function(chosenMovie) {
      console.log("Here is toggled movie!", chosenMovie);
      this.showSearchResults = !this.showSearchResults;
    }
  }
};
</script>
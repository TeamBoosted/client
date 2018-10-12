<template>
  <div>
    <input type="text" v-model="input">
    <a class="button is-light" @click="searchForMovie();  showSearchResults = true">Search</a>
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
import axios from "axios";
import dummyData from "../assets/dummyData.js";
import DropdownList from "./DropdownList";
import getMovieService from "../services/getMovieService.js";

export default {
  name: "SearchBar",
  components: {
    DropdownList
  },
  props: ["search", "saveToDatabase", "getRecs"],
  data() {
    return {
      input: "",
      movies: [],
      showSearchResults: true
    };
  },

  methods: {
    searchForMovie: async function() {
      //axios request here
      this.$emit("searchedForMovie");
      let response = await getMovieService(this.input);
      this.movies = response.data;
    },

    toggleSearchResults: function(chosenMovie) {
      console.log("Here is toggled movie!", chosenMovie);
      this.showSearchResults = !this.showSearchResults;
    }
  }
};
</script>
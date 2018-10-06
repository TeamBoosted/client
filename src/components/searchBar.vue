<template>
  <div>
    <input type="text" v-model="input">
    <button @click="searchForMovie();  showSearchResults = true">Search</button>
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

export default {
  name: "SearchBar",
  components: {
    DropdownList
  },
  props: ["search", "saveToDatabase", "getRecs"],
  data () {
    return {
      input: "",
      movies: [],
      showSearchResults: true
    };
  },

  methods: {
    searchForMovie: function() {
      //axios request here
      let currentThis = this;
      this.$emit("searchedForMovie");

      axios
        .get(`http://localhost:80/api/info/movies/${this.input}`)
        .then(function(response) {
          currentThis.movies = response.data;
        })
        .catch(function(error) {
          console.log("client to SERVER failed", error);
        });
    },
   
    toggleSearchResults: function (chosenMovie) {
      console.log('Here is toggled movie!',chosenMovie)
      this.showSearchResults = !this.showSearchResults

      
    }
  }
};
</script>
<template>
  <ul>
    <li class="title" @click="searchForMovie(); toggleSearchResults(); saveToDatabase()" >{{movie.title}}</li>
      <ul>
        <li>{{movie.overview}}</li>
        <img :src="img">
      </ul>
    </ul>
</template>

<script>
import axios from "axios";
export default {
  name: "DropdownList",
  props: ["movie"],
  data () {
    return {
      img: `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${this.movie.poster_path}`
    }
  },
  methods: {
    searchForMovie: function() {
      //axios request here
      console.log(`I'm saving for`, this.movie.title);
    },
    saveToDatabase: function() {
      let currentThis = this;
      console.log(`I'm searching the database!!!`,this.movie);
      axios
        .post(`http://localhost:8081/db/addMedium`, {
          data: currentThis.movie
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toggleSearchResults: function() {
      // console.log('hey man!')
      this.$emit("toggleSearchResults", this.movie.title);
    }
  }
};
</script>

<style scoped>
</style>

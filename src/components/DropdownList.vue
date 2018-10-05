<template>
  <ul>
    <li class="title" @click="searchForMovie(); toggleSearchResults(); saveToDatabase()" >{{movie.title}}</li>
      <ul>
        <li>{{movie.overview}}</li>
      </ul>
    </ul>
</template>

<script>
import axios from "axios";
export default {
  name: "DropdownList",
  props: ["movie"],
  methods: {
    searchForMovie: function() {
      //axios request here
      console.log(`I'm saving for`, this.movie.title);
    },
    saveToDatabase: function() {
      let currentThis = this;
      console.log(`I'm searching the database!!!`);
      axios
        .post(`/api/db/addMedium`, {
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

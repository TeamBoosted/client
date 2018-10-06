<template>
  <ul>
    <li class="title" @click="toggleSearchResults(); saveToDatabase()" >{{movie.title}}</li>
      <ul>
        <img :src="img" class='poster' @click="toggleSearchResults(); saveToDatabase()">
        <li>{{movie.synopsis}}</li>
      </ul>
    </ul>
</template>

<script>
import {get, post} from "axios";
export default {
  name: "DropdownList",
  props: ["movie"],
  data () {
    return {
      img: `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${this.movie.poster_path}`
    }
  },
  methods: {
    
    saveToDatabase: function() {
      let currentThis = this;
      localStorage.moviesSaved++
      console.log('here is localStorage',localStorage)
      console.log(`I'm searching the database!!!`,this.movie);
        //posting movie to db
        post(`http://localhost:8081/db/addMedium`, {
          data: {
            movie: currentThis.movie,
            user: localStorage.id_token
          }
        })
        .then(function(response) {
          //getting reccs
          get(`https://localhost:80/api/rec/movies/${this.movie.id}`)
            // .then(response => {
            //   if (!localStorage.reccommendations){
            //     localStorage.setItem('recommendations', response);
            //   }
            //   localStorage.recommendations.push(response);
            // })
          })
        .catch(function(error) {
          console.log('saving movie to DB or getting movie recs failed',error);
        });
    },
    toggleSearchResults: function() {
      // console.log('hey man!')
      this.$emit("toggleSearchResults", this.movie.title);
    },
  }
};
</script>

<style scoped>
  .poster{
    max-width: 25%;
    max-height: 25%;
  }
</style>

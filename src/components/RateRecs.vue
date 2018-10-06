<template>
  <div>
    <input type="text" v-model="input">
    <div v-if="movies.length > 0" >
      <ul>
        <MovieRec 
        v-for="movie in this.movies"
        v-bind:key="movie.id"
        v-bind:movie="movie"
        >
        </MovieRec >
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MovieRec from './MovieRec';


export default {
  name: 'SearchBar',
  components: {
    MovieRec
  },
  props: ['search', 'movies'],
  data: function () {
    
    return {
      input: ""
    }
  },
  
}
</script>
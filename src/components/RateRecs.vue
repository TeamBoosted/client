<template>
  <div>
    <p> Great job! Now that you've given us some of your favorite films, we've got some reccomendations for you </p>  
    <p> Give us at thumbs up or thumbs down on the following movies. We will save them to your profile! </p>
    <div v-if="movies.length > 0" >
      <ul>
        <MovieRec
        v-bind:movies="movies"
        v-bind:getRecs="getRecs"
        v-bind:getGenreRecs="getGenreRecs"
        v-bind:increment="increment"
        v-bind:index="index"
        >
        </MovieRec >
      </ul>
    </div>
  </div>
</template>

<script>
import MovieRec from "./MovieRec";

export default {
  name: "RateRecs",
  components: {
    MovieRec
  },
  props: ["movies", "getRecs", "getGenreRecs", "increment", "index"]
};
</script>
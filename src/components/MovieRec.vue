
<template>
  <ul>
    <li class="title">{{currentMovie.title}}</li>
      <ul>
        <div class="block">
          <i class="material-icons" @click="thumbsUp(currentMovie); getGenreRecs(currentMovie); increment();">thumb_up</i>
          </div>  
        <img :src="currentMovie.image" class='poster'>
        <br>
        <br>
        <i class="material-icons" @click="thumbsDown(); increment();">thumb_down</i>
        <li>{{currentMovie.synopsis}}</li>

      </ul>
    </ul>
</template>

<script>
import addMediumService from "../services/addMediumService.js";

export default {
  name: "MovieRec",
  props: ["movies", "getRecs", "getGenreRecs"],
  data() {
    return {
      index: 0
    };
  },
  computed: {
    currentMovie: function() {
      return this.movies[this.index];
    }
  },
  methods: {
    increment: function() {
      if (this.index < this.movies.length - 1) {
        this.index = this.index + 1;
      }
    },
    thumbsUp: function(movie) {
      addMediumService(movie, localStorage.id_token);
    },
    thumbsDown: function() {
      console.log("Thumbs Down, booo");
    }
  }
};
</script>

<style scoped>
.poster {
  max-width: 25%;
  max-height: 25%;
}

.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px; /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";
}
</style>


<template>
  <ul>
    <li class="title">{{currentMovie.title}}</li>
      <ul>
        <div class="flex-container">
          <div class="box">
            <i class="material-icons" id="thumbs-up" @click="thumbsUp(currentMovie); getGenreRecs(currentMovie); increment();">thumb_up</i>
          </div>
          <div class="poster">
            <img :src="currentMovie.image" class="poster">
          </div>  
          <br>
          <br>
          <div class="box">
            <i class="material-icons" name="thumbs-down" @click="thumbsDown(); increment();">thumb_down</i>
          </div>
        </div>
        <li>{{currentMovie.synopsis}}</li>

      </ul>
    </ul>
</template>

<script>
import addMediumService from "../services/addMediumService.js";

export default {
  name: "MovieRec",
  props: ["movies", "getRecs", "getGenreRecs", "increment", "index"],
  data() {
    return {};
  },
  computed: {
    currentMovie: function() {
      return this.movies[this.index];
    }
  },
  computed: {
    currentMovie: function() {
      return this.movies[this.index];
      //getting rid of duplicate log can go here
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
  width: 45%;
  height: 45%;
  margin-left: -9%;
  margin-right: -9%;
}

.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 30px; /* Preferred icon size */
  display: block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  position: relative;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";
}
.box {
  width: 45px;
  height: 45px;
  padding: 7px;
  align-self: center;
}
.flex-container {
  display: flex;
  flex-wrap: wrap;
  /* position: relative; */
  justify-content: center;
}
</style>

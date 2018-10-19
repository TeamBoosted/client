
<template>
  <ul>
    <template>
      <div v-if="currentMovie.type === 'tv'">
        <img src="https://ubisafe.org/images/transparent-tv-black-and-white-1.png" alt="" class ='icons'>
      </div>
      <div v-else-if="currentMovie.type === 'movie'" >
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKbC76g1RLAzc65FRd5NwsXqSVlCYmsCrr7Sf4f1qyYZO36CFZxg" alt="" class ='icons'>
      </div>
      <div v-else-if="currentMovie.type === 'book'" id="book">
        <img src="https://image.flaticon.com/icons/png/128/182/182321.png" alt="" class ='icons'>
      </div>

    </template>
    <li class="title">{{currentMovie.title}}</li>
      <ul>
        <div class="flex-container">
          <div class="box">
            <i class="material-icons" name="thumbs-down" @click="thumbsDown(); increment();">thumb_down</i>
          </div> 
          <div class="poster">
            <img :src="currentMovie.image" class="poster">
          </div>  
          <br>
          <br>
          <div class="box">
            <i class="material-icons" id="thumbs-up" @click="thumbsUp(currentMovie); getGenreRecs(currentMovie); increment();">thumb_up</i>
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
    thumbsUp: function(movie) {
      addMediumService(movie, localStorage.id_token);
    },
    thumbsDown: function() {}
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

.icons {
  min-width: 8%;
  min-height: 8%;
  max-width: 10%;
  max-height: 10%;
}

#book {
  margin-left: 25%;
  margin-right: 25%;
  min-width: 50%;
  min-height: 50%;
  max-width: 25%;
  max-height: 25%;
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

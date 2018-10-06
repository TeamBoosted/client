
<template>
  <ul v-if="wasVoted">
    <li class="title" @click="toggleSearchResults(); saveToDatabase()" >{{movie.title}}</li>
      <ul>
        <div class="block">
          <i class="material-icons" @click="thumbsUp(); voted()">thumb_up</i>
          </div>  
        <img :src="img + movie.image" class='poster' @click="toggleSearchResults(); saveToDatabase()">
        <br>
        <br>
        <i class="material-icons" @click="thumbsDown(); voted()">thumb_down</i>
        <li>{{movie.synopsis}}</li>

      </ul>
    </ul>
</template>

<script>
import axios from "axios";
export default {
  name: "DropdownList",
  props: ["movie"],
  data() {
    return {
      img: `https://image.tmdb.org/t/p/w600_and_h900_bestv2`,
      wasVoted: true
    };
  },
  methods: {
    thumbsUp: function() {
      let currentThis = this;
      console.log('Thumbs up! wooohooo!')
      //upvoting to DB  
      axios.post(`http://localhost:8081/db/addMedium`, {
        data: currentThis.movie
      })
        .then(function(response) {
          //getting reccs
        axios.get(`https://localhost:80/api/rec/movies/${this.movie.id}`);
        })
        .catch(function(error) {
          console.log("saving movie to DB or getting movie recs failed", error);
        });
    },
    thumbsDown: function () {
       console.log('Thumbs Down, booo')
    },
    voted: function () {
      this.wasVoted = !this.wasVoted
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
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
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
  font-feature-settings: 'liga';
}
</style>

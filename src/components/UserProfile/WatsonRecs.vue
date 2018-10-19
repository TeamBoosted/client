<template>
  <div>
    <template v-if="showPersonality === false">
      <a @click="getRecsByPersonality" class="button is-light"> Get Artistic Recommendations by Taste </a>
    </template>
  <template v-if="showPersonality">
    <div class="columns" id="books">
      <!-- BOOOOOOOKS -->
      <div class="column is-one-fifth">
        <div>
          <img class="icons" src="https://image.flaticon.com/icons/png/128/182/182321.png" >
        </div>
      </div>
        <div class="column is-one-quarter">
          <h1 class="is-size-4">{{bookRecs[0].title}}</h1>
          <img class="poster" :src="bookRecs[0].image" >
          <p>{{bookRecs[0].synopsis}}</p>
        </div>

        <div class="column is-one-quarter">
          <h1 class="is-size-4">{{bookRecs[1].title}}</h1>
          <img class="poster" :src="bookRecs[1].image" >
          <p>{{bookRecs[1].synopsis}}</p>
        </div>

        <div class="column is-one-quarter">
          <h1 class="is-size-4">{{bookRecs[2].title}}</h1>
          <img class="poster" :src="bookRecs[2].image" >
          <p>{{bookRecs[2].synopsis}}</p>
        </div>
    </div>

    <div class="columns" id="tv">
      <!-- TV TV TV TV TV TV-->
      <div class="column is-one-fifth">
        <img class="icons" src="https://ubisafe.org/images/transparent-tv-black-and-white-1.png" >
      </div>
        <div class="column is-one-quarter">
          <h1 class="is-size-4">{{tvRecs[0].title}}</h1>
          <img class="poster" :src="tvRecs[0].image" >
          <p>{{tvRecs[0].synopsis}}</p>
        </div>

        <div class="column is-one-quarter">
          <h1 class="is-size-4">{{tvRecs[1].title}}</h1>
          <img class="poster" :src="tvRecs[1].image" >
          <p>{{tvRecs[1].synopsis}}</p>
        </div>

        <div class="column is-one-quarter">
          <h1 class="is-size-4">{{tvRecs[2].title}}</h1>
          <img class="poster" :src="tvRecs[2].image" >
          <p>{{tvRecs[2].synopsis}}</p>
        </div>
    </div>

    <div class="columns" id="movies">
      <!-- MOVIES MOVIES MOVIES -->
      <div class="column is-one-fifth">
        <img class="icons" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKbC76g1RLAzc65FRd5NwsXqSVlCYmsCrr7Sf4f1qyYZO36CFZxg" >
      </div>
      <!-- //book one -->
        <div class="column is-one-quarter">
          <h1 class="is-size-4">{{movieRecs[0].title}}</h1>
          <img class="poster" :src="movieRecs[0].image" >
          <p>{{movieRecs[0].synopsis}}</p>
        </div>

        <div class="column is-one-quarter">
          <h1 class="is-size-4">{{movieRecs[1].title}}</h1>
          <img class="poster" :src="movieRecs[1].image" >
          <p>{{movieRecs[1].synopsis}}</p>
        </div>

        <div class="column is-one-quarter">
          <h1 class="is-size-4">{{movieRecs[2].title}}</h1>
          <img class="poster" :src="movieRecs[2].image" >
          <p>{{movieRecs[2].synopsis}}</p>
        </div>
    </div>

  </template>

  

  </div>
</template>

<script>
import axios from "axios";
import { API_SERVER } from "../../../config.js";

export default {
  name: "WatsonRecs",
  props: ["personalityInfo"],
  data() {
    return {
      showPersonality: false,
      bookRecs: [],
      tvRecs: [],
      movieRecs: []
    };
  },
  methods: {
    getRecsByPersonality: async function() {
      let type, genre_id;
      let bookRecs = [];
      let tvRecs = [];
      let movieRecs = [];
      if (this.personalityInfo.Extraversion > 80) {
        genre_id = 35;
      } else if (this.personalityInfo.Emotional_range > 75) {
        genre_id = 12;
      } else if (
        this.personalityInfo.Agreeableness < 15 &&
        this.personalityInfo.Conscientiousness < 15
      ) {
        genre_id = 27;
      } else {
        genre_id = 18;
      }

      try {
        let movie, tv, book;
        movie = await axios.get(
          `${API_SERVER}/api/rec/movies/genre/${genre_id}`
        );
        tv = await axios.get(`${API_SERVER}/api/rec/tv/genre/${genre_id}`);
        book = await axios.get(
          `${API_SERVER}/api/db/getBookRecsByGenre/${genre_id}`
        );

        let arr = [...movie.data, ...tv.data];

        book.data.forEach(rec => {
          if (rec) {
            arr.push(rec);
          }
        });

        arr.sort(function(a, b) {
          return b.vote_avg - a.vote_avg;
        });

        let sortedArr = [];

        arr.forEach((entry, index) => {
          if (entry.type === "book" && entry.vote_count > 2000) {
            bookRecs.push(entry);
          } else if (entry.type === "tv" && entry.vote_count > 300) {
            tvRecs.push(entry);
          } else if (
            entry.type === "movie" &&
            entry.vote_count > 500 &&
            entry.title !== "BlacKkKlansman"
          ) {
            movieRecs.push(entry);
          }
        });

        this.bookRecs = bookRecs;
        this.tvRecs = tvRecs;
        this.movieRecs = movieRecs;
      } catch (err) {
        console.log(err);
      }

      this.showPersonality = !this.showPersonality;
    }
  }
};
</script>

<style scoped>
.poster {
  max-width: 85%;
  max-height: 85%;
  margin-left: auto;
  margin-right: auto;
}

.icons {
  margin-top: 50%;
  margin-bottom: 50%;
}
.is-size-4 {
  max-width: 230px;
  align-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
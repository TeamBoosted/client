<template>
  <ul>
    <li class="title" @click="toggleSearchResults(); getRecs(movie); saveToDatabase(movie);">{{movie.title}}</li>
      <ul>
        <img :src="img + movie.image" class='poster' @click="toggleSearchResults(); saveToDatabase(movie); getRecs(movie);">
        <li>{{movie.synopsis}}</li>
      </ul>
    </ul>
</template>

<script>
export default {
  name: "DropdownList",
  props: ["movie", "saveToDatabase", "getRecs"],
  data() {
    return {
      img: `https://image.tmdb.org/t/p/w600_and_h900_bestv2`
    };
  },
  methods: {
    toggleSearchResults: function() {
      this.$emit("toggleSearchResults", this.movie.title);
    }
  }
};
</script>

<style scoped>
.poster {
  max-width: 25%;
  max-height: 25%;
}
</style>

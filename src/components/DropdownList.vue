<template>
  <ul>
    <li class="title" @click="toggleSearchResults(); getRecs(movie); saveToDatabase(movie);">{{movie.title}}</li>
      <ul>
          <img :src="movie.image" class='poster' @click="toggleSearchResults(); saveToDatabase(movie); getRecs(movie);">
        <li>{{movie.synopsis}}</li>
      </ul>
    </ul>
</template>

<script>
export default {
  name: "DropdownList",
  props: ["movie", "saveToDatabase", "getRecs", "mediumType"],
  data() {
    return {};
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
  width: 20%;
  height: 20%;
}

</style>

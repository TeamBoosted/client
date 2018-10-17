<template>
    <div class="column is-one-third" id="favorite">
      <h1  style="font-size:36px; font-weight:bold">{{favorite.title}}</h1>
         <img :src="favorite.image" class='poster'>
      <h4>{{favorite.synopsis}}</h4>
    </div>
</template>

<script>
export default {
  name: "FavoritesList",
  props: ["favorite"],
  data() {
    return {};
  }
};
</script>

<style scoped>
#favorite {
  display: inline-grid;
}
.poster {
  max-width: 60%;
  max-height: 60%;
  margin-left: auto;
  margin-right: auto;
}
</style>
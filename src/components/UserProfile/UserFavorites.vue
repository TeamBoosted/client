<template>
  <div>
    <div class="column is-full">
      <a  class="button is-primary" @click="getUserFavorites"> Get Your Favorites</a>
    </div>
    <p></p>
    <template v-if="showFavorites">
      <FavoritesList
      v-for="favorite in userFavorites"
      v-bind:key="favorite.id"
      v-bind:favorite="favorite" 
      />
    </template>

  </div>
</template>

<script>
import FavoritesList from "./FavoritesList.vue";
import getAllMedia from "../../services/getAllMedia.js";

export default {
  name: "UserFavorites",
  components: { FavoritesList },
  data() {
    return {
      userFavorites: { this: "is the default value for userFavorites" },
      showFavorites: false
    };
  },
  methods: {
    getUserFavorites: async function() {
      //get user favorites
      //add them to state
      let userFavorites = await getAllMedia(localStorage.id_token);
      this.userFavorites = userFavorites.data;

      this.showFavorites = !this.showFavorites;
    }
  },
  beforeMounted: function() {
    this.getUserFavorites();
  }
};
</script>

<style scoped>
</style>
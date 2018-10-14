<template>
  <div>
    <p>Welcome to your tailored profile! </p>
    <p>Here you can find your favorite works of art, as well as those you found interestings</p>
    <p>We also offer a personality analysis based off of your favorite works of art!</p>
    <a 
      class="button-is-primary"
      @click="getPersonality"
    >
    Get Personality
    </a>
  </div>
</template>

<script>
import getWatsonService from "../services/getWatsonService.js";

  
  export default {
    name: 'Profile',
    data () {
      return {

      }
    },
    methods: {
      getPersonality: async function () {
        console.log('getting personality')
        let watsonResponse = await getWatsonService()
        console.log('i am in the watson response in client')
      }
    }
  }
</script>

<style scoped>

</style>
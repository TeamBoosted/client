<template>
  <div>
    <h1>{{title}}</h1>
    <h4>{{tag}}</h4>
  </div>
</template>



<script>
  export default {
    data () {
      return {
        title: 'Welcome to BetterArt!',
        tag: 'A better way to find your favorite things'
      }
    }
  }
</script>


<style scoped>
  h1 {
    color:lightslategray;
    text-align: center;
  }
  h4 {
    color:rgba(83, 107, 138, 0.5);
    text-align: center;
  }
</style>

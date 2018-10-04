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
    color:lightsteelblue;
    text-align: center;
  }
</style>

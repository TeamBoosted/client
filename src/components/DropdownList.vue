

<template>
  <ul>
    <li @click="searchForMovie">{{movie.title}}</li>
    </ul>
</template>

<script>

export default {
  name: 'DropdownList',
  props: ['movie'],
  methods: {
    searchForMovie: function () {
      //axios request here
      console.log(`I'm saving for`,this.movie.title)
     
    },
    saveToDatabase: function () {
      console.log(`I'm searching the database!!!`)
       // axios.get(`api/info/movie/${this.input}`)
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      // });
    }

  }
}
</script>

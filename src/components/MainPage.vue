<template>
  <div class="main">
    <div class="container">
      <h1>{{ films.nameRu }}</h1>
      <h1>{{ films.filmId }}</h1>
      <h1>{{ films.year }}</h1>
      <img :src="films.posterUrlPreview" alt=""/>
      <button @click.prevent="getFilms">Load</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    pagesCount: {},
    films: {
      filmId: '',
      nameRu: '',
      year: '',
      posterUrlPreview: ''
    },
    error: '',
  }),
  methods: {
    getFilms() {
      const config = {
        headers: {
          'X-API-KEY': '56dd76f7-19f6-4e8c-96de-c03987d8470c',
          'Content-Type': 'application/json',
          withCredentials: true
        }
      };
      axios
          .get('https://kinopoiskapiunofficial.tech/api/v2.2/films/top', config)
          .then(response => (this.films = response.data.films))
          .catch(err => (this.error = err))
    }
  },
// },
  // mounted() {
  //   const config = {
  //     headers:{
  //       'X-API-KEY': '56dd76f7-19f6-4e8c-96de-c03987d8470c',
  //       'Content-Type': 'application/json',
  //       withCredentials: true
  //     }
  //   };
  //   axios
  //       .get('https://kinopoiskapiunofficial.tech/api/v2.2/films/top', config)
  //       .then(response => (this.info = response))
  //       .catch(err => (this.error = err))
  // }
}
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 300px;
  height: 300px;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}
</style>

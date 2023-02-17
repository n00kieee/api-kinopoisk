<template>
  <h1>Kinopoisk API</h1>
  <div class="main">
    <select
      v-model="selectedItem"
      @change="$emit('selected', selectedItem, getId())"
    >
      <option selected disabled>Выберите фильм</option>
      <option v-for="(films, i) in films" :value="films" :key="i">
        {{ films.nameRu }}
      </option>
    </select>
  </div>

  <div v-if="selectedItem" class="card-film">
    <div class="name">
      <p>{{ selectedItem.nameRu }}</p>
    </div>
    <div class="year">
      <p>{{ selectedItem.year }}</p>
    </div>
    <div class="img">
      <img :src="selectedItem.posterUrlPreview" />
    </div>
    <div class="descript">
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $api from "@/api/index.js";

export default {
  data: () => ({
    films: [
      {
        filmId: "",
        nameRu: "",
        year: "",
        posterUrlPreview: "",
      },
    ],
    selectedItem: "",
    description: "",
  }),
  methods: {
    getFilms() {
      // console.log($api.get)
      $api
        .get("films/top")
        .then((response) => (this.films = response.data.films))
        .catch((error) => (this.error = error));
    },
    // getId() {
    // const config = {
    //   headers: {
    //     "X-API-KEY": "56dd76f7-19f6-4e8c-96de-c03987d8470c",
    //     "Content-Type": "application/json",
    //     withCredentials: true,
    //   },
    // };
    //   axios
    //     .get(
    //       `https://kinopoiskapiunofficial.tech/api/v2.2/films/` +
    //         this.selectedItem.filmId,
    //       config
    //     )
    //     .then((response) => (this.description = response.data.description))
    //     .catch((error) => (this.error = error));
    // },
  },
  mounted() {
    this.getFilms();
    // const config = {
    //   headers: {
    //     "X-API-KEY": "56dd76f7-19f6-4e8c-96de-c03987d8470c",
    //     "Content-Type": "application/json",
    //     withCredentials: true,
    //   },
    // };
    //   axios
    //     .get("https://kinopoiskapiunofficial.tech/api/v2.2/films/top", config)
    //     .then((response) => (this.films = response.data.films))
    //     .catch((error) => (this.error = error));
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
.main {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.card-film {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 1000px;
  margin: 150px;
  background-color: rgba(213, 223, 230, 0.753);
  border-radius: 30px;
}

.name {
  text-align: center;
}

.year {
  text-align: center;
}

.img {
  text-align: center;
}

.descript {
  text-align: center;
}
</style>

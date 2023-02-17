<template>
  <header class="header">
    <a href="https://www.kinopoisk.ru/"
    ><img class="logo" src="@/assets/logo.svg"
    />
    </a>
    <nav class="nav">
      <li>
        <a href="https://hd.kinopoisk.ru/">Онлайн-кинотеатр</a>
      </li>
      <li>
        <a
            href="https://www.kinopoisk.ru/special/oscar/?utm_source=kinopoisk&utm_medium=selfpromo_kp&utm_campaign=button_header"
        >Оскар-2023
        </a>
      </li>
    </nav>
    <div class="search">
      <select
          v-model="selectedItem"
          @change="$emit('selected', selectedItem, getId())"
      >
        <option disabled value="">Выберите фильм</option>
        <option v-for="(films, i) in films" :value="films" :key="i">
          {{ films.nameRu }}
        </option>
      </select>
    </div>
  </header>

  <div
      v-if="selectedItem"
      class="card-film"
  >
    <div class="film-img"
         :style="{ backgroundImage: `url(${ selectedItem.posterUrlPreview })`, width: '100%', height: '100%', }"></div>
    <div class="film-info">
      <h1>{{ selectedItem.nameRu }}</h1>
      <h2>{{ selectedItem.year }}</h2>
      <h3>{{ description }}</h3>
    </div>
  </div>
  <div class="error">
    <p>{{ error }}</p>
  </div>

</template>

<script>
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
    error: "",
  }),
  methods: {
    getFilms() {
      $api
          .get("films/top")
          .then((response) => (this.films = response.data.films))
          .catch((error) => (this.error = error));
    },
    getId() {
      $api
          .get(`films/${this.selectedItem.filmId}`)
          .then((response) => (this.description = response.data.description))
          .catch((error) => (this.error = error));
    },
  },
  mounted() {
    this.getFilms();
  },
};
</script>

<style scoped>

h1, h2, h3 {
  text-align: center;
}

li {
  list-style: none;
  margin: 10px;
}

a {
  color: #afaeae;
  text-decoration: none;
}

a:hover {
  color: #fff;
}

select {
  border-radius: 25px;
  width: 100%;
}

.header {
  display: flex;
  justify-content: center;
  background-color: #141414;
}

.nav {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.logo {
  margin: 25px;
}

.search {
  display: flex;
  align-items: center;
}

.card-film {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  max-width: 800px;
  height: 300px;
  background-position: center;
  background-size: cover;
  margin: 35px auto;
  border-radius: 15px;
  box-shadow: 2px 3px 12px rgba(0, 0, 0, .4);
  color: #141414;
  padding: 15px;
}

.film-img {
  background-size: contain;
  background-repeat: no-repeat;
}

.error {
  text-align: center;
  color: red;
}
</style>

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
          @change="$emit('selected', selectedItem, getData())"
      >
        <option disabled value="">Выберите фильм</option>
        <option v-for="(films, i) in films" :value="films" :key="i">
          {{ films.nameRu }}
        </option>
      </select>
    </div>
  </header>

  <div class="movie-card" v-if="selectedItem">
    <div class="info-section">
      <div class="movie-header">
        <img class="img-prev" :src="selectedItem.posterUrlPreview"
             alt=""/>
        <h1>{{ selectedItem.nameRu }}</h1>
        <h4>{{ selectedItem.year }}, {{ directorRu }}</h4>
        <span class="minutes">{{ selectedItem.filmLength }}</span>
        <p class="type"
           v-for="item in selectedItem.genres"
        >
          {{ item.genre }}</p>
      </div>
      <div class="movie-desc">
        <p class="text">
          {{ shortDescription }}
        </p>
      </div>
      <div class="trailer">
        <a class="trailer-btn" v-bind:href="trailerUrl" target="_blank">Смотреть трейлер</a>
      </div>
    </div>
    <div
        class="blur-back bright-back"
        :style="{ backgroundImage: `url(${ selectedItem.posterUrl })`}"
    ></div>
  </div>
</template>


<script>
import $api from "@/api/index.js";
import {createToast} from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'


export default {
  data: () => ({
    films: [
      {
        filmId: "",
        nameRu: "",
        year: "",
        posterUrl: "",
        filmLength: "",
        genres: [{genre: ""}],
        posterUrlPreview: "",
      },
    ],
    selectedItem: "",
    shortDescription: "",
    directorRu: "",
    trailerUrl: ""
  }),
  methods: {
    getFilms() {
      $api
          .get("v2.2/films/top")
          .then((response) => (this.films = response.data.films))
          .then((loadApi) => createToast(loadApi = "Успешное подключение к API", {
            showIcon: 'true',
            type: 'success',
            transition: 'zoom',
          }))
          .catch((error) => createToast(error = "Ошибка подключения к API", {
            showIcon: 'true',
            type: 'warning',
            transition: 'zoom',
          }));
    },
    getData() {
      $api
          .get(`v2.2/films/${this.selectedItem.filmId}`)
          .then((response) => (this.shortDescription = response.data.shortDescription))
          .catch((error) => createToast(error = "Ошибка получения ID выбраного фильма", {
            showIcon: 'true',
            type: 'warning',
            transition: 'zoom',
          }));
      $api
          .get(`v1/staff?filmId=${this.selectedItem.filmId}`)
          .then((response) => (this.directorRu = response.data[0].nameRu))
          .catch((error) => createToast(error = "Ошибка получения directorRu выбраного фильма", {
            showIcon: 'true',
            type: 'warning',
            transition: 'zoom',
          }));
      $api
          .get(`v2.2/films/${this.selectedItem.filmId}/videos`)
          .then((response) => (this.trailerUrl = response.data.items[0].url))
          .catch((error) => createToast(error = "Ошибка получения trailerUrl выбраного фильма", {
            showIcon: 'true',
            type: 'warning',
            transition: 'zoom',
          }));
    },
  },
  mounted() {
    this.getFilms();
  },
};
</script>

<style scoped>
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
  transition: all 0.4s;
}

select {
  border-radius: 5px;
  width: 100%;
  margin: 10px;
  color: #fff;
  background-color: rgba(56, 55, 55, 0.44);
}

.header {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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

.movie-card {
  position: relative;
  display: block;
  width: 800px;
  height: 400px;
  margin: 100px auto;
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.4s;
  box-shadow: 0 0 150px -45px rgba(255, 51, 0, 0.5);
}

.movie-card:hover {
  transform: scale(1.02);
  transition: all 0.4s;
  box-shadow: 0 0 120px -55px rgba(255, 51, 0, 0.5);
}

.movie-card .info-section {
  position: relative;
  width: 100%;
  height: 100%;
  background-blend-mode: multiply;
  z-index: 2;
  border-radius: 10px;
}

.movie-card .info-section .movie-header {
  position: relative;
  padding: 25px;
  height: 40%;
}

.movie-card .info-section .movie-header h1 {
  color: #fff;
  font-weight: 400;
}

.movie-card .info-section .movie-header h4 {
  color: #9ac7fa;
  font-weight: 400;
}

.movie-card .info-section .movie-header .minutes {
  display: inline-block;
  margin-top: 10px;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.13);
}

.movie-card .info-section .movie-header .type {
  display: inline-block;
  color: #cee4fd;
  margin-left: 10px;
}

.movie-card .info-section .movie-header .img-prev {
  position: relative;
  float: left;
  margin-right: 20px;
  height: 120px;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.5);
}

.movie-card .info-section .movie-desc {
  padding: 25px;
  height: 45%;
}

.movie-card .info-section .movie-desc .text {
  color: #cfd6e1;
}

.movie-card .info-section .trailer {
  display: flex;
  justify-content: center;
}

.movie-card .info-section .trailer .trailer-btn {
  display: inline-flex;
  align-items: center;
  border-radius: 30px;
  margin: 5px;
  padding: 10px;
  background: linear-gradient(135deg, #f50 69.93%, #d6bb00);
  color: #fff;
}

.movie-card .info-section .trailer .trailer-btn:before {
  display: inline-flex;
  justify-content: center;
  width: 24px;
  height: 24px;
  content: "";
  background-image: url('@/assets/play-btn.svg');
  background-repeat: no-repeat;
  background-position: 100%;
}

.movie-card .info-section .trailer .trailer-btn:hover {
  background: linear-gradient(135deg,#eb4e00 69.91%,#c5ac00);
  transform: scale(1.05);
}

.movie-card .blur-back {
  position: absolute;
  top: 0;
  z-index: 1;
  height: 100%;
  right: 0;
  background-size: cover;
  border-radius: 11px;
}

@media screen and (min-width: 768px) {
  .movie-header {
    width: 60%;
  }

  .movie-desc {
    width: 50%;
  }

  .trailer {
    width: 50%;
  }

  .info-section {
    background: linear-gradient(to right, #0d0d0c 50%, transparent 100%);
  }

  .blur-back {
    width: 80%;
    background-position: -100% 10% !important;
  }
}

@media screen and (max-width: 768px) {
  .movie-card {
    width: 95%;
    margin: 70px auto;
    min-height: 350px;
    height: auto;
  }

  .blur-back {
    width: 100%;
    background-position: 50% 50% !important;
  }

  .movie-header {
    width: 100%;
    margin-top: 85px;
  }

  .movie-desc {
    width: 100%;
  }

  .trailer {
    width: 100%;
  }

  .info-section {
    background: linear-gradient(to top, #141413 50%, transparent 100%);
    display: inline-grid;
  }
}
</style>

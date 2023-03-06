<template>
  <MainPage/>
</template>

<script>
import MainPage from './components/MainPage.vue'

export default {
  components: {
    MainPage,
  },
}
</script>

<style>
*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: rgba(20, 20, 20, 0.8);
}
</style>

<template>
    <div class="wrapper">
      <MainPage/>
    </div>
</template>

<script setup>
import MainPage from './components/MainPage.vue'
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

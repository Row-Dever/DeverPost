<template>
  <header class="w-full h-16 fixed top-0 left-0 px-4 border-b border-gray-200">
    <h1 class="ir">네비게이션</h1>
    <Header></Header>
  </header>
  <main class="pt-16"><RouterView /></main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from './Header/Header.vue'
</script>

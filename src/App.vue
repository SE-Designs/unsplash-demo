<script setup lang="ts">
import { RouterView } from 'vue-router'

console.log(import.meta.env.VITE_API_URL)
</script>

<template>
  <NavHeader />
  <RouterView />
</template>

<style lang="scss">
@import './assets/base.scss';
</style>

<script setup lang="ts">
import { useFetch } from '@/utils/useFetch'

const url = window.location.href.split('/')
const id = url[url.length - 1]

const { data, loading, error } = useFetch(`${import.meta.env.VITE_API_PHOTO}&id=${id}`)
</script>

<template>
  <main class="container">
    <div class="loading" v-if="loading">
      <h2>Loading</h2>
    </div>
    <div class="error" v-else-if="error">
      <h2>Something went wrong</h2>
      <p>{{ error }}</p>
    </div>
    <div class="photo-container">
      {{ data }}
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  margin-top: 40px;
}
</style>

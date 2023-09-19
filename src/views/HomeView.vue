<script setup lang="ts">
import { useFetch } from '@/utils/useFetch'

const { data, loading, error } = useFetch(import.meta.env.VITE_API_URL)
</script>

<template>
  <SearchbarSection />
  <main>
    <div class="container">
      <div class="loading" v-if="loading">
        <h2>Loading</h2>
      </div>
      <div class="error" v-else-if="error">
        <h2>Something went wrong</h2>
        <p>{{ error }}</p>
      </div>
      <div class="grid" v-else-if="data">
        <RouterLink
          class="photo-link"
          v-for="item in data"
          :key="item"
          :to="{ name: 'Photo', params: { id: item.id } }"
        >
          <img :src="item.urls.regular" :alt="item.alt_description" width="300" height="300" />
        </RouterLink>
      </div>
      <div v-else></div>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 12px;
}

.grid {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 12px;
}

.photo-link {
  flex: 0 0 300px;
  height: 300px;
}

img {
  border-radius: 12px;
}
</style>

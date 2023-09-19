<script setup lang="ts">
import ArrowUpIcon from '@/assets/icons/ArrowUpIcon.vue'
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
    </div>
    <a href="#" class="to-the-top">
      <ArrowUpIcon />
    </a>
  </main>
</template>

<style scoped lang="scss">
.to-the-top {
  position: absolute;
  right: 64px;
  bottom: 64px;

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  border: 1px solid $gray;
  border-radius: 4px;
}
</style>

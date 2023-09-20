<script setup lang="ts">
import ArrowUpIcon from '@/assets/icons/ArrowUpIcon.vue'
import EyeIcon from '@/assets/icons/EyeIcon.vue'
import { useInfiniteScroll } from '@/utils/useInfiniteScroll'

const { data, loading, error, refetch } = useInfiniteScroll()

const showing = ref()

function onSearchUpdated(query: string) {
  console.log(query)
  refetch(query)
}

watch(data, () => {
  showing.value = data.value
})
</script>

<template>
  <SearchbarSection @search="onSearchUpdated" />
  <main>
    <div class="container">
      <div class="loading" v-if="loading">
        <h2>Loading</h2>
      </div>
      <div class="error" v-else-if="error">
        <h2>Something went wrong</h2>
        <p>{{ error }}</p>
      </div>
      <div class="grid" v-else-if="showing.length > 0">
        <RouterLink
          class="photo-link"
          v-for="item in showing"
          :key="item.id"
          :to="{ name: 'Photo', params: { id: item.id } }"
        >
          <img :src="item.urls.regular" :alt="item.alt_description" width="300" height="300" />
        </RouterLink>
      </div>
      <div class="no-data" v-else>
        <div class="icon-wrapper">
          <EyeIcon />
        </div>
        <h3>Здесь ничего нет</h3>
      </div>
    </div>
    <a href="#" class="to-the-top">
      <ArrowUpIcon />
    </a>
  </main>
</template>

<style scoped lang="scss">
.to-the-top {
  position: fixed;
  right: 48px;
  bottom: 48px;

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

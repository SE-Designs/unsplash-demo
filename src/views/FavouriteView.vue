<script setup lang="ts">
import { ref } from 'vue'
import DeleteIcon from '@/assets/icons/DeleteIcon.vue'
import EyeIcon from '@/assets/icons/EyeIcon.vue'
import { getFavorites, removeFavorite } from '@/utils/useStorage'

const favorites = ref(getFavorites())

function handleRemoveFavorite(id: string) {
  removeFavorite(id)
  favorites.value = getFavorites()
}
</script>

<template>
  <main>
    <h2>Избранное</h2>
    <div class="container">
      <div class="grid" v-if="favorites.length > 0">
        <RouterLink
          class="photo-link"
          v-for="item in favorites"
          :key="item.id"
          :to="{ name: 'Photo', params: { id: item.id } }"
        >
          <div class="remove" @click.prevent="handleRemoveFavorite(item.id)">
            <DeleteIcon />
          </div>
          <img :src="item.photo" width="300" height="300" />
        </RouterLink>
      </div>
      <div class="no-data">
        <div class="icon-wrapper">
          <EyeIcon />
        </div>
        <h3>Здесь еще ничего нет, добавьте свою первую фотографию :D</h3>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.remove {
  position: absolute;
  top: 12px;
  right: 12px;

  width: 40px;
  height: 40px;

  color: #0e4e9a;
  background-color: $white;
  border-radius: 6px;
  border: 1px solid $gray;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 15;
}
</style>

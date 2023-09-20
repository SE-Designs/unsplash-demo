<script setup lang="ts">
import SearchIcon from '@/assets/icons/SearchIcon.vue'

const search = ref('')
const emit = defineEmits(['search'])

function updateSearch() {
  emit('search', search.value)
}
</script>

<template>
  <section>
    <div class="searchbar-container">
      <input
        type="search"
        name="search"
        id="search"
        autofocus
        placeholder="Поиск..."
        v-model="search"
        @keydown.enter="updateSearch"
      />
      <div class="icon-wrapper" @click="updateSearch">
        <SearchIcon />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  width: 100%;
  min-height: 240px;
  padding-top: 40px;
  padding-bottom: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: center center / cover url('../assets/back.jpg') no-repeat;
}

.searchbar-container {
  position: relative;
  width: 80vw;
  max-width: 600px;
  min-width: 200px;
  background-color: $white;
}

input[type='search'] {
  width: 100%;
  border: 1px solid $white;
  padding: 12px 24px;
  font-size: 18px;

  &:focus {
    outline: none;
    appearance: none;
    border-color: $gray;
  }
}

.icon-wrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $black;
  position: absolute;
  right: 0;
  top: 0;

  height: 100%;
  min-width: 48px;
  padding-left: 24px;
  padding-right: 24px;
}
</style>

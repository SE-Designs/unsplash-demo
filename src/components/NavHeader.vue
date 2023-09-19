<script setup lang="ts">
import SearchIcon from '@/assets/icons/SearchIcon.vue'
import HeartIcon from '@/assets/icons/HeartIcon.vue'
</script>

<template>
  <header>
    <nav class="container">
      <RouterLink :to="{ name: 'Home' }" class="img-container">
        <img src="" alt="Logo" width="60" height="40" />
      </RouterLink>
      <div class="nav-container">
        <RouterLink class="nav-link" :to="{ name: 'Home' }">
          <div class="icon-wrapper">
            <SearchIcon />
          </div>
          <h6>Поиск</h6>
        </RouterLink>
        <RouterLink class="nav-link" :to="{ name: 'Favourite' }">
          <div class="icon-wrapper">
            <HeartIcon />
          </div>
          <h6>Избранное</h6>
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
a {
  color: $white;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100vw;
  background-color: $black;
}

nav {
  height: 100%;
  display: flex;
  // flex-direction: row;
  // flex-wrap: nowrap;

  align-items: center;
  justify-content: space-between;

  gap: 40px;
}

.img-container {
  //
}

.nav-container {
  display: flex;
  gap: 24px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
}

.icon-wrapper {
  width: 24;
  height: 24px;
}
</style>

<script setup lang="ts">
import HeartIcon from '@/assets/icons/HeartIcon.vue'
import DownloadIcon from '@/assets/icons/DownloadIcon.vue'
import { useFetch } from '@/utils/useFetch'

const url = window.location.href.split('/')
const id = url[url.length - 1]

const { data, loading, error } = useFetch(
  `${import.meta.env.VITE_API_PHOTO}${id}?client_id=${import.meta.env.VITE_API_KEY}`
)
</script>

<template>
  <main>
    <div class="loading" v-if="loading">
      <h2>Loading</h2>
    </div>
    <div class="error" v-else-if="error">
      <h2>Something went wrong</h2>
      <p>{{ error }}</p>
    </div>
    <div class="photo-container" v-else-if="data">
      <!-- {{ data }} -->
      <div class="background-wrapper">
        <img :src="data.urls.full" alt="" loading="lazy" />
      </div>
      <div class="main-wrapper container">
        <div class="details">
          <a :href="data.user.links.html" class="row">
            <img
              :src="data.user.profile_image.medium"
              :alt="data.user.username"
              width="60"
              height="60"
            />
            <div>
              <h3>{{ data.user.name }}</h3>
              <h4>@{{ data.user.username }}</h4>
            </div>
          </a>
          <div class="row">
            <Button class="white">
              <HeartIcon />
            </Button>
            <Button class="primary"><DownloadIcon /> Download</Button>
          </div>
        </div>
        <img class="main-image" :src="data.urls.regular" alt="" />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
img {
  display: block;
}

.photo-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.background-wrapper {
  position: absolute;
  left: 0;
  top: 0;

  & img {
    width: 100vw;

    filter: grayscale(100%) blur(2px);
  }
}

.main-wrapper {
  margin-top: 24px;
  z-index: 10;
}

.main-image {
  margin-top: 24px;
  display: block;
  width: 100%;
  max-width: 1200px;
  border-radius: 12px;
  border: 1px solid transparentize($gray, 0.8);
  box-shadow: 0 24px 24px 12px rgba(0, 0, 0, 0.4);
}

.details {
  display: flex;
  flex-flow: row wrap;

  align-items: center;
  justify-content: space-between;
  gap: 20px 40px;

  & img {
    border: 1px solid transparentize($gray, 0.4);
    border-radius: 4px;
  }
}

h3 {
  color: $white;
  font-weight: 700;
}

h4 {
  color: $white;
  font-weight: 400;
}

a {
  color: $white;
}

.row {
  display: flex;
  align-items: center;
  gap: 8px;
}

button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row nowrap;
  padding: 12px;
  height: 40px;
  border-radius: 12px;
  gap: 8px;
  opacity: 1;
  border: 1px solid;

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &.white {
    color: $black;
    border-color: $gray;
    background-color: $white;
  }

  &.primary {
    color: $black;
    border-color: $primary;
    background-color: $primary;
  }
}

@media only screen and (max-width: 1280px) {
  .main-image {
    box-shadow: 0 0 0;
  }

  h3 {
    color: $black;
  }

  h4 {
    color: darken($gray, 60);
  }

  .background-wrapper {
    display: none;
  }
}
</style>

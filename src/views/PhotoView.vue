<script setup lang="ts">
import HeartIcon from '@/assets/icons/HeartIcon.vue'
import DownloadIcon from '@/assets/icons/DownloadIcon.vue'
import { useFetch } from '@/utils/useFetch'

const url = window.location.href.split('/')
const id = url[url.length - 1]

const { data, loading, error } = useFetch(`${import.meta.env.VITE_API_PHOTO}&id=${id}`)
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
      <div class="background-wrapper">
        <img :src="data[0].urls.full" alt="" loading="lazy" />
      </div>
      <div class="main-wrapper container">
        <div class="details">
          <a :href="data[0].user.links.html" class="row">
            <img
              :src="data[0].user.profile_image.medium"
              :alt="data[0].user.username"
              width="60"
              height="60"
            />
            <div>
              <h3>{{ data[0].user.name }}</h3>
              <h4>@{{ data[0].user.username }}</h4>
            </div>
          </a>
          <div class="row">
            <Button class="white">
              <HeartIcon />
            </Button>
            <Button class="primary"><DownloadIcon /> Download</Button>
          </div>
        </div>
        <img class="main-image" :src="data[0].urls.regular" alt="" />
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
  box-shadow: 0 24px 24px 12px rgba(0, 0, 0, 0.4);
}

.details {
  display: flex;
  flex-flow: row wrap;

  align-items: center;
  justify-content: space-between;
  gap: 20px 40px;

  & img {
    border: 1px solid $white;
    border-radius: 4px;
  }
}

h3 {
  font-weight: 700;
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
  border: 0;
  opacity: 1;

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &.white {
    color: $black;
    background-color: $white;
  }

  &.primary {
    color: $black;
    background-color: $primary;
  }
}

@media only screen and (max-width: 1280px) {
  .background-wrapper {
    display: none;
  }
}
</style>

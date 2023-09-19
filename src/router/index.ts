import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavouriteView from '../views/FavouriteView.vue'
import PhotoView from '../views/PhotoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/favourite',
      name: 'Favourite',
      component: FavouriteView
    },
    {
      path: '/photo/:id',
      name: 'Photo',
      component: PhotoView
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

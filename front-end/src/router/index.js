import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PostView from '../views/PostView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/posts',
    name: 'post',
    component: PostView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

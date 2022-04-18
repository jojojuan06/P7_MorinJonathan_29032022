import { createRouter, createWebHistory } from 'vue-router'
import PostView from '../views/PostView.vue'
import ProfileView from '../views/ProfileView.vue'
import GetAllprofileView from '@/views/GetAllProfileView'
import HomeView from '../views/HomeView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/posts',
    name: 'posts',
    component: PostView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  },
  {
    path: '/profiles',
    name: 'Profiles',
    component: GetAllprofileView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

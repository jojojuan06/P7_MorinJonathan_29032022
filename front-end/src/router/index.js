//import vue
import { createRouter, createWebHistory } from 'vue-router'
import PostView from '@/views/PostView'
import ProfilView from '@/views/ProfilView'
import GetAllprofilsView from '@/views/GetAllProfilsView'
import HomeView from '@/views/HomeView.vue'
//import components
import EditPost from '@/components/EditPost'
import PageNotFound from '@/components/PageNotFound'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/posts',
    name: 'posts',
    component: PostView
  },
  {
    path: '/profil',
    name: 'Profil',
    component: ProfilView
  },
  {
    path: '/profils',
    name: 'Profils',
    component: GetAllprofilsView
  },
  {
    path: '/editpost',
    name: 'EditPost',
    component: EditPost
  },
  // si aucun page match , n'est trouve alors il retourne la route 404
  {
    path: '/:patchMatch(.*)*',
    name: 'NotFound',
    component: PageNotFound
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

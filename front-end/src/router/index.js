//import vue , history # ou non devant l'url
import { createRouter, createWebHistory } from 'vue-router'
import PostView from '@/views/PostView'
import ProfilView from '@/views/ProfilView'
import GetAllprofilsView from '@/views/GetAllProfilsView'
import HomeView from '@/views/HomeView.vue'
//import components
import EditPost from '@/components/EditPost'
import PageNotFound from '@/components/PageNotFound'
import Store from '@/store/index'

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

//Créez l'instance de routeur et passez l'option `routes`
const router = createRouter({
  history: createWebHistory(),
  routes
})

//function se lance au debut de chaque page
router.beforeEach((to ,from ,next) => {
//si la route et different du home et state.userId -1 et pas connecter on revoi la home
  if(to.path  != "/" && Store.state.user.userId == -1) {
        next({path:"/"})
  } else {
    next()
  }
})

export default router

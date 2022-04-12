<template>
  <!-- affiche les component -->
  <v-app app>
    <v-toolbar color="#3F3F3F" >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title >
        <router-link to="/" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-toolbar-item class="hidden-xs-only">
          <!-- boucle sur chaque menu et je les affiches   -->
          <v-btn flat v-for="item in menuItems" v-bind:key="item.title" :to="item.path">
            <v-icon left>{{ item.icons }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-toolbar-item>
    </v-toolbar>
    <v-content>
        <router-view/>
    </v-content>
    <v-footer>
      <v-row justify="center">
      <!-- boucle sur chaque link (ajouter dans le futur et je les affiches   -->  
      <v-btn  class="my-2">
        <v-icon>mdi-mail</v-icon>
        <a href="mailto:san@antonio.net">
          Nous Contacter
        </a>
      </v-btn>
      <v-col class="py-4 text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>Groupomania</strong>
      </v-col>
      </v-row>
  </v-footer>
  </v-app>
</template>

<script>
import Posts from './components/Posts.vue'
import NewPost from './components/NewPost.vue'


export default {
  name:'App',
  components: {
    Posts,
    NewPost,
  },
  data() {
    return {
      appTitle: 'Groupomania',
      menuItems: [
        {
          title:'Home',
          path:'/',
          icons:'mdi-home'
        },
        {
          title:'Sign Up',
          path:'/Signup',
          icons:'mdi-lock-open'
        },
        {
          title:'Login',
          path:'/login',
          icons:'mdi-account'
        },
        {
          title:'Post',
          path:'/posts',
          icons:'mdi-message'
        },
        {
          title:'Profile',
          path:'/Profile',
          icons:'mdi-account'
        },
      ],
    }
  }  
  ,
}
</script>


<style scoped>
.v-toolbar{
color: white;  
}
.v-toolbar a {
color: white;
text-decoration: none;
font-weight: bold;
}
/* importation du btn css  */
@import url('./style/button');
/* importation du footer css  */
@import url('./style/footer');
</style>

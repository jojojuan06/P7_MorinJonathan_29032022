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
      <v-row justify="center" no-gutters>
      <!-- boucle sur chaque link et je les affiches   -->  
      <v-btn v-for="link in links" :key="link" color="white" text rounded class="my-2">
        <v-icon>{{ link.icons }}</v-icon>
          {{ link.title }}
      </v-btn>
      <v-col class="py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Groupomania</strong>
      </v-col>
      </v-row>
  </v-footer>
  </v-app>
</template>

<script>
import Posts from './components/Posts.vue'
import NewPost from './components/NewPost.vue'
import Home from './components/Home.vue'


export default {
  name:'App',
  components: {
    Posts,
    NewPost,
    Home
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
          title:'Sign In',
          path:'/signin',
          icons:'mdi-account'
        },
        {
          title:'Post',
          path:'/posts',
          icons:'mdi-message'
        },
      ],
    links: [
        {
          title:'Nous Contacter',
          icons:'mdi-mail'
        },
        {
          title:'Home',
          icons:'mdi-home'
        },
      ]
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
.v-footer {
  background-color: #3f3f3f;
  color: white;
}
.v-btn{
  margin: 1rem;
}
</style>


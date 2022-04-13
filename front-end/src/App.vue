<template>
  <!-- affiche les component -->
  <v-app app>
    <v-toolbar>
      <v-toolbar-title >
        <router-link to="/" style="cursor: pointer">
          <v-img src="./images/logo.png"></v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-toolbar-item class="hidden-xs-only" v-for="item in itemMenus" v-bind:key="item.title">
          <!-- boucle sur chaque menu et je les affiches   prepend-icon (mettre l'icone d'ne element directement)-->
          <!--v-if="item.boolean == true" -->
          <v-btn v-bind:prepend-icon="item.icons" color="white" flat  :to="item.path" >
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
      connected:true,
      itemMenus: [
        {
          title:'Home',
          path:'/',
          icons:'mdi-home', 
        },
        {
          title:'Post',
          path:'/posts',
          icons:'mdi-message',
        },
        {
          title:'Profile',
          path:'/Profile',
          icons:'mdi-account',
        }, 
      ],
    }
  }  
  ,
}
</script>


<style scoped>
.v-img {
  width: 150px;
  color: white;
} 
.v-toolbar {
  background: #3f3f3f;
}
.v-toolbar a {
color:white;  
text-decoration: none;
font-weight: bold;
}
/* importation du btn css  */
@import url('./style/button');
/* importation du footer css  */
@import url('./style/footer');
</style>

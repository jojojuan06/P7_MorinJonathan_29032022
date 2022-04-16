<template>
  <!-- affiche les component -->
  <v-app app>
    <v-toolbar>
      <v-toolbar-title >
          <!-- - similaire à la balise  anchor -->
        <router-link to="/posts" style="cursor: pointer">
          <v-img src="./images/logo.png"></v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-toolbar-item  class="hidden-xs-only" v-for="item in itemMenus" v-bind:key="item.title">
          <!-- boucle sur chaque menu et je les affiches   prepend-icon (mettre l'icone d'ne element directement)-->
          <!--v-if="item.boolean == true" -->
          <v-btn  v-bind:prepend-icon="item.icons" color="white" flat  :to="item.path" >
          <!-- affichage du bouton selon le si l'utilisateur est connecter   -->
            {{ item.title }}
          </v-btn>
        </v-toolbar-item>
    </v-toolbar>
    <div>
     <!-- alerte a la creation du compte -->
        <v-alert v-if="this.$store.state.status =='succes'" class="v--alert"   type="success">
          {{ this.$store.state.message }}
          <!-- function au clic on remet a zero et on enleve l'alert -->
          <v-icon class="closeBtn" @click="() => { this.$store.state.status = '' ; this.$store.state.message = '';} ">mdi-close</v-icon>  
        </v-alert>
        <v-alert v-if="this.$store.state.status =='error'" type="error">
          {{this.$store.state.message}}
          <v-icon class="closeBtn" @click="() => { this.$store.state.status = '' ; this.$store.state.message = '';} ">mdi-close</v-icon>
        </v-alert>
    <!-- -->
    </div>
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
          hidden: false //par default visibility true
        },
        {
          title:'Post',
          path:'/posts',
          icons:'mdi-forum'
        },
        {
          title:'Profile',
          path:'/profile',
          icons:'mdi-face',
        },
        {
        title:'Profiles',
        path:'/profiles',
        icons:'mdi-account-group'
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
.closeBtn:hover {
  cursor: pointer;
}
.closeBtn {
  margin-left: 30px
}
/* importation du btn css  */
@import url('./style/button');
/* importation du footer css  */
@import url('./style/footer');
</style>

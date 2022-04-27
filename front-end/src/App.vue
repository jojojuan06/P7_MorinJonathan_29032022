<template>
  <!-- affiche les component -->
  <v-app app>
    <v-toolbar>
        <v-toolbar-title >
          <!-- - similaire à la balise  anchor -->
          <router-link to="/posts" style="cursor: pointer">
            <v-img src="./images/logo.png" alt="logo groupomania"></v-img>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- si userinfo et superieur a -1 il affiche tout les path / -->
        <!-- l'id de tes utilisateur est un entier positif donc si personne n'est connecté ce userInfos.id n'est pas un entier positif -->
        <div v-if="$store.state.user.userId > -1">
        <v-toolbar-item class="hidden-xs-only" v-for="item in itemMenus" v-bind:key="item.title">
          <!-- boucle sur chaque menu et je les affiches   prepend-icon (mettre l'icone d'ne element directement)-->
          <!-- v-if="item.boolean == true"-->
          <v-btn   v-bind:prepend-icon="item.icons" color="white" flat  :to="item.path" >
          <!-- affichage du bouton selon le si l'utilisateur est connecter   -->
            {{ item.title }}
          </v-btn>
        </v-toolbar-item>
        </div>
        <div v-else>
          <v-toolbar-item>
            <v-btn  v-bind:prepend-icon="defaultItem.icons" color="white" flat  :to="defaultItem.path" >   
            <!-- affichage du bouton selon le si l'utilisateur est connecter   -->
                  {{ defaultItem.title }}
            </v-btn>
          </v-toolbar-item>
        </div>
        </v-toolbar>
      <div>
    </div>
    <v-content class="content-img">
        <router-view/>
    </v-content>
    <!-- alerte a la creation du compte -->
    <div  class="alert-message--container" v-if="$store.state.status == 'error' || $store.state.status == 'succes'" >
        <v-alert v-if="this.$store.state.status =='succes'" class="alert--message"   type="success">
          {{ this.$store.state.message }}
          <!-- function au clic on remet a zero et on enleve l'alert -->
          <v-icon class="closeBtn" @click="() => { this.$store.state.status = '' ; this.$store.state.message = '';} ">mdi-close</v-icon>  
        </v-alert>
        <v-alert v-if="this.$store.state.status =='error'" type="error" class="alert--message">
          {{this.$store.state.message}}
          <v-icon class="closeBtn" @click="() => { this.$store.state.status = '' ; this.$store.state.message = '';} ">mdi-close</v-icon>
        </v-alert>
    </div>
    <!-- -->
    <v-footer>
      <v-row justify="center">
      <!-- boucle sur chaque link (ajouter dans le futur et je les affiches   -->  
      <div  class="footer--contact my-2">
        <v-icon>mdi-mail</v-icon>
        <a href="mailto:san@antonio.net">
          <h2 class="">Nous Contacter</h2> 
        </a>
      </div>
      <v-col class="py-4 text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>Groupomania</strong>
      </v-col>
      </v-row>
  </v-footer>
  </v-app>
</template>

<script>
// mélange les getters en calcul avec l'opérateur de propagation d'objet
import { mapState } from 'vuex'
//IMPORT COMPONENENTS
import Posts from './components/Posts.vue'
import NewPost from './components/NewPost.vue'


export default {
  name:'App',
  // INSTANCIER COMPONENTS
  components: {
    Posts,
    NewPost,
  },
  //verifie userid connecter exist, et le garde connecter
  mounted() {
    if(this.$store.state.user.userId){
      this.$store.commit('lOGUSER', this.$store.state.user)
    }
  },
  data() {
    return {
      //connected:true,
      //liste des differente route
      defaultItem:{
      title:'Home',
          path:'/',
          icons:'mdi-home',
      },
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
  },
  computed: {
        //importation de l'objet depuis state
        ...mapState(['status']) 
    },  
}
</script>


<style scoped>
.v-img {
  width: 150px;
  color: white;
} 
.v-toolbar {
  background: #091F43;
  border-bottom:2px solid #d1515a;
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
.content-img {
  background-color:#3f3f3f; 
}
/* importation du btn css  */
@import url('./style/button.css');
@import url('./style/alert.css');
/* importation du footer css  */
@import url('./style/footer.css');
</style>

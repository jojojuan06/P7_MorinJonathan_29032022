<template>
  <!-- affiche les component -->
  <v-app app>
    <v-toolbar   class="toolbar --container">
        <v-toolbar-title >
          <!-- - similaire à la balise  anchor -->
          <router-link to="/posts" style="cursor: pointer">
            <v-img class="toolbar--img logo" src="./images/logo.png" alt="logo groupomania"></v-img>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- si userinfo et superieur a -1 il affiche tout les path / -->
        <!-- l'id de tes utilisateur est un entier positif donc si personne n'est connecté ce userInfos.id n'est pas un entier positif -->
        <div v-if="$store.state.user.userId > -1">
        <!-- boucle sur chaque menu et je les affiches   prepend-icon (mettre l'icone d'ne element directement)-->
        <v-toolbar-item class=" --item-list hidden-xs-only" v-for="item in itemMenus" v-bind:key="item.title">
          <!-- je verifie si l'item contient un before enter , et before enter et bien une function (pour eviter les erreur)-->
          <v-btn class="--btn-item" @click="() => {item?.beforeEnter?.($store, $router)}" v-bind:prepend-icon="item.icons" color="white" flat :to="item.path" >
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
    <v-content>
    <!-- permet d'afficher les router dans les vues-->
        <router-view/>
    </v-content>
    <!-- alerte a la creation du compte -->
    <div  class="alert-message--container --alert" v-if="$store.state.status == 'error' || $store.state.status == 'success'" >
        <v-alert v-if="this.$store.state.status =='success'" class="alert--message"   type="success">
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
    <!--Ajout du componemt au template -->
    <Footer/>
  </v-app>
</template>

<script>
// mélange les getters en calcul avec l'opérateur de propagation d'objet
import { mapState } from 'vuex'
//IMPORT COMPONENENTS
import Posts from '@/components/Posts'
import NewPost from '@/components/NewPost'
import Footer from '@/components/Footer'


export default {
  name:'App',
  // INSTANCIER COMPONENTS
  components: {
    Posts,
    NewPost,
    Footer
  },
  //C'est ce qu'on appelle un hook de cycle de vie , 
  //il nous permet d'enregistrer un rappel à appeler
  // à certains moments du cycle de vie du composant.
  //verifie userid connecter exist, et le garde connecter
  mounted() {
    if(this.$store.state.user.userId){
      this.$store.commit('lOGUSER', this.$store.state.user)
    }
  },
  //variable que l'on souhaite retourner a la vue
  data() {
    return {
        //route par default de login /inscription
        defaultItem:{
        title:'Home',
            path:'/',
            icons:'mdi-home',
        },
        //route apres connection
      itemMenus: [
        {
          title:'Posts',
          path:'/posts',
          icons:'mdi-forum'
        },
        {
          title:'Mon profil',
          path:'/profil',
          icons:'mdi-face',
        },
        {
          title:'Profils',
          path:'/profils',
          icons:'mdi-account-group'
        },
        {
          path:'/disconnect',
          icons:'mdi-exit-run',
          // avant d'etre rediriger je fait mon action
          beforeEnter ($store, $router) {
            $store.commit('LOGOUT')
            if ($store.state.userInfos.id == -1) {
              $store.commit('SETSTATUS' , {status:'success',message:`Vous ete bien deconnecter`});
              return $router.push({path: '/'});
            }
            //reload si pas deconnecter
            location.reload();
          }
        }
      ],
    }
  },
  computed: {
        //importation de l'objet depuis state
        // map `this.status()` to `this.$store.commit('status')`
        ...mapState(['status']) 
    },  
}
</script>


<style scoped>
.toolbar--img.logo {
  width: 150px;
  height: 120px;
  color: white;
} 
.toolbar.--container {
  background: #091F43;
  border-bottom:2px solid #d1515a;
}
@media screen and (max-width: 400px) {
    .toolbar.--container   {
      padding-top:60px;
      height: 160px;
    }
}

.toolbar.--container a {
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
@import url('./style/button.css');
@import url('./style/alert.css');
/* importation du footer css  */
@import url('./style/footer.css');
</style>

<template>
    <v-container class="--container">
        <v-card-title class="--title">{{ msg }}</v-card-title>   
        <v-card class="card--form">
            <v-card-subtitle class="card --subtitle" v-if="mode=='create'">
                <h2>Bienvenue sur le site je vous invite a vous s'inscrire</h2> 
            </v-card-subtitle>
            <v-card-title>
                <!-- affichage vrai en mode login sinon inscription -->
                <h1 v-if="mode == 'login'">Connexion</h1>
                <h1 class="title--inscription" v-else>Inscription</h1>   
            </v-card-title>
            <v-card-text class="card--text" v-if="mode == 'login'">
                <strong>Tu as deja un compte ?</strong>
                <v-btn  class="btn--first" v-on:click="switchToCreateAccount">Crée un compte</v-btn>   <!--href="#" target="_blank" -->
            </v-card-text>
            <v-card-text class="card--text" v-else>
                <strong>Tu n'as pas encore de compte ?</strong> 
                <v-btn  class="btn--first" v-on:click="switchToLogin">Se connecter</v-btn>   
            </v-card-text>
            <!-- appelle du props -->
            <FormHome :mode="mode"/>
        </v-card>
    </v-container>
</template>
<script>

//import component
import  FormHome from '../components/FormHome.vue'


export default {
//instancie mon component 
    components:{
    FormHome,
},
    data() {
        return {
                mode: 'login',  //etat login
            }
        },    
    props: { //Props  est un attribut que vous pouvez définir au niveau du composant qui sera transmis directement au template
        msg: {
            type: String,
        default:'Bonjour Groupomania', // ou require true
        }
    },
    methods: { 
        //function pour different etat sur l'affichage des buttons
        switchToCreateAccount() {    // <------: function()
            this.mode = 'create';
        },
        switchToLogin() {                      
            this.mode = 'login';
        }, 
    },
}
</script>
<style scoped>
@import url('../style/home.css');
</style>

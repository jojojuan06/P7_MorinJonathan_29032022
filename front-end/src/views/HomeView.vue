<template>
    <v-container class="--container">
        <h1 class="--title">{{ msg }}</h1>   
        <v-card>
            <v-card-text class="--subtitle" v-if="mode=='create'">
                <strong>Bienvenue sur le site je vous invite a vous s'inscrire</strong> 
            </v-card-text>
            <v-card-title>
                <!-- affichage vrai en mode login sinon inscription -->
                <h1 v-if="mode == 'login'">Connexion</h1>
                <h1 v-else>Inscription</h1>   
            </v-card-title>
            <v-card-text v-if="mode == 'login'">
                Tu as deja un compte ?
                <v-btn  class="btn--first" v-on:click="switchToCreateAccount">Crée un compte</v-btn>   <!--href="#" target="_blank" -->
            </v-card-text>
            <v-card-text v-else>
                Tu n'as pas encore de compte ?
                <v-btn  class="btn--first" v-on:click="switchToLogin">Se connecter</v-btn>   
            </v-card-text>
            <FormHome/>
        </v-card>
    </v-container>
</template>
<script>

//import component
import  FormHome from '../components/FormHome.vue'


export default { 
    name:'Login',
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

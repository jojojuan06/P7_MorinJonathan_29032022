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
        <v-form>
            <v-text-field   v-model="form.email" type="text" label="E-mail" required></v-text-field>  
        </v-form>
        <!-- afffiche seulement a la creation du compte -->    
        <v-form  v-if="mode == 'create'">
            <v-text-field v-model="form.name" type="text" label="Name" required></v-text-field>
            <v-text-field  v-model="form.firstname" type="text" label="Firstname" required></v-text-field>
        </v-form>
        <v-form>   
            <v-text-field  v-model="form.password" type="password" label="Password" required></v-text-field>
        </v-form>
        <!-- afffiche seulement erreur a la connexion --> 
        <v-form class="--error_login" color="red" v-if="mode == 'login' && status == 'error_login'">
            Adresse mail et/ou mot de pâsse invalide ⚠
        </v-form>
        <!-- afffiche seulement erreur a la creation de compte --> 
        <v-form class="--error_create" color="red" v-if="mode == 'create' && status == 'error_create'">
            Adresse mail deja utilisé ⚠
        </v-form>
        <v-form>
            <!-- si champ vide on disable le bouton validatedFieldss--> 
            <!-- au clic appel a la methode login--> 
            <v-btn  v-on:click="loginAccount" :class="{'v-btn--disabled' : !validatedField} " v-if="mode == 'login'"  color="success" class="mr-4 --connexion">
                <!-- importation de la mutation selon le status if /else -->
                <span v-if="status=='loading'">Connexion en cours...</span> 
                <span v-else>Connexion</span> 
            </v-btn>
            <!-- au clic appel a la methode createNewAccount--> 
            <v-btn   v-on:click="createNewAccount" :class="{'v-btn--disabled' : !validatedField}"  v-else color="success" class="mr-4" >
                <span v-if="status=='loading'">Créer mon comptes...</span>
                <span v-else>Créer mon compte</span>
            </v-btn>
        </v-form>
    </v-card>
</v-container>
</template>

<script>

// mélange les getters en calcul avec l'opérateur de propagation d'objet
import { mapState } from 'vuex'

export default {
    name:'Login',
    data: function() {
        return {
                mode: 'login',  //etat login
                form : {
                    name: "",
                    firstname: "",
                    password: "",
                    email:""
                }
            }
        },
    //moment ou la vue et afficher    
    mounted() {
        //si l'utilisateur n'est pas null, donc connecter donc on retourne sur le profile
        console.log("mounted home-->", this.$store.state.user.userId);
        if(this.$store.state.user.userId) {
            this.$router.push({path: '/profile'}) 
            return;    
        } 
    },    
    props: { //Props  est un attribut que vous pouvez définir au niveau du composant qui sera transmis directement au template
        msg: {
            type: String,
        default:'Bonjour Groupomania', // ou require true
        }
    },
    computed: {
        validatedField: function() {
            //return false par default et true quand les  champ sont rempli
            let valid = false;
            if (this.mode == 'create') { //createAccount
                if (this.form.email != "" && this.form.firstname != "" && this.form.name != "" && this.form.password != "") {
                    valid = true;
                } 
            }  else {
                    if (this.form.email != "" &&  this.form.password !="") {
                        valid = true;
                    }
                }
            return valid;    
            },
            // mélange ceci dans l'objet extérieur avec l'opérateur de diffusion d'objet
            //mapStaterenvoie un objet , pour simplifier les variable sans le ,$store.state
            ...mapState(['status']) 
        },
    methods: { 
        //function pour different etat sur l'affichage des buttons
        switchToCreateAccount() {              // <------: function()
            this.mode = 'create';
        },
        switchToLogin() {                      // <------: function()
            this.mode = 'login';
        },
        loginAccount(){
            //un terme spécial pour invoquer les mutations depuis le store - actions (dispatch) asynchrone  
            //précédées du signe dollar afin de garantir que ces méthodes sont bien utilisées comme prévu
            const This = this; //sous element pas acces au this je renome une variabale pour appeler en dessous
            this.$store.dispatch('loginAccount',{
                email:this.form.email,
                password:this.form.password,
            }).then(function (){
                //accès à l'instance du routeur en tant que $router
                This.$router.push({path: '/profile'}); //redirection vers la route apres login
            }),
            function (error) {
                console.log(error);
            }
        },                                      
        createNewAccount(){   // <------: function() 
            const This = this; //sous element pas acces au this je renome une variabale pour appeler en dessous  
            //un terme spécial pour invoquer les mutations depuis le store - actions (dispatch) asynchrone  
            //précédées du signe dollar afin de garantir que ces méthodes sont bien utilisées comme prévu
            this.$store.dispatch('createNewAccount',{
                email:this.form.email,
                name:this.form.name,
                firstname:this.form.firstname,
                password:this.form.password
            }).then(function (){
                //redirection vers la route apres creation d'un compte (path en argument)
                This.$router.push({path: '/posts'}); 
            }),
            function (error) {
                console.log(error);
            }
        } 
    },
}
</script>
<style scoped>
.v-card-text.--subtitle {
    color: rgba(9,31,67,0.8);
    text-decoration: underline;
    cursor: pointer;
}
.v-container{
    display: flex;
    flex-direction: column;
}
h1.--title {
    margin: 40px 0 0;
    color: #D1515A;
}
.v-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url('../images/Home.png');
    background-position: center;
    background-repeat: no-repeat;
}
@import url('../style/home');
</style>

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
            <!-- permet de valider facilement les entrées de formulaire. -->
            <v-form ref="form" class="mx-2" lazy-validation>
                <v-text-field   :rules="emailRules" v-model="form.email" type="email" label="E-mail" required></v-text-field>  
                <!-- afffiche seulement a la creation du compte -->    
                <div v-if="mode == 'create'">
                    <v-text-field :rules="nameRules" v-model="form.name" type="text" label="Name" required></v-text-field>
                    <v-text-field  :rules="nameRules" v-model="form.firstname" type="text" label="Firstname" required></v-text-field>
                </div>
                <div>   
                    <v-text-field  :rules="passwordRules" v-model="form.password" type="password" label="Password" required></v-text-field>
                </div>
                <!-- afffiche seulement erreur a la connexion --> 
                <div  class="--error_login" color="red" v-if="mode == 'login' && status == 'error'">
                    Adresse mail et/ou mot de pâsse invalide ⚠
                </div>
                <!-- afffiche seulement erreur a la creation de compte --> 
                <div class="--error_create" color="red" v-if="mode == 'create' && status == 'error'">
                    Adresse mail deja utilisé ⚠
                </div>
                <!-- si champ vide on disable le bouton validatedFieldss--> 
                <!-- au clic appel a la methode login--> 
                <v-btn  type="submit"  v-on:click="loginAccount" :class="{'v-btn--disabled' : !validatedField} " v-if="mode == 'login'"  color="success" class="mr-4 --connexion">
                    <!-- importation de la mutation selon le status if /else -->
                    <span v-if="status=='loading'">Connexion en cours...</span> 
                    <span v-else>Connexion</span> 
                </v-btn>
                <!-- au clic appel a la methode createNewAccount--> 
                <v-btn   type="submit" v-on:click="createNewAccount" :class="{'v-btn--disabled' : !validatedField}"  v-else color="success" class="mr-4" >
                    <span v-if="status=='loading'">Création du comptes...</span>
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
    data() {
        return {
                nameRules: [ //v=>value
                v => !!v || 'Le Nom est requis',
                v => (v && v.length <= 10) || 'le nom ne doit pas dépasser 10 caractères',
                v => v.length >= 3 || 'Minimum 3 caractères',
                ],
                emailRules: [
                v => !!v || 'Un E-mail est requis',
                v => /.+@.+\..+/.test(v) || `E-mail n'est pas valid`,
                ],
                passwordRules: [
                v => !!v || 'Le password est requis',
                v => (v && v.length <= 14) || 'le password ne doit pas dépasser 14 caractères',
                v => v.length >= 3 || 'Minimum 3 caractères',
                v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Le mot de passe doit contenir au moins une lettre minuscule, un chiffre, un caractère spécial et une lettre majuscule'
                ],
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
        if(this.$store.state.user.userId) {
            this.$router.push({path: '/posts'}) 
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
            //importation de l'objet depuis state
            ...mapState(['status']) 
        },
    methods: { 
        //function pour different etat sur l'affichage des buttons
        switchToCreateAccount() {    // <------: function()
            this.mode = 'create';
        },
        switchToLogin() {                      
            this.mode = 'login';
        },
        loginAccount(){
            //un terme spécial pour invoquer les mutations depuis le store - actions (dispatch) asynchrone  
            //précédées du signe dollar afin de garantir que ces méthodes sont bien utilisées comme prévu
            //sous element pas acces au this je renome une variabale pour appeler en dessous
            const This = this; 
             //ref fait reference au ref de l'element du dom pour lier
            //validate verifie les rules avnt validation du formulaire
            //this.$refs.form.validate
                this.$store.dispatch('loginAccount',{
                    email:this.form.email,
                    password:this.form.password,
                }).then(function (){
                    //accès à l'instance du routeur en tant que $router
                    //redirection vers la route apres login
                    This.$router.push({path: '/profile'}); 
                }).catch(error => (console.log(error))) 
        },                                      
        createNewAccount(){ 
            //sous element pas acces au this je renome une variabale pour appeler en dessous
            const This = this; 
            //ref fait reference au ref de l'element du dom pour lier
            //validate verifie les rules avnt validation du formulaire
            //this.$ref.form.validate()) 
                //dispatch asyncrone appelle les action
                this.$store.dispatch('createNewAccount',{
                email:this.form.email,
                name:this.form.name,
                firstname:this.form.firstname,
                password:this.form.password
                }).then(function (){
                //redirection vers la route apres creation d'un compte (path en argument)
                This.$router.push({path: '/posts'}); 
            }).catch(error => (console.log(error)))
        } 
    },
}
</script>
<style scoped>
@import url('../style/home.css');
</style>

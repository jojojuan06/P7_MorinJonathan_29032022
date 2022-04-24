<template>
<!-- permet de valider facilement les entrées de formulaire. -->
    <v-form>
            <v-text-field    v-model="form.email" type="email" label="E-mail" required></v-text-field>  
            <!-- afffiche seulement a la creation du compte -->    
            <div v-if="mode == 'create'">
                <v-text-field  v-model="form.name" type="text" label="Name" required></v-text-field>
                <v-text-field  v-model="form.firstname" type="text" label="Firstname" required></v-text-field>
            </div>
            <div>   
                <v-text-field  v-model="form.password" type="password" label="Password" required></v-text-field>
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
</template>

<script>
// mélange les getters en calcul avec l'opérateur de propagation d'objet
import { mapState } from 'vuex'

export default {
    name:'FormeHome',
    //definition du props
    props: { 
        mode: String,
    },
    data() {
        return {
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
        loginAccount(){
            //sous element pas acces au this je renome une variabale pour appeler en dessous
            const This = this;  
            //un terme spécial pour invoquer les mutations depuis le store - actions (dispatch) asynchrone  
            //précédées du signe dollar afin de garantir que ces méthodes sont bien utilisées comme prévu
            this.$store.dispatch('loginAccount',{
                    email:this.form.email,
                    password:this.form.password
                }).then(function (){
                    //accès à l'instance du routeur en tant que $router
                    //redirection vers la route apres login
                    This.$router.push({path: '/posts'}); 
            }).catch(error => (console.log(error))) 
        },                                                       
        createNewAccount(){ 
            //sous element pas acces au this je renome une variabale pour appeler en dessous
            const This = this; 
            //contenue du formulaire
            const body = {
                email:this.form.email,
                name:this.form.name,
                firstname:this.form.firstname,
                password:this.form.password
            }; 
            this.$store.dispatch('createNewAccount', body).then(() => {
            this.loginAccount();
            //redirection vers la route apres creation d'un compte (path en argument)
            This.$router.push({path: '/'})
            }).catch(error => {console.log(error)}); 
        }
    },
}
</script>

<style scoped>
@import url('../style/form.css');
</style>


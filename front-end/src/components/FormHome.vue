<template>
<!-- permet de valider facilement les entrées de formulaire. -->
    <v-form ref="form" class="mx-2" lazy-validation v-model="valid">
        <!-- afffiche seulement a la creation du compte --> 
            <v-text-field    @keyup="validateForm" :rules="emailRules" v-model="form.email" type="email" label="E-mail" required></v-text-field>  
            <div v-if=" mode == 'create'">
                <v-text-field @keyup="validateForm" :counter="10" :rules="nameRules" v-model="form.name" type="text" label="Name" required></v-text-field>
                <v-text-field @keyup="validateForm" :counter="10" :rules="nameRules" v-model="form.firstname" type="text" label="Firstname" required></v-text-field>  
            </div>
            <!-- keyup (presse une touche) verifie la function ,  a chaque changement de champ il appele la function -->
            <v-text-field  @keyup="validateForm" :rules="passwordRules" v-model="form.password" type="password" label="Password" required></v-text-field>
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
        <v-btn  type="submit"  v-on:click="loginAccount" :disabled="!valid" v-if="mode == 'login'"  color="success" class="mr-4 --connexion">
            <!-- importation de la mutation selon le status if /else -->
            <span v-if="status=='loading'">Connexion en cours...</span> 
            <span v-else>Connexion</span> 
        </v-btn>
        <!-- au clic appel a la methode createNewAccount--> 
        <v-btn   type="submit" v-on:click="createNewAccount" :disabled="!valid"  v-else color="success" class="mr-4" >
            <span v-if="status=='loading'">Création du comptes...</span>
            <span v-else>Créer mon compte</span>
        </v-btn>
    </v-form>
</template>

<script>
// mélange les getters en calcul avec l'opérateur de propagation d'objet
import { mapState } from 'vuex'

export default {
    //Passer des données aux composants enfants avec les props (proprieté)
    name:'FormeHome',
    props: { 
        mode: String,
    },
    data() {
        return {
                valid:true,
                nameRules: [ //v=>value
                v => v != '' || 'Le Nom est requis',
                v => (v && v.length <= 10) || 'le nom ne doit pas dépasser 10 caractères',
                v => v.length >= 3 || 'Minimum 3 caractères',
                ],
                emailRules: [
                v => v != '' || 'Un E-mail est requis',
                v => /.+@.+\..+/.test(v) || `E-mail n'est pas valid`,
                v => (v && v.length <= 25) || "l'email ne doit pas dépasser 25 caractères",
                ],
                passwordRules: [
                v => v != '' || 'Le password est requis',
                v => (v && v.length <= 14) || 'le password ne doit pas dépasser 14 caractères',
                v => v.length >= 3 || 'Minimum 3 caractères',
                v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Le mot de passe doit contenir au moins une lettre minuscule,une majuscule un chiffre, un caractère spécial'
                ],
                form : {
                    name: "",
                    firstname: "",
                    password: "",
                    email:""
                }
            }
        },
    // calcul de function
    computed: {
        //importation de l'objet depuis state
        ...mapState(['status']), 
    },
    methods: {
            validateForm(){
                //ref fait reference au ref de l'element du dom pour lier
                //validate verifie les rules avant validation du formulaire res =>resultat
                this.$refs.form.validate().then((res) => {
                    this.valid = res.valid;        
                }).catch(error => (console.log(error)));
            },
            loginAccount(){
            //sous element pas acces au this je renome une variabale pour appeler en dessous
            const This = this; 
                if(this.valid) {  
                    //un terme spécial pour invoquer les mutations depuis le store - actions (dispatch) asynchrone  
                    //précédées du signe dollar afin de garantir que ces méthodes sont bien utilisées comme prévu
                    this.$store.dispatch('loginAccount',{
                            email:this.form.email,
                            password:this.form.password
                        }).then(function (){
                            //accès à l'instance du routeur en tant que $router
                            //redirection vers la route apres login
                            This.$router.push({path: '/profil'}); 
                        }).catch(error => (console.log(error))) 
                }
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
            if(this.valid) {
                    //dispatch asyncrone appelle les action
                    this.$store.dispatch('createNewAccount', body).then(() => {
                        this.loginAccount();
                        //redirection vers la route apres creation d'un compte (path en argument)
                        This.$router.push({path: '/profil'})
                    }).catch(error => {console.log(error)}); 
            } 
        } 
    },
}
</script>

<style scoped>
@import url('../style/form.css');
</style>


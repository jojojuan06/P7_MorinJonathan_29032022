<template>
<v-container>
    <v-card>
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
            <v-text-field   v-bind:rules="emailRule" v-model="form.email" type="text" label="E-mail" required></v-text-field>  
        </v-form>
        <!-- afffiche seulement a la creation du compte -->    
        <v-form  v-if="mode == 'create'">
            <v-text-field v-bind:rules="nameRule"  v-model="form.name" type="text" label="Name" required></v-text-field>
            <v-text-field v-bind:rules="firstnameRule" v-model="form.firstname" type="text" label="Firstname" required></v-text-field>
        </v-form>
        <v-form>   
            <v-text-field v-bind:rules="passwordRule" v-model="form.password" type="password" label="Password" required></v-text-field>
        </v-form>
        <v-form>
            <!-- si champ vide on disable le bouton validatedFieldss--> 
            <v-btn  class="v-btn--disabled mr-4" v-if="mode == 'login'"  color="success">
                Connexion
            </v-btn>
            <!-- au clic appel a la methode createAccount--> 
            <v-btn   v-on:click="createNewAccount" :class="{'v-btn--disabled' : !validatedField}"  v-else color="success" class="mr-4" >
                Créer mon compte
            </v-btn>
        </v-form>
    </v-card>
</v-container>
</template>

<script>
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
            } 
        },
    methods: { //function pour different etat
        switchToCreateAccount() {              // <------: function()
            this.mode = 'create';
        },
        switchToLogin() {                      // <------: function()
            this.mode = 'login';
        },
        createNewAccount(){
            console.log(this.email, this.name, this.firstname, this.password); 
        } 
    },
}
</script>

<style scoped>
@import url('../style/login');
</style>

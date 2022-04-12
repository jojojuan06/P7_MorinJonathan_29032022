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
                <v-btn  v-on:click="switchToCreateAccount()">Crée un compte</v-btn>   <!--href="#" target="_blank" -->
        </v-card-text>
        <v-card-text v-else>
                Tu n'as pas encore de compte ?
                <v-btn  v-on:click="switchToCreateLogin()">Se connecter</v-btn>   
        </v-card-text>
        <v-form>
            <v-text-field   v-model="form.email" type="text" label="E-mail" required></v-text-field>  
        </v-form>
        <!-- afffiche seulement a la creation du compte -->    
        <v-form  v-if="mode == 'createAccount'">
            <v-text-field  v-model="form.name" type="text" label="Name" required></v-text-field>
            <v-text-field v-model="form.firstname" type="text" label="Firstname" required></v-text-field>
        </v-form>
        <v-form>   
            <v-text-field  v-model="form.password" type="password" label="Password" required></v-text-field>
        </v-form>
        <v-form>
            <!-- si champ vide on disable le bouton validatedFieldss--> 
            <v-btn disabled  @click="login" :class="{'v-btn--disabled' : !validatedField}" v-if="mode == 'login'"  color="success" class="mr-4">
                Connexion
            </v-btn>
            <v-btn :class="{'v-btn--disabled' : !validatedField}"  v-else color="success" class="mr-4" >
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
            if (this.mode == 'createAccount') {
                if (this.email != "" && this.firstname != "" && this.name != "" && this.password != "") {
                    return true;
                } else {
                    return false;
                } 
            }   else {
                    if (this.email != "" &&  this.password !="") {
                        return true;
                    }
                }
            } 
        },
    methods: { //function pour different etat
        switchToCreateAccount: function() {
            this.mode = 'createAccount';
        },
        switchToCreateLogin: function() {
            this.mode = 'login';
        },
        login() {
            console.log(validatedField);
        }
    },
}
</script>

<style scoped>
@import url('../style/login');
</style>

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
        <v-form ref="form">
            <v-text-field   label="E-mail" required></v-text-field>  
        </v-form>
        <!-- afffiche seulement a la creation du compte -->    
        <v-form v-if="mode == 'createAccount'" ref="form">
            <v-text-field type="text" label="Name" required></v-text-field>
            <v-text-field type="text" label="Firstname" required></v-text-field>
        </v-form>
        <v-form ref="form" >   
            <v-text-field   type="password" label="Password" required></v-text-field>
        </v-form>
        <v-form ref="form" v-model="valid">
            <v-btn v-if="mode == login"  color="success" class="mr-4">
                Connexion
            </v-btn>
            <v-btn v-else color="success" class="mr-4" >
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
            }
        },
    methods: { //function pour different etat
        switchToCreateAccount: function() {
            this.mode = 'createAccount';
        },
        switchToCreateLogin: function() {
            this.mode = 'login';
        }
    },
}
</script>

<style scoped>
.v-card {
    margin: 32px;
    padding: 16px;
}
.v-card .v-btn:first-child {
    text-decoration: underline;
    color:#091F43;
    box-shadow: none;   
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
</style>

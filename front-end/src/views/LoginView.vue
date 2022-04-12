<template>
<v-container>
    <v-card>
        <v-card-title>
                <h1>Connexion</h1>   
            </v-card-title>
            <v-card-text>
                Tu n'as pas encore de compte ?
                <v-btn href="#" target="_blank">Crée un compte</v-btn> 
        </v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-text-field v-model="password" :rules="passwordRules" label="Password" required></v-text-field>
            <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                Connexion
            </v-btn>
        </v-form>
    </v-card>
</v-container>
</template>

<script>
export default {
    name:'Login'
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



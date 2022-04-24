<template>
<!-- permet de valider facilement les entrées de formulaire. -->
<v-form ref="form" class="mx-2" lazy-validation v-model="valid">
                <v-text-field   :rules="emailRules" v-model="form.email" type="email" label="E-mail" required></v-text-field>  
                <!-- afffiche seulement a la creation du compte -->    
                <div v-if="mode == 'create'">
                    <v-text-field :counter="10" :rules="nameRules" v-model="form.name" type="text" label="Name" required></v-text-field>
                    <v-text-field  :counter="10" :rules="nameRules" v-model="form.firstname" type="text" label="Firstname" required></v-text-field>
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
                <v-btn  type="submit"  v-on:click="loginAccount" :class="{'v-btn--disabled' : !valid} " v-if="mode == 'login'"  color="success" class="mr-4 --connexion">
                    <!-- importation de la mutation selon le status if /else -->
                    <span v-if="status=='loading'">Connexion en cours...</span> 
                    <span v-else>Connexion</span> 
                </v-btn>
                <!-- au clic appel a la methode createNewAccount--> 
                <v-btn   type="submit" v-on:click="createNewAccount" :class="{'v-btn--disabled' : !valid}"  v-else color="success" class="mr-4" >
                    <span v-if="status=='loading'">Création du comptes...</span>
                    <span v-else>Créer mon compte</span>
                </v-btn>
            </v-form>
</template>

<script>
export default {
    name:'FormeHome',
}
</script>

<style scoped>
@import url('../style/home.css');
</style>


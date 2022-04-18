<!-- composant permettent d'encapsuler un ensemble d'éléments HTML, de façon réutilisable et facilement maintenable. -->
<template>
    <v-card>
        <v-card-title class="post--title">Crée un nouveau post</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name"  label="Nom du post" required></v-text-field>
            <v-file-input show-size counter multiple label="Fichier image" density="compact"></v-file-input>
            <v-textarea filled auto-grow label="Tapez votre message ici" rows="4" row-height="30" shaped></v-textarea>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
            Envoyer
            </v-btn>
    </v-form>
    </v-card>
</template>

<script>
</script>

<style scoped>
.v-card-title.post--title {
    background-color: #091f43;
    color: white;
    width: 100%;
    border-radius: 16px 16px 0px 0px;
    border-bottom: #d1515a solid 2px;
}
</style>





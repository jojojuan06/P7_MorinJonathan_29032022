<!-- composant permettent d'encapsuler un ensemble d'éléments HTML, de façon réutilisable et facilement maintenable. -->
<template>
    <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name"  label="Nom du post" required></v-text-field>
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



</style>





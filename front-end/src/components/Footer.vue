<template>
    <v-footer class="--footer">
        <v-row justify="center">
        <!-- boucle sur chaque link (ajouter dans le futur et je les affiches   -->  
        <div  class="footer--contact my-2">
            <v-icon>mdi-mail</v-icon>
            <a href="mailto:san@antonio.net">
            <h2 class="">Nous Contacter</h2> 
            </a>
        </div>
        <v-col class="py-4 text-center" cols="12">
            {{ new Date().getFullYear() }} — <strong>Groupomania</strong>
        </v-col>
        </v-row>
    </v-footer>
</template>

<script>
export default {
name:'FooterComponent',

}
</script>
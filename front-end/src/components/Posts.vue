<!-- composant permettent d'encapsuler un ensemble d'éléments HTML, de façon réutilisable et facilement maintenable. -->
<template>
    <v-card max-width="800" class="mx-auto">
        <v-toolbar color="primary">
            <v-toolbar-title>Post</v-toolbar-title>
        </v-toolbar>
        <v-list>
        <!-- boucle for pour afficher la liste des posts , boucle sur chacun d'eux puis les afficher -->
        <v-list-item v-for="(post,index) in this.$store.state.posts" v-bind:key="index">  <!-- import de post depuis $store.state -->
                <v-list-item-title v-text="post.title"></v-list-item-title>
                <p>{{post.content}}</p>
                <v-img v-bind:src="post.image" alt="mon image"></v-img>
                <v-list-item-content>
            </v-list-item-content>
        </v-list-item>
        </v-list>
    </v-card>   
</template>

<script>
// axios module pour Faire des requêtes http à partir de node.js
import axios from '../axios';

export default {
// qui représente le moment durant lequel le composant va être rendu sur notre page.
// mettre a jour les posts dans le state
    mounted() {
    this.$store.dispatch('getPosts') //dispatch apliquer l'action
    },
};
</script>

<template>
    <v-card max-width="800" class="mx-auto">
        <v-toolbar color="primary">
            <v-toolbar-title>Post</v-toolbar-title>
        </v-toolbar>
        <v-list>
        <!-- boucle for pour afficher la liste des posts , boucle sur chacun d'eux puis les afficher -->
        <v-list-item v-for="(post,index) in posts" v-bind:key="index">
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
// retourne le data task
    data(){
        return {
            posts:{} ,//objet vide
        };
    },
    
    
    // created (hook) est appelé une fois l'instance crée
    // qui représente la durée pendant laquelle le composant est en construction.
    created() {
        axios.get('/post')
        // attendre la reponse (comme fetch)
        .then(res => {
            this.posts = res.data
            console.log(this.posts);
        }) //retourne la repose des data dans l'objet vi
        .catch(error => console.log(error));    
    },
};
</script>

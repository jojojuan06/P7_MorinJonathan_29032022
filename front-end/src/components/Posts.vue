<template>
<div>
    <h2 class="display-2" >Posts</h2>
    <v-list>
<!-- boucle for pour afficher la liste des posts , boucle sur chacun d'eux puis les afficher -->
        <v-list-item v-for="post in posts" :key="post.id">
               {{posts.name}}
            <v-list-item-content>
                <v-list-item-title v-text="post"> </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</div>   
</template>

<script>
// axios module pour Faire des requêtes http à partir de node.js
import axios from 'axios';

export default {
// retourne le data task
    data(){
        return {
            posts: {} //objet vide
        };
    },
    
    
    // created (hook) est appelé une fois l'instance crée
    // représente la durée pendant laquelle le composant est en construction.
            created() {
        this.post = axios.get('http://localhost:3000/api/post',{
            headers: { "Content-Type": "application/json" , 
                "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImFkbWluIjp0cnVlLCJpYXQiOjE2NDk1OTg2MjgsImV4cCI6MTY0OTY4NTAyOH0.nIhYlqqSAP2LrEny3vEZBwWKVbJLXfuoOpTWGL2TgOQ"}
            })
        // attendre la reponse (comme fetch)
        .then(res => this.posts = res.data) 
        .catch(error => console.log(error));    
    },
};
</script>

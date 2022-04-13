<template>
<v-card max-width="800" class="mx-auto">
        <v-toolbar color="primary">
            <v-toolbar-title>Nouveau Post</v-toolbar-title>
        </v-toolbar>
        <v-form>
            <v-container>
                <v-row>
                    <v-col md="6" offset-md="3">
                        <!-- v-model. Cela vous permet de définir 
                        la propriété  data  que vous souhaitez mettre à jour 
                        lorsque l'utilisateur interagit avec un formulaire. -->
                        <v-text-field v-model="msgBody" label="Post" required></v-text-field>
                        <v-btn class="mr-4" @click="submit" color="success">
                        submit
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
// axios module pour Faire des requêtes http à partir de node.js
//import axios from '../axios';

// export default {
// // retourne le data task
//     data(){
//         return {
//             msgBody: ""
//         };
//     },
    
    
//     // created (hook) est appelé une fois l'instance crée
//     //  représente la durée pendant laquelle le composant est en construction
//         created() {
//         axios.post('/post')
//         // attendre la reponse (comme fetch)
//         .then(res => {
//             this.posts = res.data
//             }) //retourne la repose des data dans l'objet vi
//         .catch(error => console.log(error));    
//     },
//     methods: {
//         submit : function() {
//         console.log(this.msgBody);
//         }
//     }
// };
</script>





<!-- composant permettent d'encapsuler un ensemble d'éléments HTML, de façon réutilisable et facilement maintenable. -->
<template>
        <div class="create_comment">
            <v-form class="comment--container">
                <v-textarea  v-model="form.content" prepend-inner-icon="mdi-comment" class="comment--textarea" label="Tapez votre commentaire ici"  rows="1" required>
                </v-textarea>
                <div class="btn--createcomment">
                    <!-- revenir a l'ajout du message par default -->
                    <v-btn class="btn--icon--back" @click="CancelAddComment">
                        <v-icon class="--icon-back">mdi-minus</v-icon>
                    </v-btn>
                    <!-- au clic appel a la methode addComment-->
                    <v-btn  class="btn--check mr-4" v-on:click="addComment(postId)" :class="{'v-btn--disabled' : !validatedField}">
                        <v-icon class="--icon--check">mdi-check</v-icon> 
                    </v-btn>
                </div>
            </v-form>
        </div>
</template>
<script>

// IMPORT mélange les getters en calcul avec l'opérateur de propagation d'objet
import { mapState } from 'vuex'

export default {
    name:'NewComment',
    data: function() {
        return {
                form : {
                    content: "",
                }
            }
        },
    //props qui vas resevoir un postId depuis le parent
    props: [
        "postId"
    ],    
    computed: {
        validatedField: function() {
            //return false par default et true quand les  champ sont rempli
            let valid = false;
            //reste griser si le commentaire n'est pas vide et superieur a 2 caractere
                if (this.form.content != "" && this.form.content.length > 2) {
                    valid = true;
                } 
            //}  
            return valid;    
            },
            //importation de l'objet depuis state
            ...mapState(['status']) 
        },
    methods: { 
        //function pour different etat sur l'affichage des buttons
        //emettre au parent
        CancelAddComment() { 
            //emmettre au parent             
            this.$emit('CancelAddComment');
        },                                     
        addComment(postId){  
            //un terme spécial pour invoquer les mutations depuis le store - actions (dispatch) asynchrone  
            //précédées du signe dollar afin de garantir que ces méthodes sont bien utilisées comme prévu
            this.$store.dispatch('createComment',{content:this.form.content,postId});
        },
    },
}
</script>

<style scoped>
.create_comment{
    display: flex;
    justify-content: center;
    width: 100%;
}
.comment--container  {
    display: flex;
    width: 100%;
    max-width: 1000px;
    border-radius:0;
    padding: 0px;
}

.btn--createcomment {
    display: flex;
    align-items: center;
}
.btn--createcomment .v-btn {
    margin-right: 8px;
}
.btn--createcomment .v-btn:first-child:hover {
    background-color: #091f43;
    color: white;
    border-bottom: #d1515a 2px solid;
}
.btn--icon--back {
    background-color: #091f43;
    min-width: 0px;
    padding: 0 4px;
}
.--icon-back {
    color: white;
    font-size: 30px;
}
.btn--check {
    min-width: 0px;
    background-color: green;
    padding: 0 4px;
}
.--icon--check {
    color: white;
    font-size: 30px;
}
.comment--textarea {
    margin-bottom: -25px;
}
.v-btn--disabled {
    background-color: #d6d6d6;
}
</style>





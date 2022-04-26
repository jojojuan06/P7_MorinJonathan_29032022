<!-- composant permettent d'encapsuler un ensemble d'éléments HTML, de façon réutilisable et facilement maintenable. -->
<template>
        <div class="create_comment">
            <v-form class="comment--container">
                <v-textarea  v-model="form.content" prepend-inner-icon="mdi-comment" class="comment--textarea mx-2" label="Tapez votre commentaire ici" rows="1" required>
                </v-textarea>
                <div class="btn--createcomment">
                    <!-- revenir a l'ajout du message par default -->
                    <v-btn class="btn--icon--back" @click="CancelAddComment">
                        <v-icon class="--icon-back">mdi-minus</v-icon>
                    </v-btn>
                    <!-- au clic appel a la methode addComment-->
                    <v-btn  class="btn--check mr-4" v-on:click="addComment" :class="{'v-btn--disabled' : !validatedField}">
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
    //moment ou la vue et afficher    
    mounted() {
        //si l'utilisateur n'est pas  connecter , on retourne sur le home
        if(!this.$store.state.user.userId) {
            this.$router.push({path: '/'}) 
            return;    
        } 
    },
    computed: {
        validatedField: function() {
            //return false par default et true quand les  champ sont rempli
            let valid = false;
                if (this.form.content != "") {
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
        addComment(){  
            const This = this; 
            //sous element pas acces au this je renome une variabale pour appeler en dessous  
            //un terme spécial pour invoquer les mutations depuis le store - actions (dispatch) asynchrone  
            //précédées du signe dollar afin de garantir que ces méthodes sont bien utilisées comme prévu
            this.$store.dispatch('createComment',{ content:this.form.content})
            .then(() => {
                //redirection vers la route apres creation d'un compte (path en argument)
                this.refreshPost()
                this.$store.commit('SETSTATUS' , {status:'succes',message:`votre commentaire est bien ajouté`});
            }),
            function (error) {
                console.log(error);
            }
        },
        //rafraichir la liste des posts apres ajout d'un nouveau
        refreshPost(){
            //dispatch apliquer l'action (recuperer a nouveau les post)
            this.$store.dispatch('getPosts')
            
        } 
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
    box-shadow: 2px 2px 15px black;
    border-radius:0;
    padding: 2px;
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
    margin-bottom: -40px;
}
</style>





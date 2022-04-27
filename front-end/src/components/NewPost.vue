<!-- composant permettent d'encapsuler un ensemble d'éléments HTML, de façon réutilisable et facilement maintenable. -->
<template>
    <v-container class="create_post" fluid>
                <v-btn v-if="mode == 'bydefault'" v-on:click="switchTocreatePost" class="--addmessage">
                    <v-icon>mdi-message-plus</v-icon>
                </v-btn>
        <div v-else>
            <v-card class="post--container" >
                <v-card-title class="post--title">Crée un nouveau post</v-card-title>
                <v-form>
                    <v-text-field v-model="form.title"  label="Nom du post" required></v-text-field>
                    <v-file-input v-model="form.image" accept="image/*" label="File input"></v-file-input>
                    <v-textarea v-model="form.content" filled auto-grow label="Tapez votre message ici" rows="4" row-height="30" shaped required></v-textarea>
                </v-form>
                <v-form>
                    <div class="btn--createpost">
                        <!-- revenir a l'ajout du message par default -->
                            <v-btn class="--btn btn--firstchild" @click="switchToDisplayNewpost">
                                <span>annuler</span>
                            </v-btn>
                        <!-- au clic appel a la methode createNewAccount-->
                        <v-btn   v-on:click="createPost" :class="{'v-btn--disabled' : !validatedField}" color="success mr-4 --btn">
                                <span v-if="status=='loading'">Création du post...</span>
                                <span v-else>Crée le post</span>
                        </v-btn>
                    </div>
                </v-form>
            </v-card>
        </div>
    </v-container>
</template>
<script>

// IMPORT mélange les getters en calcul avec l'opérateur de propagation d'objet
import { mapState } from 'vuex'

export default {
    name:'Newpost',
    data: function() {
        return {
                //bouton retourner a l'etat par default
                mode:'bydefault',
                form : {
                    title: "",
                    content: "",
                    image:[] 
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
        this.refreshPost()
    },    
    props: { //Props  est un attribut que vous pouvez définir au niveau du composant qui sera transmis directement au template
        msg: {
            type: String,
        default:'Bonjour Groupomania', // ou require true
        }
    },
    computed: {
        validatedField: function() {
            //return false par default et true quand les  champ sont rempli
            let valid = false;
            // if (this.mode == 'create') { //createAccount
                if (this.form.title != "" && this.form.content != "") {
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
        switchToDisplayNewpost() {              // <------: function()
            this.mode = 'bydefault';
        },
        switchTocreatePost() {                      // <------: function()
            this.mode = 'createMessage';
        },                                      
        createPost(){  
            const This = this; 
            //sous element pas acces au this je renome une variabale pour appeler en dessous  
            //un terme spécial pour invoquer les mutations depuis le store - actions (dispatch) asynchrone  
            //précédées du signe dollar afin de garantir que ces méthodes sont bien utilisées comme prévu
            this.$store.dispatch('createPost',{
                title:this.form.title,
                content:this.form.content,
                image:this.form.image,
            }).then(() => {
                //redirection vers la route apres creation d'un compte (path en argument)
                this.refreshPost()
                this.$store.commit('SETSTATUS' , {status:'succes',message:`votre post est bien ajouter`});
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
@import url('../style/newpost.css');
</style>





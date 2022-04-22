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
                            <v-btn @click="switchToDisplayNewpost">
                                <span>annuler</span>
                            </v-btn>
                        <!-- au clic appel a la methode createNewAccount-->
                        <v-btn   v-on:click="createPost" :class="{'v-btn--disabled' : !validatedField}" color="success" class="mr-4">
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
.v-card-title.post--title {
    display: flex;
    justify-content: center;
    background-color: #091f43;
    color: white;
    width: 100%;
    border-radius: 16px 16px 0px 0px;
    border-bottom: #d1515a solid 2px;
}
.post--container  {
    display: flex;
    width: 100%;
    max-width: 1000px;

    flex-direction: column;
    box-shadow: 2px 2px 15px black;
    border-radius: 16px 16px 0 0;
}
.main_post {
    display: flex;
    justify-content: center;
    box-shadow: none;
}
.mdi-message-plus {
  color:white;
  font-size: 30px;
}
.--addmessage{
    border-radius: 50%;
    min-width: 0px;
    height: 45px;
    padding: 0 10px;
    background-color: #091f43;
    box-shadow: 2px 2px 10px black;
    border: #d1515a 2px solid;
}
.create_post{
    display: flex;
    justify-content: center;
    width: 100%;
}
.create_post > div {
    display: flex;
    justify-content: center;
    width: 100%;
}
.btn--createpost {
    display: flex;
}
.btn--createpost .v-btn {
    margin-right: 8px;
}
.btn--createpost .v-btn:first-child:hover {
    background-color: #091f43;
    color: white;
    border-bottom: #d1515a 2px solid;
}
</style>





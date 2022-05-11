<!-- composant permettent d'encapsuler un ensemble d'éléments HTML, de façon réutilisable et facilement maintenable. -->
<template>
    <v-container class="create_post" fluid>
        <div class="v-app--title">
            <h2>Fil d'actualité</h2>
        </div>
        <v-btn v-if="mode == 'bydefault'" v-on:click="switchTocreatePost" class="--addmessage">
            <v-icon>mdi-message-plus</v-icon>
        </v-btn>
        <div v-else>
            <v-card class="post--container --new" >
                <v-card-title class="post--title">Créer un nouvel article</v-card-title>
                <!-- permet de valider facilement les entrées de formulaire. -->
                <v-form ref="form" class="mx-2" lazy-validation v-model="valid">
                    <v-text-field @keyup="validateForm" :rules="titleRules" v-model="form.title"  label="Nom de l'article" required></v-text-field>
                    <v-file-input v-model="form.image" accept="image/*" label="File input"></v-file-input>
                    <v-textarea @keyup="validateForm" :rules="contentRules" v-model="form.content" filled auto-grow label="Tapez votre message ici" rows="4" row-height="30" shaped required></v-textarea>
                </v-form>
                <v-form>
                    <div class="btn--createpost">
                        <!-- revenir a l'ajout du message par default -->
                            <v-btn class="--btn btn--firstchild" @click="switchToDisplayNewpost">
                                <span>annuler</span>
                            </v-btn>
                        <!-- au clic appel a la methode createNewAccount-->
                        <v-btn   v-on:click="createPost" :disabled="!valid" color="success mr-4 --btn">
                                <span v-if="status=='loading'">Création de l'article...</span>
                                <span v-else>Enregistrer</span>
                        </v-btn>
                    </div>
                </v-form>
            </v-card>
        </div>
    </v-container>
</template>
<script>

// Import mapState , qui génère des fonctions getter calculées pour nous, 
//nous épargnant quelques frappes :
import { mapState } from 'vuex'

export default {
    name:'Newpost',
    data: function() {
        return {
                //bouton retourner a l'etat par default
                mode:'bydefault',
                valid:true,
                form : {
                    title: "",
                    content: "",
                    image:[] 
                },
                titleRules: [ //v=>value
                v => v != '' || 'Le titre est requis',
                v => (v && v.length <= 30) || 'le nom ne doit pas dépasser 30 caractères',
                v => v.length >= 5 || 'Minimum 5 caractères',
                ],
                contentRules: [ //v=>value
                v => v != '' || 'Le contenue est requis',
                v => (v && v.length <= 250) || 'le nom ne doit pas dépasser 250 caractères',
                v => v.length >= 5 || 'Minimum 5 caractères',
                ],
            }
        },
    //moment ou la vue et afficher    
    mounted() {
        //permet de recuperer les posts depuis ma methode
        this.refreshPost()
    },    
    //nous permettent de définir une valeur réutilisable qui est mise à jour en fonction d'autres propriétés  data
    computed: {
            //importation de l'objet depuis state
            // fusionner plusieurs objets en un seul afin de pouvoir transmettre l'objet final
            ...mapState(['status']) 
        },
    methods: {
        validateForm(){
                //ref fait reference au ref de l'element du dom pour lier
                //validate verifie les rules avant validation du formulaire res =>resultat
                this.$refs.form.validate().then((res) => {
                    this.valid = res.valid;        
                }).catch(error => (console.log(error)));
        }, 
        //function pour different etat sur l'affichage des buttons
        switchToDisplayNewpost() {              
            this.mode = 'bydefault';
        },
        switchTocreatePost() {                     
            this.mode = 'createMessage';
        },                                      
        createPost(){   
            //un terme spécial pour invoquer les mutations depuis le store - actions (dispatch) asynchrone  
            //précédées du signe dollar afin de garantir que ces méthodes sont bien utilisées comme prévu
            this.$store.dispatch('createPost',{
                title:this.form.title,
                content:this.form.content,
                image:this.form.image,
            }).then(() => {
                //on affiche les posst apres la creation 
                this.refreshPost()
                //et ont remet le bouton new post(+) part default
                this.switchToDisplayNewpost()
            }).catch(error => (console.log(error)));
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





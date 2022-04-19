<!-- composant permettent d'encapsuler un ensemble d'éléments HTML, de façon réutilisable et facilement maintenable. -->
<template>
    <div>
        <h2 class="post--title">modifier le post</h2>
            <v-form>
                <v-text-field v-model="form.title"  label="Nom du post" required></v-text-field>
                <v-file-input v-model="form.image" accept="image/*" label="File input"></v-file-input> 
                <v-textarea v-model="form.content" filled auto-grow label="Tapez votre message ici" rows="4" row-height="30" shaped required></v-textarea>
            </v-form>
        <v-form>
            <!-- au clic appel a la methode createNewAccount--> 
            <v-btn   v-on:click="updatePost" :class="{'v-btn--disabled' : !validatedField}" color="success" class="mr-4">
                <span v-if="status=='loading'">modification du post...</span>
                <span v-else>modifier le post</span>
            </v-btn>
        </v-form>
    </div>
</template>
<script>

// mélange les getters en calcul avec l'opérateur de propagation d'objet
import { mapState } from 'vuex'

export default {
    name:'EditPost',
    // Props  est un attribut que vous pouvez définir au niveau du composant qui sera transmis directement au template
    props: { 
        post: {
            type:Object
        }
    },
    data: function() {
        return {
                mode: 'login',  //etat login
                form : {
                    title: this.post.title,
                    content: this.post.content,
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
        updatePost(){  
            const This = this; 
            let image = this.form.image[0];
            //sous element pas acces au this je renome une variabale pour appeler en dessous  
            //un terme spécial pour invoquer les mutations depuis le store - actions (dispatch) asynchrone  
            //précédées du signe dollar afin de garantir que ces méthodes sont bien utilisées comme prévu
            let updatedPost = 
                {
                title:this.form.title,
                content:this.form.content,
                image:image,
            } 
            //enleve la proprieter img de l'objet , si l'image et undifined
            if (!image) {
            delete updatedPost.image 
            }
            this.$store.dispatch('updatePost',
            { 
                postId:this.post.id , 
                //correspond a l'argument dans le store
                updatedPost: updatedPost
            }).then(function (){
                //redirection vers la route apres creation d'un compte (path en argument)
                This.$router.push({path: '/posts'}); 
            }),
            function (error) {
                console.log(error);
            }
        } 
    },
}
</script>

<style scoped>
.post--title {
    text-align: center;
    background-color: #091f43;
    color: white;
    width: 100%;
    border-radius: 16px 16px 0px 0px;
    border-bottom: #d1515a solid 2px;
}
</style>





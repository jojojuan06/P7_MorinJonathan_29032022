<template>
    <v-app>
        <v-container class="--container"> 
            <v-card m-width="200px">
                <v-card-title class="--title">Modification du Post</v-card-title>  
                <v-form>
                    <v-text-field v-model="form.title" type="text" label="Nom du post" required></v-text-field>
                    <v-textarea name="input-7-1" filled label="votre text ici" auto-grow>
                    </v-textarea> 
                    <v-file-input show-size counter multiple label="Fichier image" density="compact" required></v-file-input>
                </v-form>
                <!-- afffiche seulement erreur a la connexion --> 
                <v-form class="--error_login" color="red" v-if="mode == 'update' && status == 'error'">
                Adresse mail et/ou mot de pâsse invalide ⚠
                </v-form>
                <!-- afffiche seulement erreur a la creation de compte --> 
                <v-form class="--error_create" color="red" v-if="mode == 'create' && status == 'error'">
                Adresse mail deja utilisé ⚠
                </v-form>
                <v-form>
                    <!-- si champ vide on disable le bouton validatedFieldss--> 
                    <!-- au clic appel a la methode createNewAccount--> 
                    <v-btn   @click="UpdateProfile" :class="{'v-btn--disabled' : !validatedField}"   color="success" class="mr-4" >
                        <span v-if="status=='loading'">Modification en cours...</span>
                        <span v-else>Modifier</span>
                    </v-btn>
                </v-form>
            </v-card>
        </v-container>
        <!--  1- recuperer des evenement-->
        <!--  2- importation du props alertconfirm depuis sont component , recoit l'evenement-->
        <!--  3- prop des component qui sont recuperer depuis alercomponent -->
        <!-- <AlertConfirm 
        @closeAlert="confirmDelete.open = false" 
        :title="confirmDelete.title"
        @comfirm="updateProfile" 
        :open="confirmDelete.open"/>  -->
    </v-app>
</template>

<script>
// recuper le user depuis le state grace au spread pour recuperer l'ojet user
import { mapState } from 'vuex'
import AlertConfirm from '@/components/AlertConfirm';

export default {
    name: 'UpdatePost',
    components: {
        AlertConfirm
    },
    data() {
        return {
            mode:"update", 
            form:{
                name: "",
                firstname: "",
                password: "",
                email:"",
                profile_img:""
            },
            confirmDelete:{
                title:"Etes vous sur de vouloir modifier, cette action est irréversible !",
                open:false
            }
        }
    },
    //moment ou la vue et afficher
    mounted() {                               // <-----: function()
        console.log(this.$store.state.user.userId); 
        //si l'utilisateur n'est pas nul donc non connecter on retourne a la page connection/inscription
        if(!this.$store.state.user.userId) {
            return this.$router.push({path: '/profile'}) 
        }   
    },
    //computed  nous permettent de définir une valeur réutilisable qui est mise à jour en fonction d'autres propriétés
    computed: {
        validatedField: function() {
            //return false par default et true quand les  champ sont rempli
            let valid = false;
            if (this.mode == 'create') { //createAccount
                if (this.form.email != "" && this.form.firstname != "" && this.form.name != "" && this.form.password != "") {
                    valid = true;
                } 
            }  else {
                    if (this.form.email != "" &&  this.form.password !="") {
                        valid = true;
                    }
                }
            return valid;    
            },
            //importation de l'objet depuis state
            ...mapState(['status']) 
        },
    methods: {
        //modification du post
       createNewAccount(){   // <------: function() 
            const This = this; //sous element pas acces au this je renome une variabale pour appeler en dessous  
            //un terme spécial pour invoquer les mutations depuis le store - actions (dispatch) asynchrone  
            //précédées du signe dollar afin de garantir que ces méthodes sont bien utilisées comme prévu
            this.$store.dispatch('updatePost',{
                title:this.form.title,
                content:this.form.content,
                image:this.form.image,
            }).then(function (){
                //redirection vers la route apres creation d'un compte (path en argument)
                This.$router.push({path: '/posts'}); 
            }),
            function (error) {
                console.log(error);
            }
        },
        openConfirmDelete(){
            this.confirmDelete.open = true;
        }
    },
}
</script>

<style scoped>
.v-container{
    display: flex;
    flex-direction: column;
}
.v-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url('../images/Home.png');
    background-position: center;
    background-repeat: no-repeat;
}
.v-card-title.--title {
    background-color: #091f43;
    color: white;
    width: 100%;
    border-radius: 16px 16px 0px 0px;
    border-bottom: #d1515a solid 2px;
}
@import url('../style/home');
</style>
<template>
    <v-app>
        <v-container class="--container"> 
            <v-card>
                    <v-card-title>
                            <h1>Modification du Compte</h1>  
                    </v-card-title>
                <v-form>
                    <v-text-field v-model="form.name" type="text" label="Name" required></v-text-field>
                    <v-text-field  v-model="form.firstname" type="text" label="Firstname" required></v-text-field>   
                    <v-text-field   v-model="form.email" type="text" label="E-mail" required></v-text-field>  
                    <v-text-field  v-model="form.password" type="password" label="Password" required></v-text-field>
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
        <AlertConfirm 
        @closeAlert="confirmDelete.open = false" 
        :title="confirmDelete.title"
        @comfirm="deleteProfile" 
        :open="confirmDelete.open"/> 
    </v-app>
</template>

<script>
// recuper le user depuis le state grace au spread pour recuperer l'ojet user
import { mapState } from 'vuex'
import AlertConfirm from '@/components/AlertConfirm';

export default {
    name: 'UpdateProfile',
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
        //modification du profil
        UpdateProfile() {
            this.confirmDelete.open = false
            //ajoute une condition if alert pour supprimer le compte
            //importation des state
            this.$store.dispatch('updateProfile', this.user)
            .then( () =>{
                this.$store.commit('UPDATE_PROFILE');
                this.$router.push({path: '/profile'})
                this.$store.commit('SETSTATUS' , {status:'succes',message:`Votre Compte a bien etait mis a jour`}); //type et payload
            })
            .catch(error => {
                this.$store.commit('SETSTATUS' , {status:'error',message:`Impossible de mettre a jour le compte le compte ${error}`}); //type et payload
            })
        },
        openConfirmDelete(){
            this.confirmDelete.open = true;
        }
    },
}
</script>
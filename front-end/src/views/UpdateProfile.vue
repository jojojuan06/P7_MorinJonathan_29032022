<template>
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
        <!-- afffiche seulement erreur a la creation de compte --> 
        <v-form class="--error_create" color="red" v-if="status == 'error'">
            Adresse mail deja utilisé ⚠
        </v-form>
        <v-form>
            <!-- si champ vide on disable le bouton validatedFieldss--> 
            <!-- au clic appel a la methode createNewAccount--> 
            <v-btn   @click="UpdateProfile" :class="{'v-btn--disabled' : !validatedField}"   color="success" class="mr-4" >
                <span v-if="status=='loading'">Modification en cours...</span>
            </v-btn>
        </v-form>
    </v-card>
</v-container>
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
            return this.$router.push({path: '/'}) 
        }
        //actions sont déclenchées avec la store.dispatch , 2e argument envoi en action
        this.$store.dispatch('getUserInfos',this.$store.state.user.userId);
        
    },
    //computed  nous permettent de définir une valeur réutilisable qui est mise à jour en fonction d'autres propriétés
    computed: {
            //mapStaterenvoie un objet , pour simplifier les variable sans le ,$store.state
            ...mapState(['userInfos', 'user']) //renomer l'element du state
    },
    methods: {
        //deconnexion au profil
        UpdateProfile() { 
            //commit importation de la mutation logout depuis le store
            this.$store.commit('UPDATE_PROFILE');
            this.$router.push({path: '/profile'})
            this.$store.commit('SETSTATUS' , {status:'succes',message:`Votre Compte et bien mis a jour`}); //type et payload
        },
        //suppresion du profil
        deleteProfile() {
            this.confirmDelete.open = false
            //ajoute une condition if alert pour supprimer le compte
            //importation des state
            this.$store.dispatch('deleteProfile', this.user)
            .then( () =>{
                this.$store.commit('LOGOUT');
                this.$router.push({path: '/'})
                this.$store.commit('SETSTATUS' , {status:'succes',message:`Votre Compte a bien etait suprimer`}); //type et payload
            })
            .catch(error => {
                this.$store.commit('SETSTATUS' , {status:'error',message:`Impossible de supprimer le compte ${error}`}); //type et payload
            })
        },
        openConfirmDelete(){
            this.confirmDelete.open = true;
        }
    },
}
</script>
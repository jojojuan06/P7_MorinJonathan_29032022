<template>
    <v-app>
        <v-container class="profile--container">
        <h2 class="profile--title"> Bonjour : {{userInfos.firstname}} </h2>
            <v-avatar  class="profile--avatar --responsive">
                <v-img aspect-ratio="1" cover class="--img .rounded-lg" v-if="userInfos.profile_img == '' || userInfos.profile_img == undefined"  src="../images/avatar-default.png"></v-img>
                <v-img aspect-ratio="1" cover class="--img .rounded-lg" v-else  v-bind:src="`http://localhost:3000/images/${userInfos.profile_img}`"></v-img>
            </v-avatar>
            <v-card class="profile--description --card">
                <v-card-title class="description--title">
                    Information Profile   
                </v-card-title>
                <v-card-subtitle>
                </v-card-subtitle>
                <!-- affichage des information du compte -->
                <div>
                    <p><strong>Prénoms: </strong>{{userInfos.firstname}}</p>
                    <p><strong>Nom: </strong>{{userInfos.name}}</p>
                    <p><strong>Email: </strong>{{userInfos.email}}</p>
                </div>
                <v-card-actions class="profile--btn">
                    <!-- action de deconnexion avec la mutation logout-->
                    <v-btn class="--btn btn--logout" @click="logout"><strong>Déconnexion</strong></v-btn>
                    <v-btn  class="--btn btn--delete" @click="openConfirmDelete" >Supprimer le compte</v-btn>  <!--href="#" target="_blank" -->
                </v-card-actions>
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
    name: 'Profil',
    components: {
        AlertConfirm
    },
    data() {
        return {
            confirmDelete:{
                title:"Etes vous sur de vouloir supprimer le compte, cette action est irréversible !",
                open:false
            }
        }
    },
    //moment ou la vue et afficher
    mounted() {   
        //si l'utilisateur n'est pas nul donc non connecter on retourne a la page connection/inscription
        //this.user au lieu de $store.state.user avec mapstate
        if(!this.user.userId) {
            return this.$router.push({path: '/'}) 
        }
        //actions sont déclenchées avec la store.dispatch , recupere les information de l'utilisateur connecter
        this.$store.dispatch('getUserInfos',this.user.userId);
        
    },
    //computed  nous permettent de définir une valeur réutilisable qui est mise à jour en fonction d'autres propriétés
    //Mapstate permet d’utiliser des function calculer depuis le store
    computed: {
            //mapStaterenvoie un objet , pour simplifier les variable sans le ,$store.state
            ...mapState(['userInfos', 'user']) //renomer l'element du state
    },
    methods: {
        //deconnexion au profil
        logout() { 
            //commit importation de la mutation logout depuis le store
            this.$store.commit('LOGOUT');
            this.$router.push({path: '/'})
            this.$store.commit('SETSTATUS' , {status:'success',message:`Vous ete bien deconnecter`}); //type et payload
        },
        //suppresion du profil
        deleteProfile() {
            this.confirmDelete.open = false
            //importation des state
            this.$store.dispatch('deleteProfile', this.user)
            .then( () =>{
                this.$store.commit('LOGOUT');
                this.$router.push({path: '/'})
                this.$store.commit('SETSTATUS' , {status:'success',message:`Votre Compte a bien etait suprimer`}); //type et payload
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

<style scoped>
.profile--title{
    text-align: center;
    color: white;align-self: center;
    background-color:#091f43;
    border: 1px solid #d1515a;
    border-radius:16px;
    padding: 16px;
}
@import url('../style/profil.css');
</style>



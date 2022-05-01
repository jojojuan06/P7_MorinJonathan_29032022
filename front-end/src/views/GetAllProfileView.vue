<template>
    <v-app>
        <v-container class="container">
            <div  class="container--users">
                <v-card class="--card" v-for="user of this.$store.state.users" v-bind:key="user.id" >
                    <v-avatar class="avatar--img">
                    <v-img v-if="user.profile_img == '' " class=".rounded-lg" src="../images/pngtree-vector-avatar-icon-png-image_702436.png"></v-img>
                    <v-img v-else class=".rounded-lg" v-bind:src="user.profile_img"></v-img>
                    </v-avatar>
                    <v-card-title class="user--title">
                    Information Profile   
                    </v-card-title>
                    <!-- affichage des information du compte -->
                    <div class="user--infos">
                    <p><strong>Nom: </strong>{{user.name}}</p>
                    <p><strong>Prénoms: </strong>{{user.firstname}}</p>
                    <p><strong>Email: </strong>{{user.email}}</p>
                    </div>
                    <!-- afficher le choix des boutons en administrateur ou si  mon propre compte-->
                    <v-card-actions class="--btn-users" v-if="this.$store.state.user.admin == true || user.id == this.$store.state.user.userId">
                        <!-- action de deconnexion avec la mutation logout-->
                        <v-btn class="btn--profile"><strong>Modifier</strong></v-btn>
                        <v-btn class="btn--profile"  @click="openConfirmDelete(user.id)" ><strong>Supprimer le compte</strong></v-btn>  <!--href="#" target="_blank" -->
                    </v-card-actions>
                </v-card>
            </div>
        </v-container> 
        <!--  1- recuperer des evenement-->
        <!--  2- importation du props alertconfirm depuis sont component , recoit l'evenement-->
        <!--  3- prop des component qui sont recuperer depuis alercomponent -->
        <AlertConfirm 
        @closeAlert="confirmDelete.open = false" 
        :title="confirmDelete.title"
        @comfirm="deleteProfile(userId)" 
        :open="confirmDelete.open"/>  
    </v-app>
</template>

<script>
// recuper le user depuis le state grace au spread pour recuperer l'ojet user
//import { mapState } from 'vuex'
import AlertConfirm from '@/components/AlertConfirm';

export default {
    name: 'Profiles',
    components: {
        AlertConfirm
    },
    data() {
        return {
            userId: -1,
            confirmDelete:{
                title:"Etes vous sur de vouloir supprimer le compte, cette action est irréversible !",
                open:false
            }
        }
    },
     //moment ou la vue et afficher
    mounted() {                               // <-----: function()
    //actions sont déclenchées avec la store.dispatch , 2e argument envoi en action
        this.$store.dispatch('getAllUser');
        this.refreshProfiles();
        
    },
    //computed  nous permettent de définir une valeur réutilisable qui est mise à jour en fonction d'autres propriétés
    computed: {
    },
    methods: {
        //suppresion du profil
        deleteProfile() {
            this.confirmDelete.open = false
            //ajoute une condition if alert pour supprimer le compte
            //importation des state (recuperre l'utilisateur et le token)
            this.$store.dispatch('deleteProfile', {userId:this.userId,token:this.$store.state.user.token})
            .then( () =>{
                this.refreshProfiles()
                this.$store.commit('SETSTATUS' , {status:'success',message:`le profil a bien etait supprimer`}); //type et payload
            })
            .catch(error => {
                this.$store.commit('SETSTATUS' , {status:'error',message:`Impossible de supprimer le compte ${error}`}); //type et payload
            })
        },
        openConfirmDelete(userId){
            this.userId = userId;
            this.confirmDelete.open = true;
        },
        refreshProfiles(){
            //dispatch apliquer l'action (recuperer a nouveau les profiles)
            this.$store.dispatch('getAllUser')
        }
    },
}
</script>

<style scoped>
@import url('../style/profiles.css');
</style>
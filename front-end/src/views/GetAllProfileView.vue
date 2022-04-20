<template>
    <v-app>
        <v-container>
            <div  class="container--users">
                <v-card v-for="user of this.$store.state.users" v-bind:key="user.id" >
                    <v-card-title>
                        <h3>{{user.name}}</h3> 
                    </v-card-title>
                    <v-avatar>
                    <v-img v-if="user.profile_img == '' " class=".rounded-lg" src="../images/pngtree-vector-avatar-icon-png-image_702436.png"></v-img>
                    <v-img v-else class=".rounded-lg" v-bind:src="user.profile_img"></v-img>
                    </v-avatar>
                    <v-card-subtitle></v-card-subtitle>
                    <!-- affichage des information du compte -->
                        <p><strong>Voila donc qui je suis</strong> </p>
                        <p>{{user.firstname}}-{{user.name}}</p>
                        <p>{{user.email}}</p>
                        <!-- afficher le choix des boutons en administrateur ou si  mon propre compte-->
                    <v-card-actions v-if="this.$store.state.user.admin == true || user.id == this.$store.state.user.userId">
                        <!-- action de deconnexion avec la mutation logout-->
                        <v-btn><strong>Modifier</strong></v-btn>
                        <v-btn   @click="openConfirmDelete(user.id)" >Supprimer le compte</v-btn>  <!--href="#" target="_blank" -->
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
                this.$store.commit('SETSTATUS' , {status:'succes',message:`le profil a bien etait supprimer`}); //type et payload
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
.container--users {
    display: flex;
    flex-wrap: wrap;
}
h3 {
    margin: 40px 0 0;
    color: #D1515A;
}
.v-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
}
.v-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 50%;
    background: #d7d7d7;
    min-height: 394px;
}
.v-card .v-avatar {
    height: 150px;
    width: 150px;
}
.v-card .v-btn:nth-child(2){
    color:red;
    text-decoration: underline;
}
.v-card .v-btn:nth-child(2):hover{
    background-color: transparent;
    color:red;
    text-decoration: underline;
}
</style>
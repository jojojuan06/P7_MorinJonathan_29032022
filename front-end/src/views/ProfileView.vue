<template>
    <v-app>
        <v-container>
            <v-card>
                <v-card-title>
                    <h3>Mon Profile</h3>   
                </v-card-title>
                <v-avatar>
                <v-img v-if="user.profile_img == '' " class=".rounded-lg" src="../images/pngtree-vector-avatar-icon-png-image_702436.png"></v-img>
                <v-img v-else class=".rounded-lg" v-bind:src="user.profile_img"></v-img>
                </v-avatar>
                <v-card-subtitle>
                </v-card-subtitle>
                <!-- affichage des information du compte -->
                    <p><strong>Voila donc qui je suis</strong> </p>
                    <p>{{user.firstname}}-{{user.name}}</p>
                    <p>{{user.email}}</p>
                <v-card-actions>
                    <!-- action de deconnexion avec la mutation logout-->
                    <v-btn @click="logout"><strong>Déconnexion</strong></v-btn>
                    <v-btn   @click="deleteProfile()" >Supprimer le compte</v-btn>  <!--href="#" target="_blank" -->
                </v-card-actions>
            </v-card>
        </v-container>  
    </v-app>
</template>

<script>
// recuper le user depuis le state grace au spread pour recuperer l'ojet user
import { mapState } from 'vuex'

export default {
    name: 'Profile',
    //moment ou la vue et afficher
    mounted() {                               // <-----: function()
        console.log(this.$store.state.user); 
        //si l'utilisateur -1 donc non connecter on retourne a la page connection/inscription
        if(this.$store.state.user.userId == -1) {
            this.$router.push({path: '/'}) 
            return;    
        }
        //actions sont déclenchées avec la store.dispatch , 2e argument envoi en action
        this.$store.dispatch('getUserInfos',this.$store.state.user.userId);
        
    },
    //computed  nous permettent de définir une valeur réutilisable qui est mise à jour en fonction d'autres propriétés
    computed: {
    //mapStaterenvoie un objet , pour simplifier les variable sans le ,$store.state
            ...mapState({
    //renomer l'element du state            
        user:'userInfos'})
    },
    methods: {
        //deconnexion au profil
        logout() { 
            //commit importation de la mutation logout depuis le store
            this.$store.commit('logout');
            this.$router.push({path: '/'})
        },
        //suppresion du profil
        deleteProfile() {
            //ajoute une condition if alert pour supprimer le compte
            //commit importation de la mutation logout depuis le store
            //this.$store.dispatch('deleteProfile',this.$store.state.user.userId);
            this.$store.commit('deleteProfile');
            this.$router.push({path: '/'}) 
        }
    },
}
</script>

<style scoped>
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
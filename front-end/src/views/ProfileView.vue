<template>
    <v-app>
        <v-container>
            <v-card>
                <v-card-title>
                    <h3>Espace perso</h3>   
                </v-card-title>
                <v-card-subtitle>
                    <p><strong>Voila donc qui je suis</strong> </p>
                    <v-img src></v-img>
                </v-card-subtitle>
                <v-card-actions>
                    <v-btn>Déconnexion</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>  
    </v-app>
</template>

<script>
export default {
    name: 'Profile',

}
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
    color: #D1515A;
}
.v-card-actions .v-btn:hover{
    background-color:#091F43;
    color:white;
}
.v-card-actions .v-btn {
    color:black;
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
</style>
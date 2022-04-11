<template>
    <v-app>
        <v-container>
        <v-card>
            <v-card-title>
                <h3>Espace perso</h3>   
            </v-card-title>
            <v-card-text>
                <p><strong>Voila donc qui je suis</strong> </p>
                <v-img src></v-img>
        </v-card-text>
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

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

</style>
<template>
    <v-app>
        <v-container>
        <v-card>
            <v-card-title>
                <h3>{{ msg }}</h3>   
            </v-card-title>
            <v-card-text>
                <strong>Bienvenue sur le site je vous invite a vous s'inscrire</strong> 
        </v-card-text>
            <v-card-actions>
                <v-btn>S'inscrire</v-btn>
                <v-btn text>Se connecter</v-btn>
            </v-card-actions>
        </v-card>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name: 'Home',
    props: {
    msg: {
        type: String,
      default:'Bonjour Groupomania', // ou require true
    }
    }
}
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
.v-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url('../images/Home.png');
    background-position: center;
    background-repeat: no-repeat;
}
</style>
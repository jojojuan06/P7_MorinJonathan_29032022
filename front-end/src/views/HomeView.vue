<template>
    <v-app> 
        <Home msg="Bienvenue sur Groupomania"/>
    </v-app>   
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Home.vue'

export default {
    name: 'HomeView',
    components: {
        Home
    }
}
</script>
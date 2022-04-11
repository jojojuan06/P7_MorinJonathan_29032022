<template>
  <v-app>
    <img alt="Vue logo" src="./assets/logo.png">
    <Home msg="Welcome to Your Vue.js App"/>
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
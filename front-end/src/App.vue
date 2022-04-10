<template>
  <v-app>
    <v-app-bar app>
      <!-- <img src="./assets/logo.png" alt="Vue logo"> -->
    </v-app-bar>
      <v-main>
        <Posts/>
      </v-main>
    </v-app>
</template>

<script>
import Posts from './components/Posts.vue'

export default {
  name:'App',
  components: {
    Posts
  },
  data: () => ({
   
  }),
}
</script>

<style>




nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>



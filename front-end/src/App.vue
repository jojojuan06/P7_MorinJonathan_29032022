<template>
  <v-app>
    <v-app-bar app>
      <router-link to="/">Home</router-link> |
      <router-link to="/posts">Posts</router-link>
    </v-app-bar>
        <router-view/>
      <v-main>
        <!-- affiche les component -->
      </v-main>
    </v-app>
</template>

<script>
import Posts from './components/Posts.vue'
import NewPost from './components/NewPost.vue'
import Home from './components/Home.vue'


export default {
  name:'App',
  components: {
    Posts,
    NewPost,
    Home
  },
  data: () => ({
   
  }),
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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



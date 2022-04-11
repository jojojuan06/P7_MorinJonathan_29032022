<template>
  <v-app>
    <v-img alt="Vue logo" src="../assets/logo.png"></v-img>
    <Posts msg="Welcome to Your Vue.js App"/>
    <NewPost/>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Posts from '@/components/Posts.vue'
import NewPost from '@/components/NewPost.vue'

export default {
  name: 'PostView',
  components: {
    Posts ,NewPost
  },
}
</script>
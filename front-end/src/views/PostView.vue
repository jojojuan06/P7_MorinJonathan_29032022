<template>
  <v-app>
    <NewPost/>
    <Posts/>
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

<style scoped>
.v-card {
  box-shadow: 2px 2px 15px black;
}
</style>
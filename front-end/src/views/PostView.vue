<template>
  <v-app>
        <!-- utiliser le composant dans le modèle -->
        <NewPost/>
        <Posts/>
  </v-app>
</template>

<script>
// IMPORT COMPONENTS
import Posts from '@/components/Posts.vue'
import NewPost from '@/components/NewPost.vue'

export default {
  name: 'PostView',
//instancier components 
  components: {
    Posts ,NewPost
  },
}
</script>

<style scoped>

</style>
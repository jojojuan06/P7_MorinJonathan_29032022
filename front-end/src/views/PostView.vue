<template>
    <div>
    <h1>This is an about page</h1>
    <Post/>
    </div>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue'

export default {
  name: 'PostView',
  components: {
    Post
  }
}
</script>
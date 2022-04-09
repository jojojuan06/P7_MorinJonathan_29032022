<template>
  <div>
    <h1>This is an about page</h1>
    <Contact msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Contact from '@/components/Contact.vue'

export default {
  name: 'ContactView',
  components: {
    Contact
  }
}
</script>
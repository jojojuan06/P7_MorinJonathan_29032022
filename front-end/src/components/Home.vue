<template>
    <v-app>
        <h3>{{ msg }}</h3>
    </v-app>
</template>

<script>
export default {
    name: 'Home',
    props: {
    msg: {
        type: String,
      default:'Hello Openclassrooms', // ou require true
    }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
    color: #42b983;
}
/* ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
} */
</style>
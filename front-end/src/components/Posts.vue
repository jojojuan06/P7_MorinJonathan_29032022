<!-- composant permettent d'encapsuler un ensemble d'éléments HTML, de façon réutilisable et facilement maintenable. -->
<template>
        <v-app  class="v-app--container">
            <h3 class="v-app--title">Posts</h3>
            <!-- boucle for pour afficher la liste des posts , boucle sur chacun d'eux puis les afficher -->
            <v-card v-for="(post,index) in this.$store.state.posts" v-bind:key="index">  <!-- import de post depuis $store.state -->
                <v-card-title class="v-card-title--color">{{post.title}}</v-card-title>
                <v-card-title class="v-card-title--date"><em class="date--title">date de creation:</em> {{post.createdAt}}</v-card-title>
                <v-img class="v-img--post" v-bind:src="post.image" alt="mon image"></v-img>
                <v-text class="v-text--content"><p>{{post.content}}</p></v-text>
            </v-card>
        </v-app>  
</template>

<script>

export default {
// qui représente le moment durant lequel le composant va être rendu sur notre page.
// mettre a jour les posts dans le state
    mounted() {
    this.$store.dispatch('getPosts') //dispatch apliquer l'action
    },
};
</script>

<style scoped>
@import url('../style/posts.css');
</style>

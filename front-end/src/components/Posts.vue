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
                <!-- boucle sur chaque comment du post et l'affiche -->
                <hr>
                <div class="avatar_container">
                <v-avatar>
                    <v-img class="avatar--img .rounded-lg" v-if="post.User.profile_img == '' "  src="../images/pngtree-vector-avatar-icon-png-image_702436.png"></v-img>
                    <v-img class="avatar--img .rounded-lg" v-else  v-bind:src="post.User.profile_img"></v-img>
                </v-avatar>
                <v-text class="avatar--comment" v-for="(comment,index) in post.Comments" :key="index"><p>{{ comment.content }}</p></v-text>
                </div>
                <hr>
                <v-btn v-if="post.likes == 0" class="btn--like">
                    <v-icon  class="btn--icon">mdi-thumb-up</v-icon>
                </v-btn>
                <v-btn v-else class="btn--notLike">
                    <v-icon  class="btn--icon">mdi-thumb-up</v-icon>
                </v-btn>
                <v-badge class="btn--badge" color="info" :content="'+' + post.likes" inline></v-badge>
            </v-card>
        </v-app>    
</template>

<script>
//import Comment from '@/components/comment.vue'

export default {
    // component: {
    //     Comment
    // },
    // qui représente le moment durant lequel le composant va être rendu sur notre page.
    // mettre a jour les posts dans le state
    mounted() {
    this.$store.dispatch('getPosts') //dispatch apliquer l'action
    },
};
</script>

<style scoped>
.v-btn.btn--like {
    border-radius: 50%;
    width: 1px;
    height: 30px;
    background-color: #d1515a;
    box-shadow: none;
    min-width: 0px;
    margin-top: 4px;
}
.v-btn.btn--notLike {
    border-radius: 50%;
    width: 1px;
    height: 30px;
    background-color:green;
    box-shadow: none;
    min-width: 0px;
    margin-top: 4px;
}
.btn--icon {
    color: white;
}
.btn--badge {
    margin-top: 4px;
}
.avatar--img {
    display: flex;
    height: 20px;
}
.avatar_container{
    padding-top: 2px;
    display: flex;
}
.avatar--comment {
    margin-left: 16px
}
@import url('../style/posts.css');
</style>

<!-- composant permettent d'encapsuler un ensemble d'éléments HTML, de façon réutilisable et facilement maintenable. -->
<template>
        <v-app  class="v-app--container">
            <h3 class="v-app--title">Posts</h3>
            <!-- boucle for pour afficher la liste des posts , boucle sur chacun d'eux puis les afficher -->
            <!-- import de post depuis $store.state -->
            <v-card v-for="(post,index) in this.$store.state.posts" v-bind:key="index">  
                <v-card-title class="v-card-title--color">{{post.title}}</v-card-title>
                <v-card-title class="v-card-title--date"><em class="date--title">date de creation:</em> {{dateNow(post.createdAt)}}</v-card-title>
                <v-img class="v-img--post" v-bind:src="post.image" alt="mon image"></v-img>
                <v-card-text class="v-text--content"><p>{{post.content}}</p></v-card-text>
                <hr>
                <div class="avatar_container">
                <v-avatar>
                    <v-img class="avatar--img .rounded-lg" v-if="post.User.profile_img == '' "  src="../images/pngtree-vector-avatar-icon-png-image_702436.png"></v-img>
                    <v-img class="avatar--img .rounded-lg" v-else  v-bind:src="post.User.profile_img"></v-img>
                </v-avatar>
                <!-- boucle sur chaque comment du post et l'affiche -->
                <v-card-text class="avatar--comment" v-for="(comment,index) in post.Comments" :key="index"><p>{{ comment.content }}</p></v-card-text>
                <v-btn class="btn--closed">
                    <v-icon class="icon--close">mdi-close</v-icon>
                </v-btn>
                </div>
                <hr>
                <v-btn v-if="post.likes == 0" class="btn--like">
                    <v-icon  class="btn--icon">mdi-thumb-up</v-icon>
                </v-btn>
                <v-btn v-else class="btn--notLike">
                    <v-icon  class="btn--icon">mdi-thumb-up</v-icon>
                </v-btn>
                <v-badge class="btn--badge" color="info" :content="'+' + post.likes" inline></v-badge>
                <div class="btn--update">
                    <v-btn class="--button"><strong>Modifier</strong></v-btn>
                </div>
                <EditPost/>
            </v-card>
        </v-app>    
</template>

<script>
//importation du component edit post pour modification
import EditPost from '@/components/EditPost.vue'
//Props  est un attribut que vous pouvez définir au niveau du composant qui sera transmis directement au template
export default {
    components: {
    EditPost
    },
    mounted() {
        this.$store.dispatch('getPosts') //dispatch apliquer l'action
        },
        methods: {
            dateNow(date){
            // retourne jour mois année et l'heure
            const dateObj = new Date(date)
            let day = dateObj.getDate()
            let month = dateObj.getMonth()
            let year = dateObj.getFullYear()
            let hours = dateObj.getHours()
            let min = dateObj.getMinutes()

            if(min < 10) min = `0${min}`
            if(day < 10) day = `0${day}`
            if(month < 10) month = `0${month}`
            if(hours < 10) hours = `0${hours}`
            return day + "-" + month + "-" + year + " " + hours + ":" + min; 
        }
    }
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
.btn--update {
    display: flex;
    justify-content: flex-end;
}
.--button {
    color: #091F43;
    box-shadow: none;
}
.--button:hover {
    box-shadow: 2px 2px 15px black;
    border-bottom: #d1515a solid 2px;
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
    height: 20px;
}
.avatar_container{
    display: flex;
}
.avatar--comment {
    margin-left: 16px;
    display: flex;
    align-self: center;
}
.v-btn.btn--closed {
    display: flex;
    align-self: center;
    box-shadow: none;
    background-color: #d1515a;
    width: 0px;
    height: 16px;
    min-width: 0px;
    margin-left: 16px;
}
.icon--close {
    color:white;
    font-size: 14px;
    font-weight: bold;
}
@import url('../style/posts.css');
</style>

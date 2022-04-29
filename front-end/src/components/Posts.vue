<!-- composant permettent d'encapsuler un ensemble d'éléments HTML, de façon réutilisable et facilement maintenable. -->
<template>
        <v-app class="post--backcolor">
            <h3 class="v-app--title">Posts</h3>
            <!-- boucle for pour afficher la liste des posts , boucle sur chacun d'eux puis les afficher -->
            <!-- import de post depuis $store.state -->
            <v-card  class="main_post" v-for="(post,index) in this.$store.state.posts" v-bind:key="index">  
                <v-container class="post--container">
                <v-card-title class="v-card-title--color">
                {{post.title}}
                </v-card-title>
                <div class="avatar_container">
                        <v-avatar class="--avatar">
                        <v-img :alt="post.User.name" class=".rounded-lg" v-if="post.User.profile_img == '' "  src="../images/pngtree-vector-avatar-icon-png-image_702436.png"></v-img>
                        <v-img :alt="post.User.name" class=".rounded-lg" v-else  v-bind:src="post.User.profile_img"></v-img>
                        </v-avatar>
                    <div class="post--info">
                        <h2 class="post--name">{{post.User.name}}</h2>
                        <v-card-title class="card--date date">
                             {{`posté le: ${dateNow(post.createdAt)}`}} 
                        </v-card-title>
                    </div>
                </div>
                <div class="img--container img">
                    <v-img class="v-img--post img" v-bind:src="post.image" :alt="post.title"></v-img>    
                </div>
                <v-card-text class="v-text--content">
                    <p>{{post.content}}</p>
                </v-card-text>
                <div v-if="post.mode == 'bydefault' || !post.mode">
                    <v-btn @click="switchToCreateComment(post)" class="btn--add">
                    <v-icon class="icon--add">mdi-plus</v-icon>
                </v-btn>
                </div>
                <hr>  
                <!-- si il n'y a pas de comment p ci-dessous par default -->
                <v-card-text v-if="post.Comments.length == 0" class="v-text--content">
                    <p>Ajouter un commentaire</p>
                </v-card-text>
                <!-- boucle sur chaque comment du post et l'affiche -->
                <!-- section comment -->
                <div v-else class="comment_container" v-for="(comment,index) in post.Comments" :key="index">
                    <v-avatar>
                    <v-img :alt="comment.User.name" class=".rounded-lg" v-if="comment.User.profile_img == '' "  src="../images/pngtree-vector-avatar-icon-png-image_702436.png"></v-img>
                    <v-img :alt="comment.User.name" class=".rounded-lg" v-else  :src="comment.User.profile_img"></v-img>
                    </v-avatar>
                    <v-card-text class="card--comment">
                            {{ comment.content }}
                    </v-card-text>
                    <v-btn v-if="comment.userId == $store.state.user.userId || $store.state.user.admin == true" class="btn--closed" @click="deleteComment(comment.id)">
                    <v-icon class="icon--close">mdi-close</v-icon>
                    </v-btn> 
                </div>
                <!-- @CancelAddComment appelle evenement depuis l'enfant -->
                <NewComment :postId="post.id" @CancelAddComment="switchToDisplaypost(post)" v-if="post.mode == 'createComment'"/>  
                <!--  -->
                <hr> 
                <!-- section like -->
                <div class="like--container">
                <div  class="btn--update">
                    <!-- par default liked false btn rouge non like else l'inverse-->
                    <v-btn class="btn--like --true" v-if="post.liked == false"  @click="likeToPost(post.id)" >
                        <v-icon  class="btn--icon">mdi-thumb-up-outline</v-icon>
                    </v-btn> 
                    <!-- supprime seulement sont like id du post     -->
                    <v-btn class="btn--like --false" v-else @click="deleteLike(post.id)" >
                    <v-icon  class="btn--icon">mdi-thumb-up</v-icon>
                </v-btn>  
                <div>
                    <v-badge class="btn--badge" color="info" :content="'+' + post.Likes.length" inline></v-badge>
                </div>
                </div>
                </div>
                <!--  -->
                <!-- section modifier (switch le post de l'utilisateur) supprimer du post  -->
                <!-- l'utilisateur modifie/sup sont post ou admin peut modifier/sup tous les posts -->
                <v-card-actions  v-if="this.$store.state.user.admin == true || post.userId == this.$store.state.user.userId" class="btn--update">
                    <div v-if="post.mode === 'bydefault'  || !post.mode">
                        <v-btn   v-on:click="switchToUpdate(post)" class="--button">
                            <strong>Modifier</strong>
                        </v-btn>
                    </div>
                    <div v-else-if="post.mode == 'update'">
                        <v-btn   v-on:click="switchToDisplaypost(post)" class="--button">
                            <strong>Annuler</strong>
                        </v-btn>
                    </div>
                    <v-btn class="--button" @click="openConfirmDelete(post.id)" >Supprimer le post</v-btn>
                </v-card-actions>
                <!-- ajout du component edit post avec son props post objet (dont l'id du post recuperer) dans le template -->
                <EditPost v-if="post.mode == 'update'" v-bind:post="post"/>
                <!--  -->
                </v-container>
            </v-card>
            <!--Props  est un attribut que vous pouvez définir au niveau du composant qui sera transmis directement au template -->
            <AlertConfirm 
        @closeAlert="confirmDelete.open = false" 
        :title="confirmDelete.title"
        @comfirm="deletePost" 
        :open="confirmDelete.open"/>
        </v-app>    
</template>

<script>
//IMPORT COMPONENTS
import EditPost from '@/components/EditPost.vue';
import AlertConfirm from '@/components/AlertConfirm';
import NewComment from '@/components/NewComment';
export default {
    //INSTANCIER LES COMPONENTS
    components: {
    EditPost,AlertConfirm,NewComment
    },
    //declarer un objet
    data() {
        return {
            //retourner a l'etat par default
            mode:'bydefault', 
            //postid actuel
            currentPostId: null,  
            confirmDelete:{
                title:"Etes vous sur de vouloir supprimer le compte, cette action est irréversible !",
                open:false
            }
        }
    },
    mounted() {
        this.refreshPost() 
        },
    methods: {
        deleteComment(commentId){
            this.$store.dispatch('deleteComment', commentId)
        },
        likeToPost(postId){  
                this.$store.dispatch('postLike', postId)
            },
        deleteLike(postId){  
                this.$store.dispatch('deleteLike',postId)
            },
        //function pour different etat sur l'affichage des button
        // <------: function()
        switchToDisplaypost(post) {              
            post.mode = 'bydefault';
        },
        switchToUpdate(post) {                     
            post.mode = 'update';
        },
        switchToCreateComment(post){
            post.mode = 'createComment'
        },
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
        },
        //suppresion du post
        deletePost() {
        this.confirmDelete.open = false
        //ajoute une condition if alert pour supprimer le compte
        //importation des state
        this.$store.dispatch('deletePost',{postId:this.currentPostId})
        .then( () =>{
            this.refreshPost()
            this.$store.commit('SETSTATUS' , {status:'succes',message:`Votre Compte a bien etait suprimer`}); //type et payload
        })
        .catch(error => {
            this.$store.commit('SETSTATUS' , {status:'error',message:`Impossible de supprimer le compte ${error}`}); //type et payload
        })
        },
        openConfirmDelete(postId){
                this.currentPostId = postId;
                this.confirmDelete.open = true;
            },
        //rafraichir la liste des posts
        refreshPost(){
            //dispatch apliquer l'action (recuperer a nouveau les post)
            this.$store.dispatch('getPosts')

        }
    }
};
</script>

<style scoped>
.post--info {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    margin-bottom: 8px;
}
.main_post {
    margin: 0;
    padding: 32px 8px 8px 8px;
    display: flex;
    justify-content: center;
    box-shadow: none;
}
.post--container  {
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 15px black;
    border-radius: 16px 16px 0 0;
    max-width: 1000px;
    background-color: #d7d7d7;
}
.like--container{
    display: flex
}
.post--name {
    display: flex;
    color: #091F43;
    font-size: 1rem;
}
@import url('../style/boutonLike.css');
@import url('../style/posts.css');
@import url('../style/comment.css');
</style>

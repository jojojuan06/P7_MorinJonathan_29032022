<!-- composant permettent d'encapsuler un ensemble d'éléments HTML, de façon réutilisable et facilement maintenable. -->
<template>
        <v-app  >
            <h3 class="v-app--title">Posts</h3>
            <!-- boucle for pour afficher la liste des posts , boucle sur chacun d'eux puis les afficher -->
            <!-- import de post depuis $store.state -->
            <v-card  class="main_post" v-for="(post,index) in this.$store.state.posts" v-bind:key="index">  
                <v-container class="post--container">
                <v-card-title class="v-card-title--color">{{post.title}}</v-card-title>
                <div class="avatar_container">
                <v-avatar>
                    <v-img :alt="post.User.name" class="avatar--img .rounded-lg" v-if="post.User.profile_img == '' "  src="../images/pngtree-vector-avatar-icon-png-image_702436.png"></v-img>
                    <v-img :alt="post.User.name" class="avatar--img .rounded-lg" v-else  v-bind:src="post.User.profile_img"></v-img>
                </v-avatar>
                <v-card-title class="card--date"><em class="date--title">date de creation:</em> {{dateNow(post.createdAt)}}</v-card-title>
                </div>
                <div>
                    <v-img class="v-img--post" v-bind:src="post.image" :alt="post.title"></v-img>    
                </div>
                <v-card-text class="v-text--content"><p>{{post.content}}</p></v-card-text>
                <hr>
                <!-- boucle sur chaque comment du post et l'affiche -->
                <!-- section comment -->
                <div>
                    <v-card-text class="card--comment" v-for="(comment,index) in post.Comments" :key="index"><p>{{ comment.content }}</p></v-card-text>
                    <v-btn class="btn--closed">
                    <v-icon class="icon--close">mdi-close</v-icon>
                    </v-btn>   
                </div>
                <!--  -->
                <hr>
                <!-- section like -->
                <div class="like--container">
                <div  v-if="post.userId == this.$store.state.user.userId" class="btn--update">
                <div  v-if="post.likes == 0">
                    <!-- @click="like++" ou @click="like--" a faire (data like=0)-->
                    <v-btn @click="likeToPost" class="btn--like">
                        <v-icon  class="btn--icon">mdi-thumb-up</v-icon>
                    </v-btn> 
                </div>
                <div v-else>
                <v-btn @click="deleteLike" class="btn--notLike">
                    <v-icon  class="btn--icon">mdi-thumb-up</v-icon>
                </v-btn>  
                </div>
                <div>
                    <v-badge class="btn--badge" color="info" :content="'+' + post.likes" inline></v-badge>
                </div>
                </div>
                </div>
                <!--  -->
                <!-- section modifier supprimer post -->
                <v-card-actions  v-if="this.$store.state.user.admin == true || post.userId == this.$store.state.user.userId" class="btn--update">
                    <div v-if="mode == 'bydefault'">
                        <v-btn   v-on:click="switchToUpdate" class="--button">
                            <strong>Modifier</strong>
                        </v-btn>
                    </div>
                    <div v-else>
                        <v-btn   v-on:click="switchToDisplaypost" class="--button">
                            <strong>Annuler</strong>
                        </v-btn>
                    </div>
                    <v-btn class="--button" @click="openConfirmDelete(post.id)" >Supprimer le post</v-btn>
                </v-card-actions>
                <!-- ajout du component edit post avec son props post objet (dont l'id du post recuperer) -->
                <EditPost v-if="mode == 'update'" v-bind:post="post"/>
                <!--  -->
                </v-container>
            </v-card>
            <AlertConfirm 
        @closeAlert="confirmDelete.open = false" 
        :title="confirmDelete.title"
        @comfirm="deletePost" 
        :open="confirmDelete.open"/>
        </v-app>    
</template>

<script>
//importation du component edit post pour modification
import EditPost from '@/components/EditPost.vue'
import AlertConfirm from '@/components/AlertConfirm';
//Props  est un attribut que vous pouvez définir au niveau du composant qui sera transmis directement au template
export default {
    components: {
    EditPost,AlertConfirm
    },
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
        likeToPost(){  
                const This = this; 
                //sous element pas acces au this je renome une variabale pour appeler en dessous  
                //un terme spécial pour invoquer les mutations depuis le store - actions (dispatch) asynchrone  
                //précédées du signe dollar afin de garantir que ces méthodes sont bien utilisées comme prévu
                this.$store.dispatch('postLike',{
                    like:this.like++,
                }).then(() => {
                    //redirection vers la route apres creation d'un compte (path en argument)
                    this.refreshPost()
                    this.$store.commit('SETSTATUS' , {status:'succes',message:`votre post est bien ajouter`});
                })
            },
        deleteLike(){  
                const This = this; 
                //sous element pas acces au this je renome une variabale pour appeler en dessous  
                //un terme spécial pour invoquer les mutations depuis le store - actions (dispatch) asynchrone  
                //précédées du signe dollar afin de garantir que ces méthodes sont bien utilisées comme prévu
                this.$store.dispatch('Like',{
                    like:this.like--,
                }).then(() => {
                    //redirection vers la route apres creation d'un compte (path en argument)
                    this.refreshPost()
                    this.$store.commit('SETSTATUS' , {status:'succes',message:`votre post est bien ajouter`});
                })
            },
        //function pour different etat sur l'affichage des buttons
        switchToDisplaypost() {              // <------: function()
            this.mode = 'bydefault';
        },
        switchToUpdate() {                      // <------: function()
            this.mode = 'update';
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
.main_post {
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
}
.like--container{
    display: flex
}

@import url('../style/boutonLike.css');
@import url('../style/posts.css');
@import url('../style/comment');
</style>

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
    ,
    data(){
        return {
            title:"toto",
            content:"titi"
        }
    },
    created(){
    this.getData();
    },
    methods : {
    getData(){
            const id =  this.$route.params.id;
            fetch(`http://localhost:3000/api/post/${id}`,{
                headers: { "Content-Type": "application/json" , 
                "Authorization":"Bearer 123"}
            })
            .then((response) => response.json())
            .then((post) => {  
                this.title = post.title;
                this.content = post.content;
        })
        .catch((err) => console.log('Erreur : ' + err)); /*attrape les erreur*/
    }
        }
}  
</script>
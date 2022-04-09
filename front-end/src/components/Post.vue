<template>
    <div>
        <h1>{{title}}</h1>
        <p>{{content}}</p>
    </div>
</template>


<script>
export default {
    name: 'Post',
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
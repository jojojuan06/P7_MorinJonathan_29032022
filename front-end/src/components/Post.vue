<template>
    <div>
        <h1>{{title}}</h1>
        <p>{{content}}</p>
    </div>
</template>


<script>
export default {
        name: 'Post',
        props: {    
        title: {
            type:String,
            default :'My title',
        },
        content: {
            type:String,
            default :'My content',
        },
    }
}
</script>
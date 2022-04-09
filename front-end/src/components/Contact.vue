<template>
    <h1>
        {{msg}}
    </h1>
</template>

<script>
export default {
    name: 'Contact',
    props: {
    msg: {
        type:String,
        default :'tout les contact',
    } 
    }
}
</script>


<template>
        <div class="notfound">
            <div>
            <h1>404</h1>
            </div>
            <div class="--subtitle">
            <p>PAGE NON TROUVÉ</p>    
            </div>
            <div>
                <router-link to="/" class="--redirect">retouner a l'accueil ?</router-link>
            </div>
        </div>
</template>

<script>
export default {
name:"PageNotFound",
}
</script>

<style  scoped>
.notfound {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #d6d6d6;
}
.notfound .--subtitle {
    font-size: 20px;
    padding: 8px;
    background-color:#091f43;
    color: white;
}
.notfound .--redirect {
    font-size: 20px;
    text-decoration: none;
    font-weight: bold;
    color: #091f43;
}
.--redirect:hover {
    text-decoration: underline #d1515a;
}

h1 {
color: #d1515a;
font-size: 6rem;
}
</style>>
